import {RettleConfigInterface} from "./config";
import {templateHtml} from "./template.html";
import * as process from "process";


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
  esbuild: {
    minify: true,
    plugins: []
  },
  envs: {
    NODE_ENV: process.env.NODE_ENV as string
  },
  version: true
}

export const defaultConfig = config;