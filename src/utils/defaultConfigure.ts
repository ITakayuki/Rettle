import {RettleConfigInterface} from "./config";
import {templateHtml} from "./template.html";
import * as process from "process";
import RettlePlugin from "esbuild-plugin-rettle";


const config:RettleConfigInterface = {
  pathPrefix: "./",
  port: 3000,
  outDir: "./htdocs",
  css: "/assets/style/app.css",
  js: "/assets/script/app.js",
  static: "/static",
  template: templateHtml,
  endpoints: ["./src/views"],
  staticPath: "/static",
  encode: "UTF-8",
  build: {
    buildHTML: (code) => code,
    buildCss: (code) => code,
    copyStatic: () => {}
  },
  esbuild: {
    minify: true,
    plugins: [
      RettlePlugin({
        filter: /./,
        babel: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-typescript",
            [
              "@babel/preset-react",
              {
                runtime: "automatic",
                importSource: "@emotion/react",
              },
            ],
          ],
          plugins: ["@emotion/babel-plugin"],
        },
      }),
    ],
  },
  envs: {
    NODE_ENV: process.env.NODE_ENV as string
  },
  version: true,
  server: (app, express) => {}
}

export const defaultConfig = config;