import {RettleConfigInterface} from "./config";
import {version} from "./variable";
import {templateHtml} from "./template.html";


const config:RettleConfigInterface = {
  pathPrefix: "./",
  port: 3000,
  outDir: "./htdocs",
  css: "/assets/style/app.css",
  js: "/assets/script/app.js",
  static: "/",
  header: {
    meta: [{
      name: "generator",
      content: `Rettle ${version}`
    }]
  },
  template: templateHtml,
  endpoints: ["./src/views"],
  staticPath: "/static",
  encode: "UTF-8",
  esbuild: {
    minify: true,
  }
}

export const defaultConfig = config;