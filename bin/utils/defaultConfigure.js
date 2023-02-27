"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
const template_html_1 = require("./template.html");
const config = {
    pathPrefix: "./",
    port: 3000,
    outDir: "./htdocs",
    css: "/assets/style/app.css",
    js: "/assets/script/app.js",
    static: "/static",
    template: template_html_1.templateHtml,
    endpoints: ["./src/views"],
    staticPath: "/static",
    encode: "UTF-8",
    esbuild: {
        minify: true,
        plugins: []
    },
    version: true
};
exports.defaultConfig = config;
//# sourceMappingURL=defaultConfigure.js.map