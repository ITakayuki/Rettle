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
const HTMLBuilder_1 = require("./HTMLBuilder");
const path = __importStar(require("path"));
const config_1 = require("./config");
const errorTemplate_html_1 = __importStar(require("./errorTemplate.html"));
const vite_1 = require("vite");
const fs_1 = __importDefault(require("fs"));
const wakeupExpressServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const vite = yield (0, vite_1.createServer)({
        plugins: [
            {
                name: "vite-plugin-rettle",
                apply: "serve",
                handleHotUpdate(context) {
                    // ファイルが保存された時にホットリロードする
                    // この記述がないと xxxx.pug を保存した時にリロードされない
                    context.server.ws.send({
                        type: "full-reload",
                    });
                    return [];
                },
                configureServer(server) {
                    server.middlewares.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                        const root = server.config.root;
                        let fullReqPath = path.join(root, "src/views", req.url || "");
                        let fullReqStaticPath = path.join(root, config_1.config.static, req.url || "");
                        if (fullReqPath.endsWith("/")) {
                            fullReqPath += "index.html";
                        }
                        if (fullReqStaticPath.endsWith("/")) {
                            fullReqStaticPath += "index.html";
                        }
                        if (fullReqPath.endsWith(".html") &&
                            req.url.split("/").filter((item) => {
                                if (item !== "") {
                                    return item;
                                }
                            })[0] === config_1.config.pathPrefix.replace(/\//g, "")) {
                            const tsxPath = `${fullReqPath.slice(0, Math.max(0, fullReqPath.lastIndexOf("."))) || fullReqPath}.tsx`.replace(config_1.config.pathPrefix, "");
                            if (fs_1.default.existsSync(tsxPath)) {
                                try {
                                    const { html, css, ids } = yield (0, HTMLBuilder_1.transformReact2HTMLCSS)(tsxPath);
                                    const style = `<style data-emotion="${ids.join(" ")}">${css}</style>`;
                                    const helmet = (0, HTMLBuilder_1.createHelmet)();
                                    const headers = (0, HTMLBuilder_1.createHeaders)().concat(helmet.headers);
                                    const script = path.join("/.cache/scripts", config_1.config.js);
                                    const result = config_1.config.template({
                                        html,
                                        style,
                                        headers,
                                        script,
                                        helmet: helmet.attributes,
                                        noScript: helmet.body,
                                        mode: "server",
                                    });
                                    return (0, vite_1.send)(req, res, result, "html", {});
                                }
                                catch (e) {
                                    const errorType = String(e);
                                    const stack = e.stack
                                        .split("\n")
                                        .map((item, i) => i !== 0 ? item + "<br/>" : "")
                                        .join("");
                                    return (0, vite_1.send)(req, res, (0, errorTemplate_html_1.default)("Build Error", (0, errorTemplate_html_1.errorTemplate)(`<p class="color-red">${errorType}</p><p class="pl-20">${stack}</p>`)), "html", {});
                                }
                            }
                            else if (fs_1.default.existsSync(fullReqStaticPath)) {
                                return next();
                            }
                            else {
                                const html = `<div><h1 class="title text-center">404 Page Not Found</h1></div>`;
                                return (0, vite_1.send)(req, res, (0, errorTemplate_html_1.default)("", html), "html", {});
                            }
                        }
                        else {
                            return next();
                        }
                    }));
                },
            },
        ],
        server: {
            port: config_1.config.port,
        },
        publicDir: config_1.config.static,
        base: config_1.config.pathPrefix,
    });
    yield vite.listen();
    vite.printUrls();
});
exports.wakeupExpressServer = wakeupExpressServer;
//# sourceMappingURL=expressServer.js.map