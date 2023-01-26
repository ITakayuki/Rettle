import Chokidar from "chokidar"
import * as path from "path";

interface watchFileArgs {
  change?: (filename: string, watcher: Chokidar.FSWatcher) => void;
  add?: (filename: string, watcher: Chokidar.FSWatcher) => void;
  ready?: (watcher: Chokidar.FSWatcher)=>void;
}

export const watchFiles = (args: watchFileArgs) => {
  const srcAllFilesPath = path.resolve("./src/**/*.[ts,tsx,js,jsx]");

  const watcher = Chokidar.watch(srcAllFilesPath, {
    persistent: true,
    awaitWriteFinish: true,
  });
  watcher.on("ready", () => {
    if (args.ready) {
      args.ready(watcher);
    }
    watcher.on("change", (filename, status) => {
      if (args.change) {
        args.change(filename,watcher);
      }
    })
    watcher.on("add", (filename, status) => {
      if (args.add) {
        args.add(filename,watcher)
      }
    })
  })
}