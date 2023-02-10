import {watchFiles} from "./watcher";
import {color} from "../utils/Log";
import {createCacheAppFile, watchScript, buildScript, createTsConfigFile} from "../utils/AppScriptBuilder";
import {config} from "../utils/config";
import * as path from "path";
import glob from "glob";
import {eraseExports} from "../utils/AppScriptBuilder";
import fs from "fs";
import {mkdirp} from "../utils/utility";

const watchSources = () => {
  watchFiles({
    change: (filename) => {
      console.log(color.blue(`【Change File】-> ${filename}`));
      createCacheAppFile().then();
    },
    add: (filename, watcher) => {
      console.log(color.blue(`【Add File】-> ${filename}`));
      watcher.add(filename);
    },
    unlink: (filename, watcher) => {
      console.log(color.blue(`【Unlink File】-> ${filename}`));
      watcher.unwatch(filename);
    },
    unlinkDir: (filename, watcher) => {
      console.log(color.blue(`【Unlink Dir】-> ${filename}`));
      watcher.unwatch(filename);
    },
    ready: () => {
      console.log(color.blue('Ready to Watching'));
    }
  })
}

export const server = async() => {
  const buildSetupOptions = {
    outDir: path.join(config.outDir, config.pathPrefix)
  }
  const srcFiles = glob.sync("./src/**/*{ts,js,tsx,jsx,json}", {
    nodir: true
  });
  await Promise.all(srcFiles.map(file => new Promise(async(resolve) => {
      const outPath = path.join(".cache/", file);
      const sourceCode = fs.readFileSync(file, "utf-8");
      await mkdirp(outPath);
      if (path.extname(file).includes("tsx")) {
        const code = eraseExports(sourceCode);
        fs.writeFileSync(outPath, code, "utf-8");
      } else {
        fs.writeFileSync(outPath, sourceCode, "utf-8");
      }
      resolve(null);
    })
  ));
  await createTsConfigFile();
  await createCacheAppFile();
  watchSources();
  await buildScript(buildSetupOptions);
  await watchScript(buildSetupOptions)
}