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
      try {
        console.log(color.blue(`【Change File】-> ${filename}`));
        await outputFormatFiles(filename);
        await createCacheAppFile()
      } catch (e) {
        console.error(e);
      }
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

export const server = async(env: string) => {
  process.env.RETTLE_BUILD = env;
  /* build app.js files */
  const buildSetupOptions = {
    outDir: path.join(".cache/temporary", config.pathPrefix)
  }
  const srcFiles = glob.sync("./src/**/*{ts,js,tsx,jsx,json}", {
    nodir: true
  });
  await Promise.all(srcFiles.map(file => new Promise(async(resolve, reject) => {
    try {
      await outputFormatFiles(file)
      resolve(null);
    } catch (e) {
      reject(e)
    }
    })
  ));
  try {
    await createTsConfigFile();
  } catch (e) {
    throw e
  }
  try {
    await createCacheAppFile();
  }catch (e) {
    throw e
  }
  watchSources();
  try {
    await buildScript(buildSetupOptions);
  } catch (e) {
    throw e
  }
  try {
    await watchScript(buildSetupOptions)
  } catch (e) {
    throw e
  }
  /* wake up html and css server */
  wakeupExpressServer();
}