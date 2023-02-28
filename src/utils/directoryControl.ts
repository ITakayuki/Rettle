import fs from "fs";
import {config} from "./config";
import * as path from "path";
import {rimrafSync} from "rimraf";
import glob from "glob";

export const copyStatic = () => {
  const files = glob.sync(path.resolve(path.join("./", config.static, config.pathPrefix, "**/*")), {
    nodir: true
  })
  for (const file of files) {
    fs.copyFileSync(file, file.replace(path.join(config.static, config.pathPrefix), path.join(config.outDir, config.pathPrefix)));
  }
}

export const deleteOutputDir = () => {
  rimrafSync(path.join(config.outDir));
}