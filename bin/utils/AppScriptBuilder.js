"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchScript = exports.buildScript = exports.createCacheAppFile = exports.createTsConfigFile = void 0;
var esbuild_1 = __importDefault(require("esbuild"));
var Log_1 = require("./Log");
var path_1 = __importDefault(require("path"));
var glob_1 = __importDefault(require("glob"));
var fs_1 = __importDefault(require("fs"));
var crypto_1 = __importDefault(require("crypto"));
var template_tsconfig_json_1 = __importDefault(require("./template-tsconfig.json"));
var createTsConfigFile = function () {
    return new Promise(function (resolve) {
        if (!fs_1.default.existsSync(path_1.default.resolve(".cache"))) {
            fs_1.default.mkdirSync(path_1.default.resolve(".cache"));
        }
        fs_1.default.writeFileSync(path_1.default.resolve("./.cache/tsconfig.ts"), JSON.stringify(template_tsconfig_json_1.default, null, 2), "utf-8");
        resolve(null);
    });
};
exports.createTsConfigFile = createTsConfigFile;
var createCacheAppFile = function () {
    return new Promise(function (resolve) {
        var files = glob_1.default.sync(path_1.default.resolve("./src/**/*.{tsx,jsx}"));
        var appFilePath = path_1.default.resolve(".cache/app.tsx");
        var appImports = [];
        var scriptRunner = [];
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            var Component = fs_1.default.readFileSync(file, "utf-8");
            if (Component.includes("export const script")) {
                var hashName = "Script_" + crypto_1.default.createHash("md5").update(file).digest("hex");
                appImports.push("import {script as ".concat(hashName, "} from \"").concat(path_1.default.relative(path_1.default.resolve(".cache"), file).replace(".tsx", "").replace(".jsx", ""), "\";"));
                scriptRunner.push([
                    "".concat(hashName, "();")
                ].join("\n"));
                if (!fs_1.default.existsSync(path_1.default.resolve(".cache"))) {
                    fs_1.default.mkdirSync(path_1.default.resolve(".cache"));
                }
                ;
                fs_1.default.writeFileSync(appFilePath, appImports.join("\n") + "\n" + scriptRunner.join("\n"), "utf-8");
            }
        }
        resolve(null);
    });
};
exports.createCacheAppFile = createCacheAppFile;
var buildScript = function (_a) {
    var minify = _a.minify, outDir = _a.outDir;
    return new Promise(function (resolve) {
        esbuild_1.default.build({
            bundle: true,
            entryPoints: [path_1.default.resolve(".cache/app.tsx")],
            outfile: outDir,
            sourcemap: process.env.NODE_ENV === "develop",
            platform: "browser",
            target: "es6",
            tsconfig: ".cache/tsconfig.ts",
            define: {
                "process.env": JSON.stringify(process.env),
            },
            minify: minify,
        }).then(function () {
            console.log(Log_1.color.blue("Built Script."));
            resolve(null);
        });
    });
};
exports.buildScript = buildScript;
var watchScript = function (_a) {
    var minify = _a.minify, outDir = _a.outDir;
    return new Promise(function (resolve) {
        esbuild_1.default.build({
            bundle: true,
            watch: {
                onRebuild: function (error, result) {
                    if (error)
                        console.error("watch build failed:", error);
                },
            },
            entryPoints: [path_1.default.resolve(".cache/app.tsx")],
            outfile: outDir,
            sourcemap: process.env.NODE_ENV === "develop",
            platform: "browser",
            target: "es6",
            tsconfig: ".cache/tsconfig.ts",
            define: {
                "process.env": JSON.stringify(process.env),
            },
            minify: minify,
        }).then(function () {
            console.log(Log_1.color.blue("Watch App File."));
            resolve(null);
        });
    });
};
exports.watchScript = watchScript;
