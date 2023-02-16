import ReactDom from "react-dom/server";
import * as esBuild from "esbuild";
import BabelPlugin from "@itkyk/esbuild-plugin-babel";
import vm from "vm";
import fs from "fs";
import * as path from "path";

const {dependencies} = JSON.parse(fs.readFileSync(path.resolve("./package.json"), "utf-8"));

export const transformReact2HTMLCSS = (path:string): Promise<{html:string, ids: Array<string>, css: string}> => {
  return  new Promise(async(resolve) => {
    const res = await esBuild.build({
      bundle: true,
      entryPoints: [path],
      platform: "node",
      write: false,
      external: Object.keys(dependencies),
      plugins: [
        BabelPlugin({
          filter: /.ts?x/,
          babel: {
            presets: ["@babel/preset-env", "@babel/preset-typescript", ["@babel/preset-react", {
              "runtime": "automatic", "importSource": "@emotion/react"
            }]],
            plugins: ["@emotion/babel-plugin"]
          }
        })
      ]
    })
    const code = res.outputFiles![0].text;
    const context = {exports, module, process, require, __filename, __dirname};
    vm.runInNewContext(code, context);
    resolve(context.module.exports.default as {html:string, ids: Array<string>, css: string})
  })
}

export const createHeaderTags = (tagName:string, contents: Array<Record<string, string>>) => {
  return contents.map(item => {
    return `<${tagName} ${Object.keys(item).map(key => {
      `${key} = "${item[key]}"`
    }).join(" ")} >`
  })
}