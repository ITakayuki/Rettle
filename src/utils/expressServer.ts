import express from "express";
import {transformReact2HTMLCSS, createHeaderTags} from "./HTMLBuilder";
import * as path from "path";
import {config, getIgnores} from "./config";
import glob from "glob";
import {color} from "./Log";
import {version} from "./variable";
import * as process from "process";

export const wakeupExpressServer = () => {
  const app = express();

  const entryPaths = {} as {[index: string]: string[]};
  config.endpoints.map((endpoint: any) => {
    const ignore = getIgnores(endpoint);
    const files = glob.sync(path.join(endpoint, "/**/*"), {
      ignore,
      nodir: true
    })
    entryPaths[endpoint] =  files;
  });

  const viewPath = path.resolve("./src/views/")

  Object.keys(entryPaths).map(key => {
    const item = entryPaths[key];
    item.forEach(item => {
      const relativePath = path.relative(viewPath, item).replace(path.extname(item), "").replace("index", "");
      app.get(path.join("/", config.pathPrefix, relativePath), async(req, res) => {
        const {html, css, ids} = await transformReact2HTMLCSS(item);
        const style = `<style data-emotion="${ids.join(' ')}">${css}</style>`
        const versionMeta = config.version ? [`<meta name="generator" content="Rettle ${version}">`] : [""];
        const headerMeta = config.header?.meta ? createHeaderTags("meta", config.header?.meta) : [""];
        const headerLink = config.header?.link ? createHeaderTags("link", config.header?.link) : [""];
        const headerScript = config.header?.script ? createHeaderTags("script", config.header?.script) : [""];
        const headers = [
          ...versionMeta,
          ...headerMeta,
          ...headerLink,
          ...headerScript,
        ];
        const scriptRoot = process.env.RETTLE_BUILD_MODE === "server" ? path.join(".cache/temporary/", config.pathPrefix) : path.join(config.outDir, config.pathPrefix);
        const script = path.join(key.replace("src/views/", scriptRoot), config.js)
        const result = config.template({
          html,
          style,
          headers,
          script
        })
        res.setHeader("Content-Type", "text/html")
        res.send(result);
      })
    })
  })

  app.use(path.join("/", config.pathPrefix), express.static(path.resolve(path.join("./", config.static)), {maxAge: "30d"}));

  app.listen(config.port, () => {
    console.log(color.blue(`Listening http://${path.join(`localhost:${config.port}`, config.pathPrefix)}`));
  })
}