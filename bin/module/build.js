"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const path_1 = __importDefault(require("path"));
const config_1 = require("../utils/config");
const glob_1 = __importDefault(require("glob"));
const fs_1 = __importDefault(require("fs"));
const AppScriptBuilder_1 = require("../utils/AppScriptBuilder");
const utility_1 = require("../utils/utility");
const HTMLBuilder_1 = require("../utils/HTMLBuilder");
const html_minifier_terser_1 = require("html-minifier-terser");
const build = () => __awaiter(void 0, void 0, void 0, function* () {
    /* build app.js files */
    const buildSetupOptions = {
        outDir: path_1.default.join(config_1.config.outDir, config_1.config.pathPrefix)
    };
    const srcFiles = glob_1.default.sync("./src/**/*{ts,js,tsx,jsx,json}", {
        nodir: true
    });
    yield Promise.all(srcFiles.map(file => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, AppScriptBuilder_1.outputFormatFiles)(file);
            resolve(null);
        }
        catch (e) {
            reject(e);
        }
    }))));
    try {
        yield (0, AppScriptBuilder_1.createTsConfigFile)();
    }
    catch (e) {
        throw e;
    }
    try {
        yield (0, AppScriptBuilder_1.createCacheAppFile)();
    }
    catch (e) {
        throw e;
    }
    try {
        yield (0, AppScriptBuilder_1.buildScript)(buildSetupOptions);
    }
    catch (e) {
        throw e;
    }
    // Create HTML FILES
    const entryPaths = (0, utility_1.getEntryPaths)();
    let promises = [];
    Object.keys(entryPaths).forEach((key) => {
        const items = entryPaths[key];
        items.forEach(item => {
            const promise = new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
                const { html, css, ids } = yield (0, HTMLBuilder_1.transformReact2HTMLCSS)(item);
                const headers = (0, HTMLBuilder_1.createHeaders)();
                const root = key.replace("src/views", config_1.config.pathPrefix);
                const script = path_1.default.join("/", root, config_1.config.js);
                headers.push(`<link rel="stylesheet" href="${path_1.default.join("/", root, config_1.config.css)}">`);
                const markup = config_1.config.template({
                    html,
                    headers,
                    script
                });
                const exName = path_1.default.extname(item);
                const cssOutputPath = path_1.default.join(config_1.config.outDir, root, config_1.config.css);
                const htmlOutputPath = path_1.default.join(config_1.config.outDir, config_1.config.pathPrefix, item.replace("src/views/", "")).replace(exName, ".html");
                yield (0, utility_1.mkdirp)(htmlOutputPath);
                yield (0, utility_1.mkdirp)(cssOutputPath);
                const minifyHtml = yield (0, html_minifier_terser_1.minify)(markup, {
                    collapseInlineTagWhitespace: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: true,
                });
                fs_1.default.writeFileSync(htmlOutputPath, minifyHtml, "utf-8");
                fs_1.default.writeFileSync(cssOutputPath, css, "utf-8");
                resolve(null);
            }));
        });
    });
});
exports.build = build;
//# sourceMappingURL=build.js.map