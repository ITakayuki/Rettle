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
exports.watchScript = exports.buildScript = exports.createCacheAppFile = exports.createTsConfigFile = void 0;
const esbuild_1 = __importDefault(require("esbuild"));
const Log_1 = require("./Log");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
const template_tsconfig_json_1 = __importDefault(require("./template-tsconfig.json"));
const Dependencies_1 = require("./Dependencies");
const config_1 = require("./config");
const glob_1 = __importDefault(require("glob"));
const createTsConfigFile = () => {
    return new Promise(resolve => {
        if (!fs_1.default.existsSync(path_1.default.resolve(".cache"))) {
            fs_1.default.mkdirSync(path_1.default.resolve(".cache"));
        }
        fs_1.default.writeFileSync(path_1.default.resolve("./.cache/tsconfig.json"), JSON.stringify(template_tsconfig_json_1.default, null, 2), "utf-8");
        resolve(null);
    });
};
exports.createTsConfigFile = createTsConfigFile;
const createFileName = (filePath) => {
    const relativePath = path_1.default.relative(path_1.default.resolve("./src/views/"), filePath).replace("/**/*", "").replace("**/*", "");
    return relativePath.replace("/", "-") + ".tsx";
};
const createCacheAppFile = () => {
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        for (const endpoint of config_1.config.endpoints) {
            const ignore = config_1.config.endpoints.filter((x, i, self) => {
                return self[i] !== endpoint && !endpoint.includes(self[i].replace("/**/*", ""));
            });
            const files = yield (0, Dependencies_1.getDependencies)(endpoint, ignore);
            const appFilename = createFileName(endpoint);
            const appFilePath = path_1.default.resolve(`.cache/app-${appFilename}`);
            const appImports = [];
            const scriptRunner = [];
            for (const file of files) {
                const hashName = "Script_" + crypto_1.default.createHash("md5").update(file).digest("hex");
                appImports.push(`import {script as ${hashName}} from "${path_1.default.relative(path_1.default.resolve(".cache"), file).replace(".tsx", "").replace(".jsx", "")}";`);
                scriptRunner.push([
                    `${hashName}();`
                ].join("\n"));
                if (!fs_1.default.existsSync(path_1.default.resolve(".cache"))) {
                    fs_1.default.mkdirSync(path_1.default.resolve(".cache"));
                }
                ;
            }
            fs_1.default.writeFileSync(appFilePath, appImports.join("\n") + "\n" + scriptRunner.join("\n"), "utf-8");
        }
        resolve(null);
    }));
};
exports.createCacheAppFile = createCacheAppFile;
const buildScript = ({ minify, outDir }) => {
    return new Promise(resolve => {
        esbuild_1.default.build({
            bundle: true,
            entryPoints: glob_1.default.sync(path_1.default.resolve("./.cache/**/*.tsx"), {
                nodir: true
            }),
            outdir: outDir,
            sourcemap: process.env.NODE_ENV === "develop",
            platform: "browser",
            target: "es6",
            tsconfig: ".cache/tsconfig.json",
            define: {
                "process.env": JSON.stringify(process.env),
            },
            minify: minify,
        }).then(() => {
            console.log(Log_1.color.blue("Built Script."));
            resolve(null);
        });
    });
};
exports.buildScript = buildScript;
const watchScript = ({ minify, outDir }) => {
    return new Promise(resolve => {
        esbuild_1.default.build({
            bundle: true,
            watch: {
                onRebuild(error, result) {
                    if (error)
                        console.error("watch build failed:", error);
                },
            },
            entryPoints: glob_1.default.sync(path_1.default.resolve("./.cache/**/*.tsx"), {
                nodir: true
            }),
            outdir: outDir,
            sourcemap: process.env.NODE_ENV === "develop",
            platform: "browser",
            target: "es6",
            tsconfig: ".cache/tsconfig.json",
            define: {
                "process.env": JSON.stringify(process.env),
            },
            minify: minify,
        }).then(() => {
            console.log(Log_1.color.blue("Watch App File."));
            resolve(null);
        });
    });
};
exports.watchScript = watchScript;
