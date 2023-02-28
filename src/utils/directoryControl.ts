import fs from "fs";
import {config} from "./config";
import * as path from "path";
import {rimrafSync} from "rimraf";
import glob from "glob";

export const copyStatic = () => {
  const files = glob.sync(path.resolve(path.join("./", config.static,"**/*")), {
    nodir: true
  })
  for (const file of files) {
    const before = path.join("/", config.static);
    const after = path.join("/", config.outDir, config.pathPrefix)
    fs.copyFileSync(file, file.replace(before, after));
  }
}

export const deleteOutputDir = () => {
  rimrafSync(path.join(config.outDir));
}