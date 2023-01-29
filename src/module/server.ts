import {watchFiles} from "./watcher";
import {color} from "../utils/Log";
import {createCacheAppFile, watchScript, buildScript} from "../utils/AppScriptBuilder";
import {config} from "../utils/config";
import * as path from "path";

const watchSources = () => {
  watchFiles({
    change: (filename) => {
      console.log(color.blue(`【Change File】-> ${filename}`));
      createCacheAppFile();
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
    minify: true,
    outDir: path.join(config.outDir, config.pathPrefix, config.js)
  }
  watchSources();
  await buildScript(buildSetupOptions);
  await watchScript(buildSetupOptions)
}