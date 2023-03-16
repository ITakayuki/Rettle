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
  build: {
    buildHTML: (code) => code,
    buildCss: (code) => code,
    buildScript: () => {},
    copyStatic: () => {}
  },
  esbuild: {
    plugins: (mode) => {
      return [
        RettlePlugin({
          filter: /./,
          mode: mode,
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
      ]
    }
  },
  envs: {
    NODE_ENV: process.env.NODE_ENV as string
  },
  version: true,
  server: (app, express) => {}
}

export const defaultConfig = config;