import {watchFiles} from "./watcher";
import {color} from "../utils/Log";
import {createCacheAppFile, watchScript, buildScript, createTsConfigFile} from "../utils/AppScriptBuilder";
import {config} from "../utils/config";
import * as path from "path";

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
    minify: config.esbuild.minify,
    outDir: path.join(config.outDir, config.pathPrefix)
  }
  await createTsConfigFile();
  await createCacheAppFile();
  watchSources();
  await buildScript(buildSetupOptions);
  await watchScript(buildSetupOptions)
}