import * as path from "path";
import fs from "fs";

export const mkdirp = (filePath: string) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return;
  }
  mkdirp(dirname);
  fs.mkdirSync(dirname);
}