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
exports.server = void 0;
var watcher_1 = require("./watcher");
var glob_1 = __importDefault(require("glob"));
var path = __importStar(require("path"));
var fs_1 = __importDefault(require("fs"));
var crypto_1 = __importDefault(require("crypto"));
var watchSources = function () {
    (0, watcher_1.watchFiles)({
        change: function (filename, watcher) {
            console.log("change file: ", filename);
            var files = glob_1.default.sync(path.resolve("./src/**/*.{tsx,jsx}"));
            var appFilePath = path.resolve(".cache/app.tsx");
            var appImports = [];
            var scriptRunner = [[
                    "const checkRunScript = (module:object) => {",
                    "  Object.keys(module).forEach((key: string) => {",
                    "    if (key === \"script\") {",
                    "      // @ts-ignore",
                    "      module[key]();",
                    "    }",
                    "  })",
                    "};"
                ].join("\n"),
                "\n"];
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                var hashName = "Script_" + crypto_1.default.createHash("md5").update(file).digest("hex");
                appImports.push("import {script as ".concat(hashName, "} from \"").concat(path.relative(path.resolve(".cache"), file), "\";"));
                scriptRunner.push([
                    "checkRunScript(".concat(hashName, ");")
                ].join("\n"));
            }
            ;
            if (!fs_1.default.existsSync(path.resolve(".cache"))) {
                fs_1.default.mkdirSync(path.resolve(".cache"));
            }
            ;
            fs_1.default.writeFileSync(appFilePath, appImports.join("\n") + "\n" + scriptRunner.join("\n"), "utf-8");
        },
        add: function (filename, watcher) {
            watcher.add(filename);
        },
        ready: function () {
            console.log("READY WATCH");
        }
    });
};
var server = function () {
    watchSources();
};
exports.server = server;
