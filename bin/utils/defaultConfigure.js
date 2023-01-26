"use strict";
var config = {
    pathPrefix: "./",
    port: 3000,
    outDir: process.env.NODE_ENV === "develop" ? "./dist" : "./htdocs",
    assetsPath: {
        css: "/assets/style",
        js: "/assets/scripts",
        images: "/assets/images"
    },
    staticPath: "/",
    encode: "UTF-8"
};
exports.defaultConfig = config;
