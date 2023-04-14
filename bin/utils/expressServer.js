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
const Log_1 = require("./Log");
const errorTemplate_html_1 = __importStar(require("./errorTemplate.html"));
const vite_1 = require("vite");
const createViteServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default.Router();
    const vite = yield (0, vite_1.createServer)({
        root: "./",
        publicDir: path.resolve(path.join("./", config_1.config.static)),
        logLevel: "info",
        server: {
            middlewareMode: true,
            watch: {
                usePolling: true,
                interval: 100,
            },
        },
    });
    app.use(vite.middlewares);
    app.use("*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const url = req.originalUrl;
        try {
            const filePath = url.includes(".html")
                ? path.resolve(path.join("./src/views/", url + ".tsx"))
                : path.resolve(path.join("./src/views/", url, "index.tsx"));
            const { html, css, ids } = yield (0, HTMLBuilder_1.transformReact2HTMLCSS)(filePath);
            const style = `<style data-emotion="${ids.join(" ")}">${css}</style>`;
            const helmet = (0, HTMLBuilder_1.createHelmet)();
            const headers = (0, HTMLBuilder_1.createHeaders)().concat(helmet.headers);
            const script = path.join("/.cache/scripts", config_1.config.pathPrefix, config_1.config.js);
            const result = config_1.config.template({
                html,
                style,
                headers,
                script,
                helmet: helmet.attributes,
                noScript: helmet.body,
            });
            res
                .status(200)
                .set({ "Content-Type": "text/html" })
                .end(yield vite.transformIndexHtml(url, result));
        }
        catch (e) {
            const errorType = String(e);
            const stack = e.stack
                .split("\n")
                .map((item, i) => (i !== 0 ? item + "<br/>" : ""))
                .join("");
            res.send((0, errorTemplate_html_1.default)("Build Error", (0, errorTemplate_html_1.errorTemplate)(`<p class="color-red">${errorType}</p><p class="pl-20">${stack}</p>`)));
        }
    }));
    return { app, vite };
});
const wakeupExpressServer = () => {
    const app = (0, express_1.default)();
    config_1.config.server(app, express_1.default);
    // 404
    app.use((req, res) => {
        const html = `<div><h1 class="title text-center">404 Page Not Found</h1></div>`;
        res.status(404).send((0, errorTemplate_html_1.default)("", html));
    });
    app.listen(config_1.config.port, () => {
        console.log(Log_1.color.blue(`Listening http://${path.join(`localhost:${config_1.config.port}`, config_1.config.pathPrefix)}`));
    });
    createViteServer().then((vite) => {
        vite.app.use(vite.app);
    });
};
exports.wakeupExpressServer = wakeupExpressServer;
//# sourceMappingURL=expressServer.js.map