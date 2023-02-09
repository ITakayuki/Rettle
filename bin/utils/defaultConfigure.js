"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
const config = {
    pathPrefix: "./",
    port: 3000,
    outDir: process.env.NODE_ENV === "develop" ? "./dist" : "./htdocs",
    css: "/assets/style/app.css",
    js: "/assets/script/app.js",
    static: "/",
    endpoints: ["./src/views"],
    staticPath: "/static",
    encode: "UTF-8",
    esbuild: {
        minify: true
    }
};
exports.defaultConfig = config;
