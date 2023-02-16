"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.wakeupExpressServer = void 0;
const express_1 = __importDefault(require("express"));
const HTMLBuilder_1 = require("./HTMLBuilder");
const path = __importStar(require("path"));
const config_1 = require("./config");
const glob_1 = __importDefault(require("glob"));
const Log_1 = require("./Log");
const wakeupExpressServer = () => {
    const app = (0, express_1.default)();
    const entryPaths = {};
    config_1.config.endpoints.map((endpoint) => {
        const ignore = (0, config_1.getIgnores)(endpoint);
        const files = glob_1.default.sync(path.join(endpoint, "/**/*"), {
            ignore,
            nodir: true
        });
        entryPaths[endpoint] = files;
    });
    const viewPath = path.resolve("./src/views/");
    Object.keys(entryPaths).map(key => {
        const item = entryPaths[key];
        item.forEach(item => {
            const relativePath = path.relative(viewPath, item).replace(path.extname(item), "").replace("index", "");
            app.get(path.join("/", relativePath), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                var _a, _b, _c;
                const { html, css, ids } = yield (0, HTMLBuilder_1.transformReact2HTMLCSS)(item);
                const style = `<style data-emotion="${ids.join(' ')}">${css}</style>`;
                const headers = [
                    ...(0, HTMLBuilder_1.createHeaderTags)("meta", (_a = config_1.config.header) === null || _a === void 0 ? void 0 : _a.meta),
                    ...(0, HTMLBuilder_1.createHeaderTags)("link", (_b = config_1.config.header) === null || _b === void 0 ? void 0 : _b.link),
                    ...(0, HTMLBuilder_1.createHeaderTags)("script", (_c = config_1.config.header) === null || _c === void 0 ? void 0 : _c.script)
                ];
                const script = path.join(key, config_1.config.js);
                const result = config_1.config.template({
                    html,
                    style,
                    headers,
                    script
                });
                res.setHeader("Content-Type", "text/html");
                res.send(result);
            }));
        });
    });
    app.listen(config_1.config.port, () => {
        console.log(Log_1.color.blue("Listening http://localhost:" + config_1.config.port));
    });
};
exports.wakeupExpressServer = wakeupExpressServer;
//# sourceMappingURL=expressServer.js.map