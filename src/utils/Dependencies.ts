import glob from "glob";
import madge from "madge";
import fs from "fs";

const checkScript = (filePath: string) => {
  return fs.readFileSync(filePath, "utf-8").includes("export const script")
}

export const getDependencies = async(targetDir: string, ignore: Array<string>) => {
  const targets = glob.sync(targetDir, {
    ignore: ignore,
    nodir: true
  });
  console.log("targets: ", targets)
  const dependenciesFiles:Array<string> = [];
  const madgePromises = [];
  for (const target of targets) {
    madgePromises.push(() => {
      return new Promise(async(resolve) => {
        const res = await madge(target);
        const obj = res.obj();
        console.log("obj: ", obj)
        Object.keys(obj).forEach((key: string) => {
          if(checkScript(key)) {
            dependenciesFiles.push(key);
          }
          for (const targetFilePath of obj[key]) {
            if(checkScript(key)) {
              dependenciesFiles.push(targetFilePath);
            }
          }
        })
        resolve(null)
      })
    });
  };
  await Promise.all(madgePromises);
  return dependenciesFiles.filter((x, i, self) => {
    return self.indexOf(x) === i;
  })
}