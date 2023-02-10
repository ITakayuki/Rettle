import esBuild from "esbuild";
import {color} from "./Log";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import tsConfig from "./template-tsconfig.json";
import {getDependencies} from "./Dependencies";
import {config} from "./config";
import glob from "glob";
import {mkdirp} from "./utility";
import * as acorn from 'acorn';
import jsx from "acorn-jsx";
import ts from "typescript";


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

export const createCacheAppFile = () => {
  return new Promise(async(resolve) => {
    const jsFileName = path.basename(config.js).replace(".js", "")
    const jsBaseDir = path.dirname(config.js);
    for (const endpoint of config.endpoints) {
      const ignore = config.endpoints.filter((x: string, i: number , self:string[]) => {
        return self[i] !== endpoint && !endpoint.includes(self[i].replace("/**/*", ""))
      });
      const files = await getDependencies(endpoint, ignore);
      const appResolvePath = createFileName(endpoint)
      const appFilePath = path.join(".cache/scripts",appResolvePath, jsBaseDir,`${jsFileName}.jsx`)
      const appImports = [];
      const scriptRunner = [];
      for (const file of files) {
        const hashName = "Script_" + crypto.createHash("md5").update(file).digest("hex");
        console.log(file)
        appImports.push(`import {script as ${hashName}} from "${path.relative(path.resolve(path.join(".cache/scripts", appResolvePath,jsBaseDir)), file.replace("src/", ".cache/src/")).replace(".tsx", "").replace(".jsx", "")}";`)
        scriptRunner.push([
          `${hashName}();`
        ].join("\n"));
      }
      await mkdirp(appFilePath);
      fs.writeFileSync(appFilePath, appImports.join("\n") + "\n" + scriptRunner.join("\n"), "utf-8");
    }
    resolve(null)
  })
}

export const buildScript = ({outDir}: BuildScriptInterface) => {
  return new Promise(resolve => {
    esBuild.build({
      bundle: true,
      // all cache scripts
      entryPoints: glob.sync(path.resolve("./.cache/scripts/**/*.jsx"), {
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
      console.log(color.blue("Built Script."));
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
      entryPoints: glob.sync(path.resolve("./.cache/scripts/**/*.jsx"), {
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
      console.log(color.blue("Watch App File."));
      resolve(null);
    })
  })
}

export const translateTs2Js = (code:string) => {
  return ts.transpileModule(code, {
    compilerOptions: {
      target: 99,
      "jsx": 1
    }
  }).outputText;
}

export const eraseExports = (code:string) => {
  const jsCode = translateTs2Js(code);
  //@ts-ignore
  const ast = acorn.Parser.extend(jsx()).parse(jsCode, {
    ecmaVersion: 2019,
    sourceType: "module"
  })
  //@ts-ignore
  const functionNodes = ast.body.filter(item => item.type === "FunctionDeclaration" || item.type === "VariableDeclaration");
  //@ts-ignore
  const exportNodes = ast.body.filter((item) => item.type === "ExportDefaultDeclaration");
  const objects: Record<string, string> = {};
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
      const result = jsCode.replace(objects[exportName], objects[exportName].split("\n").map(item => {
        return "//" + item
      }).join("\n")).replace(exportLine, "//" + exportLine);
      return result;
    }
    ;
  } else {
    // export default ()=>
    const exportName = exportNodes[0]
    const {start, end} = exportName;
    const exportStr = jsCode.slice(start, end);
    const result = jsCode.replace(exportStr, exportStr.split("\n").map(item => "//" + item).join("\n"))
    return result;
  }
  return ""
}