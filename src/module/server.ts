import {watchFiles} from "./watcher";
import glob from "glob";
import * as path from "path";
import fs from "fs";
import crypto from "crypto";

const watchSources = () => {
  watchFiles({
    change: (filename, watcher) => {
      console.log("change file: ", filename)
      const files = glob.sync(path.resolve("./src/**/*.{tsx,jsx}"));
      const appFilePath = path.resolve(".cache/app.tsx");
      const appImports = [];
      const scriptRunner = [];
      for (const file of files) {
        const hashName = "Script_" + crypto.createHash("md5").update(file).digest("hex");
        appImports.push(`import {script as ${hashName}} from "${path.relative(path.resolve(".cache"), file)}";`)
        scriptRunner.push([
          `if (${hashName}) {`,
          `${hashName}()`,
          `}`
        ].join("\n"));
      };
      if (!fs.existsSync(path.resolve(".cache"))) {
        fs.mkdirSync(path.resolve(".cache"));
      };
      fs.writeFileSync(appFilePath, appImports.join("\n") + "\n" + scriptRunner.join("\n"), "utf-8");
    },
    add: (filename, watcher) => {
      watcher.add(filename);
    },
    ready: () => {
      console.log("READY WATCH");
    }
  })
}

export const server = () => {
  watchSources();
}