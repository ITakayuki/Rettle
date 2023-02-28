import * as esBuild from "esbuild";
import vm from "vm";
import fs from "fs";
import * as path from "path";
import {config} from "./config";
import {version} from "./variable";
import Helmet, {HelmetData} from "react-helmet";
import * as console from "console";

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

export const createHeaders = () => {
  const versionMeta = config.version ? [`<meta name="generator" content="Rettle ${version}">`] : [""];
  const headerMeta = config.header?.meta ? createHeaderTags("meta", config.header?.meta) : [""];
  const headerLink = config.header?.link ? createHeaderTags("link", config.header?.link) : [""];
  const headerScript = config.header?.script ? createHeaderTags("script", config.header?.script) : [""];
  return [
    ...versionMeta,
    ...headerMeta,
    ...headerLink,
    ...headerScript,
  ];
}
interface RettleHelmetType {
  headers: string[],
  attributes: {
    body: string;
    html: string;
  },
  body: string[]
}
export const createHelmet = () => {
  const helmet = Helmet.renderStatic();
  const heads = ["title", "base", "link", "meta", "script", "style"] as const;
  const attributes = ["bodyAttributes", "htmlAttributes"] as const;
  const body = ["noscript"] as const;
  const results:RettleHelmetType  = {
    headers: [],
    attributes: {
      body: "",
      html: ""
    },
    body: []
  }
  for (const opts of heads) {
    const opt = opts as typeof heads[number];
    if (helmet[opt]) {
      results.headers.push(helmet[opt].toString());
    }
  }
  results.attributes.body = helmet.bodyAttributes.toString() || "";
  results.attributes.html = helmet.htmlAttributes.toString() || "";
  for (const opts of body) {
    const opt = opts as typeof heads[number];
    if (helmet[opt]) {
      results.body.push(helmet[opt].toString());
    }
  }
  return results;
}