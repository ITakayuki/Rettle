import * as esBuild from "esbuild";
import BabelPlugin from "@itkyk/esbuild-plugin-babel";
import vm from "vm";
import fs from "fs";
import * as path from "path";
import {config} from "./config";

const {dependencies} = JSON.parse(fs.readFileSync(path.resolve("./package.json"), "utf-8"));

export const transformReact2HTMLCSS = (path:string): Promise<{html:string, ids: Array<string>, css: string}> => {
  return  new Promise(async(resolve, reject) => {
    let res:esBuild.BuildResult & {outputFiles: esBuild.OutputFile[]};
    esBuild.build({
        bundle: true,
        entryPoints: [path],
        platform: "node",
        write: false,
        external: Object.keys(dependencies),
        plugins: config.esbuild.plugins,
      }).then(res => {
      try {
        const code = res.outputFiles![0].text;
        const context = {exports, module, process, require, __filename, __dirname};
        vm.runInNewContext(code, context);
        const result = context.module.exports.default as {html:string, ids: Array<string>, css: string};
        if ("html" in result && "css" in result && "ids" in result) {
          resolve(result);
        } else {
          reject(new Error(`${path}: The value of export default is different.`));
        }
      } catch (e) {
        reject(e);
      }
    }).catch(e => {
      reject(e)
    })
  })
}

export const createHeaderTags = (tagName:string, contents: Array<Record<string, string>>) => {
  return contents.map(item => {
    const content = Object.keys(item).map(key => {
      return `${key}="${item[key]}"`
    })
    return `<${tagName} ${content.join(" ")} ${tagName === "script" ? "></script>" : ">"}`
  })
}