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
Object.defineProperty(exports, "__esModule", { value: true });
exports.wakeupViteServer = void 0;
const config_1 = require("./config");
const vite_1 = require("vite");
const vitePlugin_1 = require("./vitePlugin");
const wakeupViteServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const vite = yield (0, vite_1.createServer)({
        plugins: [vitePlugin_1.vitePlugin],
        server: {
            port: config_1.config.server.port,
            host: config_1.config.server.host,
        },
        publicDir: config_1.config.static,
        base: config_1.config.pathPrefix,
        define: {
            "process.env": JSON.stringify(Object.assign(process.env, config_1.config.envs)),
        },
    });
    yield vite.listen();
    vite.printUrls();
});
exports.wakeupViteServer = wakeupViteServer;
//# sourceMappingURL=viteServer.js.map