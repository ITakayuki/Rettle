import express from "express";
import {transformReact2HTMLCSS, createHeaderTags} from "./HTMLBuilder";
import * as path from "path";
import {config, getIgnores} from "./config";
import glob from "glob";
import {color} from "./Log";

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

  console.log("entryPaths: ", entryPaths);
  Object.keys(entryPaths).map(key => {
    const item = entryPaths[key];
    item.forEach(item => {
      const relativePath = path.relative(viewPath, item).replace(path.extname(item), "").replace("index", "");
      app.get(path.join("/", relativePath), async(req, res) => {
        const {html, css, ids} = await transformReact2HTMLCSS(item);
        const style = `<style data-emotion="${ids.join(' ')}">${css}</style>`
        const headers = [
          ...createHeaderTags("meta", config.header?.meta),
          ...createHeaderTags("link", config.header?.link),
          ...createHeaderTags("script", config.header?.script)
        ];
        const script = path.join(key, config.js)
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

  app.listen(config.port, () => {
    console.log(color.blue("Listening http://localhost:"+config.port));
  })
}