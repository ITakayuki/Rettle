import {RettleConfigInterface} from "./config";

const config:RettleConfigInterface = {
  pathPrefix: "./",
  port: 3000,
  outDir: process.env.NODE_ENV === "develop" ? "./dist" : "./htdocs",
  css: "/assets/style/app.css",
  js: "/assets/script/app.js",
  static: "/assets/",
  staticPath: "/",
  encode: "UTF-8"
}

export const defaultConfig = config;