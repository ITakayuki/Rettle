import fs from "fs";
import {config} from "./config";
import * as path from "path";
export const copyStatic = () => {
  fs.copyFileSync(config.static, path.join(config.outDir, config.pathPrefix));
}

export const deleteOutputDir = () => {
  fs.rmdirSync(path.join(config.outDir));
}