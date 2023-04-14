import express from "express";
import {
  transformReact2HTMLCSS,
  createHeaders,
  createHelmet,
} from "./HTMLBuilder";
import * as path from "path";
import { config } from "./config";
import { color } from "./Log";
import errorTemplateHtml, { errorTemplate } from "./errorTemplate.html";
import { getEntryPaths } from "./utility";
import { createServer } from "vite";

const createViteServer = async () => {
  const app = express.Router();
  const vite = await createServer({
    root: "./",
    publicDir: path.resolve(path.join("./", config.static)),
    logLevel: "info",
    server: {
      middlewareMode: true,
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
  });
  app.use(vite.middlewares);

  app.use("*", async (req, res) => {
    const url = req.originalUrl;
    try {
      const filePath = url.includes(".html")
        ? path.resolve(path.join("./src/views/", url + ".tsx"))
        : path.resolve(path.join("./src/views/", url, "index.tsx"));
      const { html, css, ids } = await transformReact2HTMLCSS(filePath);
      const style = `<style data-emotion="${ids.join(" ")}">${css}</style>`;
      const helmet = createHelmet();
      const headers = createHeaders().concat(helmet.headers);
      const script = path.join("/.cache/scripts", config.pathPrefix, config.js);
      const result = config.template({
        html,
        style,
        headers,
        script,
        helmet: helmet.attributes,
        noScript: helmet.body,
      });
      res
        .status(200)
        .set({ "Content-Type": "text/html" })
        .end(await vite.transformIndexHtml(url, result));
    } catch (e: any) {
      const errorType = String(e);
      const stack = e.stack
        .split("\n")
        .map((item: string, i: number) => (i !== 0 ? item + "<br/>" : ""))
        .join("");
      res.send(
        errorTemplateHtml(
          "Build Error",
          errorTemplate(
            `<p class="color-red">${errorType}</p><p class="pl-20">${stack}</p>`
          )
        )
      );
    }
  });
  return { app, vite };
};

export const wakeupExpressServer = () => {
  const app = express();
  config.server(app, express);

  // 404
  app.use((req, res) => {
    const html = `<div><h1 class="title text-center">404 Page Not Found</h1></div>`;
    res.status(404).send(errorTemplateHtml("", html));
  });

  app.listen(config.port, () => {
    console.log(
      color.blue(
        `Listening http://${path.join(
          `localhost:${config.port}`,
          config.pathPrefix
        )}`
      )
    );
  });
  createViteServer().then((vite) => {
    vite.app.use(vite.app);
  });
};
