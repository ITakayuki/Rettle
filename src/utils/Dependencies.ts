import glob from "glob";
import madge from "madge";
import fs from "fs";
import * as path from "path";

const checkScript = (filePath: string) => {
  return fs.readFileSync(filePath, "utf-8").includes("export const script")
}

export const getMadgeObject = async(target: string, config?: madge.MadgeConfig) => {
  const res = await madge(target, config);
  return res.obj();
}

export const getDependencies = async(targetDir: string, ignore: Array<string>) => {
  const targets = glob.sync(path.join(targetDir, "/**/*"), {
    ignore: ignore,
    nodir: true
  });
  const dependenciesFiles:Array<string> = [];
  const madgePromises = [];
  for (const target of targets) {
    const promiseFunction = new Promise(async(resolve) => {
        const obj = await getMadgeObject(target, {
          baseDir: "./"
        });
        Object.keys(obj).forEach((key: string) => {
          if(checkScript(key)) {
            dependenciesFiles.push(key);
          }
          for (const targetFilePath of obj[key]) {
            if(checkScript(targetFilePath)) {
              dependenciesFiles.push(targetFilePath);
            }
          }
        resolve(null)
      })
    })
    madgePromises.push(promiseFunction);
  };
  await Promise.all(madgePromises);
  return dependenciesFiles.filter((x, i, self) => {
    return self.indexOf(x) === i;
  })
}