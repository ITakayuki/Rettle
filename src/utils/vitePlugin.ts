import path from "path";
import { config } from "./config";
import fs from "fs";
import {
  createHeaders,
  createHelmet,
  transformReact2HTMLCSS,
} from "./HTMLBuilder";
import { checkEndpoint } from "./utility";
import { send, Plugin } from "vite";
import errorTemplateHtml, { errorTemplate } from "./errorTemplate.html";

export const vitePlugin: Plugin = {
  name: "vite-plugin-rettle",
  apply: "serve",
  handleHotUpdate(context) {
    context.server.ws.send({
      type: "full-reload",
    });
    return [];
  },
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const root = server.config.root;
      let fullReqPath = path.join(root, "src/views", req.url || "");
      let fullReqStaticPath = path.join(root, config.static, req.url || "");

      if (fullReqPath.endsWith("/")) {
        fullReqPath += "index.html";
      }

      if (fullReqStaticPath.endsWith("/")) {
        fullReqStaticPath += "index.html";
      }

      if (
        fullReqPath.endsWith(".html") &&
        req.url!.split("/").filter((item) => {
          if (item !== "") {
            return item;
          }
        })[0] === config.pathPrefix.replace(/\//g, "")
      ) {
        const tsxPath = `${
          fullReqPath.slice(0, Math.max(0, fullReqPath.lastIndexOf("."))) ||
          fullReqPath
        }.tsx`.replace(
          config.pathPrefix.endsWith("/")
            ? config.pathPrefix.slice(0, -1)
            : config.pathPrefix,
          ""
        );

        if (fs.existsSync(tsxPath)) {
          try {
            const { html, css, ids } = await transformReact2HTMLCSS(tsxPath);
            const style = `<style data-emotion="${ids.join(
              " "
            )}">${css}</style>`;
            const helmet = createHelmet();
            const headers = createHeaders().concat(helmet.headers);
            const endpoint = checkEndpoint(tsxPath);
            const script = path.join(
              "/.cache/scripts",
              endpoint || "",
              config.js
            );
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
          } catch (e: any) {
            const errorType = String(e);
            const stack = e.stack
              .split("\n")
              .map((item: string, i: number) => (i !== 0 ? item + "<br/>" : ""))
              .join("");
            return send(
              req,
              res,
              errorTemplateHtml(
                "Build Error",
                errorTemplate(
                  `<p class="color-red">${errorType}</p><p class="pl-20">${stack}</p>`
                )
              ),
              "html",
              {}
            );
          }
        } else if (fs.existsSync(fullReqStaticPath)) {
          return next();
        } else {
          const html = `<div><h1 class="title text-center">404 Page Not Found</h1></div>`;
          return send(req, res, errorTemplateHtml("", html), "html", {});
        }
      } else {
        return next();
      }
    });
  },
};
