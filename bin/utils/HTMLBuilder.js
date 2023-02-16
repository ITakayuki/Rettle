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
exports.createHeaderTags = exports.transformReact2HTMLCSS = void 0;
const esBuild = __importStar(require("esbuild"));
const esbuild_plugin_babel_1 = __importDefault(require("@itkyk/esbuild-plugin-babel"));
const vm_1 = __importDefault(require("vm"));
const fs_1 = __importDefault(require("fs"));
const path = __importStar(require("path"));
const { dependencies } = JSON.parse(fs_1.default.readFileSync(path.resolve("./package.json"), "utf-8"));
const transformReact2HTMLCSS = (path) => {
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield esBuild.build({
            bundle: true,
            entryPoints: [path],
            platform: "node",
            write: false,
            external: Object.keys(dependencies),
            plugins: [
                (0, esbuild_plugin_babel_1.default)({
                    filter: /.ts?x/,
                    babel: {
                        presets: ["@babel/preset-env", "@babel/preset-typescript", ["@babel/preset-react", {
                                    "runtime": "automatic", "importSource": "@emotion/react"
                                }]],
                        plugins: ["@emotion/babel-plugin"]
                    }
                })
            ]
        });
        const code = res.outputFiles[0].text;
        const context = { exports, module, process, require, __filename, __dirname };
        vm_1.default.runInNewContext(code, context);
        resolve(context.module.exports.default);
    }));
};
exports.transformReact2HTMLCSS = transformReact2HTMLCSS;
const createHeaderTags = (tagName, contents) => {
    return contents.map(item => {
        return `<${tagName} ${Object.keys(item).map(key => {
            `${key} = "${item[key]}"`;
        }).join(" ")} >`;
    });
};
exports.createHeaderTags = createHeaderTags;
