import {watchFiles} from "./watcher";
import {color} from "../utils/Log";
import {createCacheAppFile, watchScript, buildScript, createTsConfigFile, outputFormatFiles} from "../utils/AppScriptBuilder";
import {wakeupExpressServer} from "../utils/expressServer";
import {config} from "../utils/config";
import * as path from "path";
import glob from "glob";

const watchSources = () => {
  watchFiles({
    change: async(filename) => {
      console.log(color.blue(`【Change File】-> ${filename}`));
      await outputFormatFiles(filename);
      await createCacheAppFile()
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
    ready: () => {}
  })
}

export const server = async() => {
  /* build app.js files */
  const buildSetupOptions = {
    outDir: path.join(".cache/temporary", config.pathPrefix)
  }
  const srcFiles = glob.sync("./src/**/*{ts,js,tsx,jsx,json}", {
    nodir: true
  });
  await Promise.all(srcFiles.map(file => new Promise(async(resolve) => {
      await outputFormatFiles(file)
      resolve(null);
    })
  ));
  await createTsConfigFile();
  await createCacheAppFile();
  watchSources();
  await buildScript(buildSetupOptions);
  await watchScript(buildSetupOptions)
  /* wake up html and css server */
  wakeupExpressServer();
}