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
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const watcher_1 = require("./watcher");
const Log_1 = require("../utils/Log");
const AppScriptBuilder_1 = require("../utils/AppScriptBuilder");
const config_1 = require("../utils/config");
const path = __importStar(require("path"));
const watchSources = () => {
    (0, watcher_1.watchFiles)({
        change: (filename) => {
            console.log(Log_1.color.blue(`【Change File】-> ${filename}`));
            (0, AppScriptBuilder_1.createCacheAppFile)().then();
        },
        add: (filename, watcher) => {
            console.log(Log_1.color.blue(`【Add File】-> ${filename}`));
            watcher.add(filename);
        },
        unlink: (filename, watcher) => {
            console.log(Log_1.color.blue(`【Unlink File】-> ${filename}`));
            watcher.unwatch(filename);
        },
        unlinkDir: (filename, watcher) => {
            console.log(Log_1.color.blue(`【Unlink Dir】-> ${filename}`));
            watcher.unwatch(filename);
        },
        ready: () => {
            console.log(Log_1.color.blue('Ready to Watching'));
        }
    });
};
const server = () => __awaiter(void 0, void 0, void 0, function* () {
    const buildSetupOptions = {
        minify: config_1.config.esbuild.minify,
        outDir: path.join(config_1.config.outDir, config_1.config.pathPrefix)
    };
    yield (0, AppScriptBuilder_1.createTsConfigFile)();
    yield (0, AppScriptBuilder_1.createCacheAppFile)();
    watchSources();
    yield (0, AppScriptBuilder_1.buildScript)(buildSetupOptions);
    yield (0, AppScriptBuilder_1.watchScript)(buildSetupOptions);
});
exports.server = server;
