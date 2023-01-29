import esBuild from "esbuild";
import {color} from "./Log";
import path from "path";
import glob from "glob";
import fs from "fs";
import crypto from "crypto";

interface BuildScriptInterface {
  minify: boolean;
  outDir: string;
}

export const createCacheAppFile = () => {
  const files = glob.sync(path.resolve("./src/**/*.{tsx,jsx}"));
  const appFilePath = path.resolve(".cache/app.tsx");
  const appImports = [];
  const scriptRunner = [];
  for (const file of files) {
    const Component = fs.readFileSync(file, "utf-8");
    if (Component.includes("export const script")) {
      const hashName = "Script_" + crypto.createHash("md5").update(file).digest("hex");
      appImports.push(`import {script as ${hashName}} from "${path.relative(path.resolve(".cache"), file).replace(".tsx", "").replace(".jsx", "")}";`)
      scriptRunner.push([
        `${hashName}();`
      ].join("\n"));
      if (!fs.existsSync(path.resolve(".cache"))) {
        fs.mkdirSync(path.resolve(".cache"));
      };
      fs.writeFileSync(appFilePath, appImports.join("\n") + "\n" + scriptRunner.join("\n"), "utf-8");
    }
  }
}

export const buildScript = ({minify, outDir}: BuildScriptInterface) => {
  return new Promise(resolve => {
    esBuild.build({
      bundle: true,
      entryPoints: [path.resolve(".cache/app.tsx")],
      outfile: outDir,
      sourcemap: process.env.NODE_ENV === "develop",
      platform: "browser",
      target: "es6",
      tsconfig: "tsconfig.json",
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
      entryPoints: [path.resolve(".cache/app.tsx")],
      outfile: outDir,
      sourcemap: process.env.NODE_ENV === "develop",
      platform: "browser",
      target: "es6",
      tsconfig: "tsconfig.json",
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