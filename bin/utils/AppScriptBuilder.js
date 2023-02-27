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
exports.outputFormatFiles = exports.eraseExports = exports.translateTs2Js = exports.watchScript = exports.buildScript = exports.createCacheAppFile = exports.createTsConfigFile = void 0;
const esbuild_1 = __importDefault(require("esbuild"));
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
const utility_2 = require("./utility");
const deepmerge_1 = __importDefault(require("deepmerge"));
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
const createComponentDep = (filepath, context) => __awaiter(void 0, void 0, void 0, function* () {
    let results = {};
    const tempObj = yield (0, Dependencies_1.getMadgeLeaves)(filepath, {
        baseDir: "./"
    });
    let obj = tempObj.filter(item => item !== filepath);
    for (const dep of obj) {
        results = (0, deepmerge_1.default)(results, createComponentDep(dep, results));
    }
    return results;
});
const createCacheAppFile = () => {
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        const jsFileName = path_1.default.basename(config_1.config.js).replace(".js", "");
        const jsBaseDir = path_1.default.dirname(config_1.config.js);
        for (const endpoint of config_1.config.endpoints) {
            const ignore = (0, config_1.getIgnores)(endpoint);
            const files = yield (0, Dependencies_1.getDependencies)(endpoint, ignore);
            const appResolvePath = createFileName(endpoint);
            const appFilePath = path_1.default.join(".cache/scripts", appResolvePath, jsBaseDir, `${jsFileName}.js`);
            const appImports = [`import {createComponent} from "rettle/core";`];
            const scriptRunner = [];
            const defs = [];
            for (const file of files) {
                const obj = yield (0, Dependencies_1.getMadgeLeaves)(file, {
                    baseDir: "./"
                });
                const depResult = obj.filter(item => item !== file);
                const args = [];
                for (const dep of depResult) {
                    const depName = `createComponent("${(0, utility_2.createHash)(path_1.default.resolve(dep))}",  Script_${crypto_1.default.createHash("md5").update(dep).digest("hex")}(""))`;
                    if ((0, Dependencies_1.checkScript)(dep)) {
                        args.push(`${(0, utility_2.getFilesName)(dep)}: ${depName}`);
                    }
                }
                const depsArg = `{\n${args.join(",\n")}\n}`;
                const hash = (0, utility_2.createHash)(path_1.default.resolve(file));
                const hashName = crypto_1.default.createHash("md5").update(file).digest("hex");
                appImports.push(`import {script as Script_${hashName}} from "${path_1.default.relative(path_1.default.resolve(path_1.default.join(".cache/scripts", appResolvePath, jsBaseDir)), file.replace("src/", ".cache/src/")).replace(".tsx", "").replace(".jsx", "")}";`);
                if (file.includes("src/views")) {
                    const resu = yield createComponentDep(file, {});
                    console.log(resu);
                    scriptRunner.push([
                        `createComponent("${hash}", Script_${hashName}("${hash}", ${depsArg}));`
                    ].join("\n"));
                }
            }
            yield (0, utility_1.mkdirp)(appFilePath);
            const code = [
                appImports.join("\n"),
                scriptRunner.join("\n")
            ];
            fs_1.default.writeFileSync(appFilePath, code.join("\n"), "utf-8");
        }
        resolve(null);
    }));
};
exports.createCacheAppFile = createCacheAppFile;
const buildScript = ({ outDir }) => {
    return new Promise(resolve => {
        esbuild_1.default.build(Object.assign({ bundle: true, 
            // all cache scripts
            entryPoints: glob_1.default.sync(path_1.default.resolve("./.cache/scripts/**/*.js"), {
                nodir: true
            }), outdir: outDir, sourcemap: process.env.NODE_ENV === "develop", platform: "browser", target: "es6", tsconfig: ".cache/tsconfig.json", define: {
                "process.env": JSON.stringify(process.env),
            } }, config_1.config.esbuild)).then(() => {
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
            }, entryPoints: glob_1.default.sync(path_1.default.resolve("./.cache/scripts/**/*.js"), {
                nodir: true
            }), outdir: outDir, sourcemap: process.env.NODE_ENV === "develop", platform: "browser", target: "es6", tsconfig: ".cache/tsconfig.json", define: {
                "process.env": JSON.stringify(process.env),
            } }, config_1.config.esbuild)).then(() => {
            resolve(null);
        });
    });
};
exports.watchScript = watchScript;
const translateTs2Js = (code) => {
    return typescript_1.default.transpileModule(code, {
        compilerOptions: {
            target: 99,
            "jsx": 2
        }
    }).outputText;
};
exports.translateTs2Js = translateTs2Js;
const eraseExports = (code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jsCode = (0, exports.translateTs2Js)(code);
        //@ts-ignore
        const ast = acorn.Parser.extend((0, acorn_jsx_1.default)()).parse(jsCode, {
            ecmaVersion: 2019,
            sourceType: "module"
        });
        // @ts-ignore
        const importNodes = ast.body.filter(item => item.type === "ImportDeclaration" && (item.source.value === "react" || item.source.raw === "react"));
        //@ts-ignore
        const functionNodes = ast.body.filter(item => item.type === "FunctionDeclaration" || item.type === "VariableDeclaration");
        //@ts-ignore
        const exportNodes = ast.body.filter((item) => item.type === "ExportDefaultDeclaration");
        const importReact = importNodes.length !== 0 ? jsCode.slice(importNodes.start, importNodes.end) : null;
        const objects = {};
        if (!exportNodes)
            throw new Error("Cannot Found export");
        if (!exportNodes[0])
            throw new Error("Cannot Found export");
        if ("declaration" in exportNodes[0] === false)
            throw new Error("Cannot Found export");
        if (exportNodes[0].declaration.name) {
            // export default **
            for (const node of functionNodes) {
                const { start, end } = node;
                const text = jsCode.slice(start, end);
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
                const removeReactJsCode = importReact ? jsCode.replace(importReact, "//" + importReact) : jsCode;
                const result = removeReactJsCode.replace(objects[exportName], objects[exportName].split("\n").map(item => {
                    return "//" + item;
                }).join("\n")).replace(exportLine, "export default () => {}");
                return (0, exports.translateTs2Js)(result);
            }
            ;
        }
        else {
            // export default ()=>
            let replaceDefaultRettle = "";
            let name = "";
            let cacheName = "";
            if (exportNodes[0]) {
                if (exportNodes[0].declaration) {
                    if (exportNodes[0].declaration.arguments) {
                        if (exportNodes[0].declaration.arguments[1]) {
                            if (exportNodes[0].declaration.arguments[1].callee) {
                                if (exportNodes[0].declaration.arguments[1].callee.name) {
                                    name = exportNodes[0].declaration.arguments[1].callee.name;
                                }
                            }
                        }
                    }
                }
            }
            if (name) {
                for (const node of functionNodes) {
                    const { start, end } = node;
                    const text = jsCode.slice(start, end);
                    // console.log(node.declarations[0].init.callee.name)
                    if (node.declarations[0].init.callee) {
                        let cache = node.declarations[0].init.callee.property ? node.declarations[0].init.callee.property.name : node.declarations[0].init.callee.name;
                        if (cache === "createCache") {
                            cacheName = node.declarations[0].id.name;
                        }
                    }
                    if (node.type === "FunctionDeclaration") {
                        const key = node.id.name;
                        objects[key] = text;
                    }
                    else if (node.type === "VariableDeclaration") {
                        const key = node.declarations[0].id.name;
                        objects[key] = text;
                    }
                }
                replaceDefaultRettle = jsCode.replace(objects[name], objects[name].split("\n").map(item => {
                    return "//" + item;
                }).join("\n")).replace(objects[cacheName], "//" + objects[cacheName]);
            }
            else {
                replaceDefaultRettle = jsCode;
            }
            const exportName = exportNodes[0];
            const { start, end } = exportName;
            const exportStr = jsCode.slice(start, end);
            const removeReactJsCode = importReact ? replaceDefaultRettle.replace(importReact, "//" + importReact) : replaceDefaultRettle;
            const result = removeReactJsCode.replace(exportStr, exportStr.split("\n").map(item => "//" + item).join("\n")) + "\nexport default () => {}";
            return (0, exports.translateTs2Js)(result);
        }
        return "";
    }
    catch (e) {
        throw e;
    }
});
exports.eraseExports = eraseExports;
const outputFormatFiles = (file) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const filePath = path_1.default.isAbsolute(file) ? path_1.default.relative("./", file) : file;
            const outPath = path_1.default.join(".cache/", filePath).replace(".tsx", ".js");
            const sourceCode = fs_1.default.readFileSync(filePath, "utf-8");
            yield (0, utility_1.mkdirp)(outPath);
            if (path_1.default.extname(filePath).includes("tsx")) {
                const code = yield (0, exports.eraseExports)(sourceCode);
                fs_1.default.writeFileSync(outPath, code, "utf-8");
            }
            else {
                const code = (0, exports.translateTs2Js)(sourceCode);
                fs_1.default.writeFileSync(outPath, code, "utf-8");
            }
            resolve(null);
        }
        catch (e) {
            reject(e);
        }
    }));
};
exports.outputFormatFiles = outputFormatFiles;
//# sourceMappingURL=AppScriptBuilder.js.map