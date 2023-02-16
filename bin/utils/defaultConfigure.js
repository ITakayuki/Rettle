"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
const variable_1 = require("./variable");
const template_html_1 = require("./template.html");
const config = {
    pathPrefix: "./",
    port: 3000,
    outDir: "./htdocs",
    css: "/assets/style/app.css",
    js: "/assets/script/app.js",
    static: "/",
    header: {
        meta: [{
                name: "generator",
                content: `Rettle ${variable_1.version}`
            }]
    },
    template: template_html_1.templateHtml,
    endpoints: ["./src/views"],
    staticPath: "/static",
    encode: "UTF-8",
    esbuild: {
        minify: true,
    }
};
exports.defaultConfig = config;
//# sourceMappingURL=defaultConfigure.js.map