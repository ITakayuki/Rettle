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
      const scriptRunner = [[
        `const checkRunScript = (module:object) => {`,
        `  Object.keys(module).forEach((key: string) => {`,
        `    if (key === "script") {`,
        `      // @ts-ignore`,
        `      module[key]();`,
        `    }`,
        `  })`,
        `};`].join("\n"),
        "\n"
      ];
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