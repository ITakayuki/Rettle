import fs from "fs";
import {config} from "./config";
import * as path from "path";
import {rimrafSync} from "rimraf";

export const copyStatic = () => {
  fs.copyFileSync(path.resolve(path.join("./", config.static)), path.resolve(path.join("./",config.outDir, config.pathPrefix)));
}

export const deleteOutputDir = () => {
  rimrafSync(path.join(config.outDir));
}