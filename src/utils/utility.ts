import * as path from "path";
import fs from "fs";

export const mkdirp = (filePath: string) => {
  const dirPath = path.basename(filePath) ? path.dirname(filePath) : filePath
  const parts = path.resolve(dirPath).split(path.sep);
  for (let i = 1; i <= parts.length; i++) {
    const currPath = path.join.apply(null, parts.slice(0, i));
    if (!fs.existsSync(currPath)) {
      fs.mkdirSync(currPath);
    }
  }
}