"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
var config = {
    pathPrefix: "./",
    port: 3000,
    outDir: process.env.NODE_ENV === "develop" ? "./dist" : "./htdocs",
    css: "/assets/style/app.css",
    js: "/assets/script/app.js",
    static: "/assets/",
    staticPath: "/",
    encode: "UTF-8"
};
exports.defaultConfig = config;
