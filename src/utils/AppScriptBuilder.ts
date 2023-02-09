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

interface BuildScriptInterface {
  minify: boolean;
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
      const appFilePath = path.join(".cache/scripts", jsBaseDir,appResolvePath, `${jsFileName}.tsx`)
      const appImports = [];
      const scriptRunner = [];
      for (const file of files) {
        const hashName = "Script_" + crypto.createHash("md5").update(file).digest("hex");
        appImports.push(`import {script as ${hashName}} from "${path.relative(path.resolve(path.join(".cache/scripts", jsBaseDir,appResolvePath)), file).replace(".tsx", "").replace(".jsx", "")}";`)
        scriptRunner.push([
          `${hashName}();`
        ].join("\n"));
      }
      await mkdirp(appFilePath);
      // fs.writeFileSync(appFilePath, appImports.join("\n") + "\n" + scriptRunner.join("\n"), "utf-8");
    }
    resolve(null)
  })
}

export const buildScript = ({minify, outDir}: BuildScriptInterface) => {
  return new Promise(resolve => {
    esBuild.build({
      bundle: true,
      entryPoints: glob.sync(path.resolve("./.cache/scripts/**/*.tsx"), {
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
      minify: minify,
    }).then(() => {
      console.log(color.blue("Built Script."));
      resolve(null);
    })
  })
}

export const watchScript = ({minify, outDir}: BuildScriptInterface) => {
  return new Promise(resolve => {
    esBuild.build({
      bundle: true,
      watch: {
        onRebuild(error, result) {
          if (error) console.error("watch build failed:", error);
        },
      },
      entryPoints: glob.sync(path.resolve("./.cache/scripts/**/*.tsx"), {
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
      minify: minify,
    }).then(() => {
      console.log(color.blue("Watch App File."));
      resolve(null);
    })
  })
}