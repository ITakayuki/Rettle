import esBuild from "esbuild";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import tsConfig from "./template-tsconfig.json";
import {getDependencies, getMadgeLeaves,getMadgeObject, checkScript} from "./Dependencies";
import {config, getIgnores} from "./config";
import glob from "glob";
import {mkdirp} from "./utility";
import * as acorn from 'acorn';
import jsx from "acorn-jsx";
import ts from "typescript";
import {createHash, getFilesName} from "./utility";
import deepmerge from "deepmerge";
import {isPlainObject} from "is-plain-object";

interface BuildScriptInterface {
  outDir: string;
}

export const createTsConfigFile = () => {
  return new Promise(resolve => {
    if(!fs.existsSync(path.resolve(".cache"))) {
      fs.mkdirSync(path.resolve(".cache"));
    }
    fs.writeFileSync(path.resolve("./.cache/tsconfig.json"), JSON.stringify(tsConfig, null, 2), "utf-8");
    resolve(null);
  })
}

const createFileName = (filePath:string) => {
  const relativePath = path.relative(path.resolve("./src/views/"), filePath).replace("/**/*", "").replace("**/*", "")
  return relativePath
}

const createComponentDep = async(filepath: string) => {
  let results = {} as {[x in string]: any};
  const tempObj = await getMadgeObject(filepath, {
    baseDir: "./"
  })
  let obj = tempObj[filepath]
  for (const dep of obj) {
    if (checkScript(dep)) {
      const temp = await createComponentDep(dep);
      results = deepmerge(results, {
        [getFilesName(dep)]: `createComponent("${createHash(path.resolve(dep))}", Script_${createScriptHash(dep)}("${createHash(path.resolve(dep))}", {${temp}})),`
      }, {isMergeableObject: isPlainObject});
    } else {
      const temp = await createComponentDep(dep);
      results = deepmerge(results, {
        [getFilesName(dep)]: `{${temp}},`
      }, {isMergeableObject: isPlainObject});
    }
  }
  return Object.keys(results).map(item => {
    return `${item}: ${results[item]}`;
  }).join("\n");
}

const createScriptHash = (str: string) => {
  return crypto.createHash("md5").update(str).digest("hex")
}

export const createCacheAppFile = () => {
  return new Promise(async(resolve) => {
    const jsFileName = path.basename(config.js).replace(".js", "")
    const jsBaseDir = path.dirname(config.js);
    for (const endpoint of config.endpoints) {
      const ignore = getIgnores(endpoint);
      const files = await getDependencies(endpoint,ignore);
      const appResolvePath = createFileName(endpoint)
      const appFilePath = path.join(".cache/scripts",appResolvePath, jsBaseDir,`${jsFileName}.js`)
      const appImports = [`import {RettleStart} from "rettle/core";`];
      const scriptObject = []
      const scriptRunner = [`RettleStart()`];
      const defs = [];
      for (const file of files) {
        const hash = createHash(path.resolve(file));
        const hashName = createScriptHash(file);
        appImports.push(`import {script as Script_${hashName}} from "${path.relative(path.resolve(path.join(".cache/scripts", appResolvePath,jsBaseDir)), file.replace("src/", ".cache/src/")).replace(".tsx", "").replace(".jsx", "")}";`)
        scriptObject.push(`${hash}: Script_${hashName}`);
        scriptRunner.push(`RettleStart(scripts, {})`);
      }
      await mkdirp(appFilePath);
      const code = [
        appImports.join("\n"),
        `const scripts = {${scriptObject.join("\n")}};`,
        scriptRunner.join("\n")
      ]
      fs.writeFileSync(appFilePath, code.join("\n"), "utf-8");
    }
    resolve(null)
  })
}

export const buildScript = ({outDir}: BuildScriptInterface) => {
  return new Promise(resolve => {
    esBuild.build({
      bundle: true,
      // all cache scripts
      entryPoints: glob.sync(path.resolve("./.cache/scripts/**/*.js"), {
        nodir: true
      }),
      outdir: outDir,
      sourcemap: process.env.NODE_ENV === "develop",
      platform: "browser",
      target: "es6",
      tsconfig: ".cache/tsconfig.json",
      define: {
        "process.env": JSON.stringify(process.env),
      },
      ...config.esbuild
    }).then(() => {
      resolve(null);
    })
  })
}

export const watchScript = ({ outDir}: BuildScriptInterface) => {
  return new Promise(resolve => {
    esBuild.build({
      bundle: true,
      watch: {
        onRebuild(error, result) {
          if (error) console.error("watch build failed:", error);
        },
      },
      entryPoints: glob.sync(path.resolve("./.cache/scripts/**/*.js"), {
        nodir: true
      }),
      outdir: outDir,
      sourcemap: process.env.NODE_ENV === "develop",
      platform: "browser",
      target: "es6",
      tsconfig: ".cache/tsconfig.json",
      define: {
        "process.env": JSON.stringify(process.env),
      },
      ...config.esbuild
    }).then(() => {
      resolve(null);
    })
  })
}

export const translateTs2Js = (code:string) => {
  return ts.transpileModule(code, {
    compilerOptions: {
      target: 99,
      "jsx": 2
    }
  }).outputText;
}

export const eraseExports = async(code:string) => {
  try {
    const jsCode = translateTs2Js(code);
    //@ts-ignore
    const ast = acorn.Parser.extend(jsx()).parse(jsCode, {
      ecmaVersion: 2019,
      sourceType: "module"
    })
    // @ts-ignore
    const importNodes = ast.body.filter(item => item.type === "ImportDeclaration" && (item.source.value === "react" || item.source.raw === "react"));
    //@ts-ignore
    const functionNodes = ast.body.filter(item => item.type === "FunctionDeclaration" || item.type === "VariableDeclaration");
    //@ts-ignore
    const exportNodes = ast.body.filter((item) => item.type === "ExportDefaultDeclaration");
    const importReact = importNodes.length !== 0 ? jsCode.slice(importNodes.start, importNodes.end) : null;
    const objects: Record<string, string> = {};
    if (!exportNodes) throw new Error("Cannot Found export")
    if (!exportNodes[0]) throw new Error("Cannot Found export")
    if ("declaration" in exportNodes[0] === false) throw new Error("Cannot Found export")
    if (exportNodes[0].declaration.name) {
      // export default **
      for (const node of functionNodes) {
        const {start, end} = node;
        const text = jsCode.slice(start, end);
        if (node.type === "FunctionDeclaration") {
          const key = node.id.name;
          objects[key] = text;
        } else if (node.type === "VariableDeclaration") {
          const key = node.declarations[0].id.name;
          objects[key] = text;
        }
        const exportName = exportNodes[0].declaration.name;
        const exportLine = jsCode.slice(exportNodes[0].start, exportNodes[0].end)
        const removeReactJsCode = importReact ? jsCode.replace(importReact, "//" + importReact) : jsCode;
        const result = removeReactJsCode.replace(objects[exportName], objects[exportName].split("\n").map(item => {
          return "//" + item
        }).join("\n")).replace(exportLine, "export default () => {}");
        return translateTs2Js(result);
      };
    } else {
      // export default ()=>
      let replaceDefaultRettle = "";
      let name = "";
      let cacheName = "";
      if (exportNodes[0]) {
        if (exportNodes[0].declaration) {
          if (exportNodes[0].declaration.arguments) {
            if (exportNodes[0].declaration.arguments[1]) {
              if (exportNodes[0].declaration.arguments[1].callee) {
                if (exportNodes[0].declaration.arguments[1].callee.name) {
                  name = exportNodes[0].declaration.arguments[1].callee.name
                }
              }
            }
          }
        }
      }
      if (name) {
        for (const node of functionNodes) {
          const {start, end} = node;
          const text = jsCode.slice(start, end);
          if (node.declarations[0].init.callee) {
            let cache = node.declarations[0].init.callee.property ? node.declarations[0].init.callee.property.name : node.declarations[0].init.callee.name;
            if (cache === "createCache") {
              cacheName = node.declarations[0].id.name
            }
          }
          if (node.type === "FunctionDeclaration") {
            const key = node.id.name;
            objects[key] = text;
          } else if (node.type === "VariableDeclaration") {
            const key = node.declarations[0].id.name;
            objects[key] = text;
          }
        }
        replaceDefaultRettle = jsCode.replace(objects[name], objects[name].split("\n").map(item => {
          return "//" + item
        }).join("\n")).replace(objects[cacheName], "//" + objects[cacheName])
      } else {
        replaceDefaultRettle = jsCode;
      }
      const exportName = exportNodes[0];
      const {start, end} = exportName;
      const exportStr = jsCode.slice(start, end);
      const removeReactJsCode = importReact ? replaceDefaultRettle.replace(importReact, "//" + importReact) : replaceDefaultRettle;
      const result = removeReactJsCode.replace(exportStr, exportStr.split("\n").map(item => "//" + item).join("\n")) + "\nexport default () => {}";
      return translateTs2Js(result);
    }
    return ""
  } catch (e) {
    throw e;
  }
}

export const outputFormatFiles = (file:string) => {
  return new Promise(async(resolve, reject) => {
    try {
      const filePath = path.isAbsolute(file) ? path.relative("./", file) : file;
      const outPath = path.join(".cache/", filePath).replace(".tsx", ".js");
      const sourceCode = fs.readFileSync(filePath, "utf-8");
      await mkdirp(outPath);
      if (path.extname(filePath).includes("tsx")) {
        const code = await eraseExports(sourceCode);
        fs.writeFileSync(outPath, code, "utf-8");
      } else {
        const code = translateTs2Js(sourceCode);
        fs.writeFileSync(outPath, code, "utf-8");
      }
      resolve(null)
    } catch (e) {
      reject(e);
    }
  })
}