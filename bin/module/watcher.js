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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchFiles = void 0;
var chokidar_1 = __importDefault(require("chokidar"));
var path = __importStar(require("path"));
var watchFiles = function (args) {
    var srcAllFilesPath = path.resolve("./src/**/*.{ts,tsx,js,jsx}");
    var watcher = chokidar_1.default.watch(srcAllFilesPath, {
        persistent: true,
        awaitWriteFinish: true,
    });
    watcher.on("ready", function () {
        if (args.ready) {
            args.ready(watcher);
        }
        watcher.on("change", function (filename, status) {
            if (args.change) {
                args.change(filename, watcher);
            }
        });
        watcher.on("add", function (filename, status) {
            if (args.add) {
                args.add(filename, watcher);
            }
        });
        watcher.on("unlink", function (filename) {
            if (args.unlink) {
                args.unlink(filename, watcher);
            }
        });
        watcher.on("unlinkDir", function (filename) {
            if (args.unlinkDir) {
                args.unlinkDir(filename, watcher);
            }
        });
    });
};
exports.watchFiles = watchFiles;
