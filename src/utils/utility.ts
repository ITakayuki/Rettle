import * as path from "path";
import fs from "fs";
import {config, getIgnores} from "./config";
import glob from "glob";
import {version} from "./variable";
import {createHeaderTags} from "./HTMLBuilder";

export const mkdirp = (filePath: string) => {
  return new Promise(resolve => {
    const dirPath = path.extname(filePath) !== "" ? path.dirname(filePath) : filePath
    const parts = dirPath.split(path.sep);
    for (let i = 1; i <= parts.length; i++) {
      const currPath = path.join.apply(null, parts.slice(0, i));
      if (!fs.existsSync(currPath)) {
        fs.mkdirSync(currPath);
      }
      if (i === parts.length) {
        resolve(null)
      }
    }
  })
}

const djb2Hash = (str:string) => {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
  }
  return hash;
}
export const createHash = (str:string) => {
  const hash = djb2Hash(str);
  const fullStr = ('0000000' + (hash & 0xFFFFFF).toString(16));
  return fullStr.substring(fullStr.length - 8, fullStr.length)
}


export const getEntryPaths = () => {
  const entryPaths = {} as {[index: string]: string[]};
  config.endpoints.map((endpoint: any) => {
    const ignore = getIgnores(endpoint);
    const files = glob.sync(path.join(endpoint, "/**/*"), {
      ignore,
      nodir: true
    })
    entryPaths[endpoint] =  files;
  });
  return entryPaths;
}

export const getFilesName = (filepath: string) => {
  const pathArray = filepath.split("/");
  for (let i = filepath.length -1; i >= 0; i --) {
    if (!pathArray[i].includes("index")) {
      return pathArray[i].replace(path.extname(filepath), "");
    }
  }
  return filepath
}