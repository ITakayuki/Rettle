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
import { createServer, send } from "vite";
import fs from "fs";

export const wakeupExpressServer = async () => {
  const vite = await createServer({
    plugins: [
      {
        name: "vite-plugin-rettle",
        apply: "serve",
        handleHotUpdate(context) {
          // ファイルが保存された時にホットリロードする
          // この記述がないと xxxx.pug を保存した時にリロードされない
          context.server.ws.send({
            type: "full-reload",
          });
          return [];
        },
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const root = server.config.root;
            let fullReqPath = path.join(root, "src/views", req.url || "");

            if (fullReqPath.endsWith("/")) {
              fullReqPath += "index.html";
            }

            if (fullReqPath.endsWith(".html")) {
              const tsxPath = `${
                fullReqPath.slice(
                  0,
                  Math.max(0, fullReqPath.lastIndexOf("."))
                ) || fullReqPath
              }.tsx`.replace(config.pathPrefix, "");
              if (!fs.existsSync(tsxPath)) {
                // xxxx.pug が存在しないなら 404 を返す
                const html = `<div><h1 class="title text-center">404 Page Not Found</h1></div>`;
                return send(req, res, errorTemplateHtml("", html), "html", {});
              }

              // xxxx.pug が存在するときは xxxx.pug をコンパイルした結果を返す
              const { html, css, ids } = await transformReact2HTMLCSS(tsxPath);
              const style = `<style data-emotion="${ids.join(
                " "
              )}">${css}</style>`;
              const helmet = createHelmet();
              const headers = createHeaders().concat(helmet.headers);
              const script = path.join("/.cache/scripts", config.js);
              const result = config.template({
                html,
                style,
                headers,
                script,
                helmet: helmet.attributes,
                noScript: helmet.body,
                mode: "server",
              });
              return send(req, res, result, "html", {});
            } else {
              return next();
            }
          });
        },
      },
    ],
    server: {
      port: config.port,
    },
    publicDir: config.static,
    base: config.pathPrefix,
  });
  await vite.listen();
  vite.printUrls();
};
