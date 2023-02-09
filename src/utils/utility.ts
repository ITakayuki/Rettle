import * as path from "path";
import fs from "fs";

export const mkdirp = (filePath: string) => {
  return new Promise(resolve => {
    const dirPath = path.extname(filePath) !== "" ? path.dirname(filePath) : filePath
    console.log("dire: ",dirPath)
    const parts = dirPath.split(path.sep);
    for (let i = 1; i <= parts.length; i++) {
      const currPath = path.join.apply(null, parts.slice(0, i));
      console.log("EXIST: ", !fs.existsSync(currPath))
      if (!fs.existsSync(currPath)) {
        console.log("create DIR")
        fs.mkdirSync(currPath);
      }
      if (i === parts.length) {
        resolve(null)
      }
    }
  })
}