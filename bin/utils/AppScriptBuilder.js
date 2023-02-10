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
exports.eraseExports = exports.watchScript = exports.buildScript = exports.createCacheAppFile = exports.createTsConfigFile = void 0;
const esbuild_1 = __importDefault(require("esbuild"));
const Log_1 = require("./Log");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
const template_tsconfig_json_1 = __importDefault(require("./template-tsconfig.json"));
const Dependencies_1 = require("./Dependencies");
const config_1 = require("./config");
const glob_1 = __importDefault(require("glob"));
const utility_1 = require("./utility");
const acorn = __importStar(require("acorn"));
const acorn_jsx_1 = __importDefault(require("acorn-jsx"));
const typescript_1 = __importDefault(require("typescript"));
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
    return relativePath;
};
const createCacheAppFile = () => {
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        const jsFileName = path_1.default.basename(config_1.config.js).replace(".js", "");
        const jsBaseDir = path_1.default.dirname(config_1.config.js);
        for (const endpoint of config_1.config.endpoints) {
            const ignore = config_1.config.endpoints.filter((x, i, self) => {
                return self[i] !== endpoint && !endpoint.includes(self[i].replace("/**/*", ""));
            });
            const files = yield (0, Dependencies_1.getDependencies)(endpoint, ignore);
            const appResolvePath = createFileName(endpoint);
            const appFilePath = path_1.default.join(".cache/scripts", appResolvePath, jsBaseDir, `${jsFileName}.tsx`);
            const appImports = [];
            const scriptRunner = [];
            for (const file of files) {
                const hashName = "Script_" + crypto_1.default.createHash("md5").update(file).digest("hex");
                appImports.push(`import {script as ${hashName}} from "${path_1.default.relative(path_1.default.resolve(path_1.default.join(".cache/scripts", appResolvePath, jsBaseDir)), file).replace(".tsx", "").replace(".jsx", "")}";`);
                scriptRunner.push([
                    `${hashName}();`
                ].join("\n"));
            }
            yield (0, utility_1.mkdirp)(appFilePath);
            fs_1.default.writeFileSync(appFilePath, appImports.join("\n") + "\n" + scriptRunner.join("\n"), "utf-8");
        }
        resolve(null);
    }));
};
exports.createCacheAppFile = createCacheAppFile;
const buildScript = ({ outDir }) => {
    return new Promise(resolve => {
        esbuild_1.default.build(Object.assign({ bundle: true, 
            // all cache scripts
            entryPoints: glob_1.default.sync(path_1.default.resolve("./.cache/scripts/**/*.tsx"), {
                nodir: true
            }), outdir: outDir, sourcemap: process.env.NODE_ENV === "develop", platform: "browser", target: "es6", tsconfig: ".cache/tsconfig.json", define: {
                "process.env": JSON.stringify(process.env),
            } }, config_1.config.esbuild)).then(() => {
            console.log(Log_1.color.blue("Built Script."));
            resolve(null);
        });
    });
};
exports.buildScript = buildScript;
const watchScript = ({ outDir }) => {
    return new Promise(resolve => {
        esbuild_1.default.build(Object.assign({ bundle: true, watch: {
                onRebuild(error, result) {
                    if (error)
                        console.error("watch build failed:", error);
                },
            }, entryPoints: glob_1.default.sync(path_1.default.resolve("./.cache/scripts/**/*.tsx"), {
                nodir: true
            }), outdir: outDir, sourcemap: process.env.NODE_ENV === "develop", platform: "browser", target: "es6", tsconfig: ".cache/tsconfig.json", define: {
                "process.env": JSON.stringify(process.env),
            } }, config_1.config.esbuild)).then(() => {
            console.log(Log_1.color.blue("Watch App File."));
            resolve(null);
        });
    });
};
exports.watchScript = watchScript;
const eraseExports = (code) => {
    const jsCode = typescript_1.default.transpileModule(code, {
        compilerOptions: {
            target: 99,
            "jsx": 1
        }
    }).outputText;
    console.log(jsCode);
    //@ts-ignore
    const ast = acorn.Parser.extend((0, acorn_jsx_1.default)({})).parse(jsCode, {
        ecmaVersion: 2019,
        sourceType: "module"
    });
    //@ts-ignore
    const functionNodes = ast.body.filter(item => item.type === "FunctionDeclaration" || item.type === "VariableDeclaration");
    //@ts-ignore
    const exportNodes = ast.body.filter((item) => item.type === "ExportDefaultDeclaration");
    const objects = {};
    if (exportNodes[0].declaration.name) {
        // export default **
        for (const node of functionNodes) {
            const { start, end } = node;
            const text = code.slice(start, end);
            if (node.type === "FunctionDeclaration") {
                const key = node.id.name;
                objects[key] = text;
            }
            else if (node.type === "VariableDeclaration") {
                const key = node.declarations[0].id.name;
                objects[key] = text;
            }
            const exportName = exportNodes[0].declaration.name;
            const exportLine = jsCode.slice(exportNodes[0].start, exportNodes[0].end);
            console.log(exportNodes[0]);
            const result = jsCode.replace(objects[exportName], objects[exportName].split("\n").map(item => {
                return "//" + item;
            }).join("\n")).replace(exportLine, "//" + exportLine);
            return result;
        }
        ;
    }
    else {
        // export default ()=>
        const exportName = exportNodes[0];
        const { start, end } = exportName;
        const exportStr = jsCode.slice(start, end);
        const result = jsCode.replace(exportStr, exportStr.split("\n").map(item => "//" + item).join("\n"));
        return result;
    }
    return "";
};
exports.eraseExports = eraseExports;
