import express from "express";
import {transformReact2HTMLCSS, createHeaders, createHelmet} from "./HTMLBuilder";
import * as path from "path";
import {config} from "./config";
import {color} from "./Log";
import errorTemplateHtml, {errorTemplate} from "./errorTemplate.html";
import {getEntryPaths} from "./utility";

export const wakeupExpressServer = () => {
  const app = express();

  const entryPaths = getEntryPaths();

  const viewPath = path.resolve("./src/views/")

  Object.keys(entryPaths).map(key => {
    const items = entryPaths[key];
    items.forEach(item => {
      const relativePath = path.relative(viewPath, item).replace(path.extname(item), "").replace("index", "");
      app.get(path.join("/", config.pathPrefix, relativePath), async(req, res) => {
        try {
          const {html, css, ids} = await transformReact2HTMLCSS(item);
          const style = `<style data-emotion="${ids.join(' ')}">${css}</style>`
          const helmet = createHelmet();
          const headers = createHeaders().concat(helmet.headers);
          const script = path.join("/", key.replace("src/views/", path.join(config.pathPrefix)), config.js)
          const result = config.template({
            html,
            style,
            headers,
            script,
            helmet: helmet.attributes,
            noScript: helmet.body
          })
          res.setHeader("Content-Type", "text/html")
          res.send(result);
        } catch (e: any) {
          const errorType = String(e);
          const stack = e.stack.split("\n").map((item:string, i:number) => i !== 0 ? item + "<br/>" : "").join("");
          res.send(errorTemplateHtml("Build Error", errorTemplate(`<p class="color-red">${errorType}</p><p class="pl-20">${stack}</p>`)))
        }
      })
    })
  })

  app.use(path.join("/", config.pathPrefix), express.static(path.resolve(path.join("./", config.static)), {maxAge: "30d"}));
  app.use(path.join("/"), express.static(path.resolve(path.join("./", ".cache/temporary/")), {maxAge: "30d"}));
  config.server(app, express);

  // 404
  app.use((req, res) => {
    const html = `<div><h1 class="title text-center">404 Page Not Found</h1></div>`
    res.status(404).send(errorTemplateHtml("", html))
  })

  app.listen(config.port, () => {
    console.log(color.blue(`Listening http://${path.join(`localhost:${config.port}`, config.pathPrefix)}`));
  })
}