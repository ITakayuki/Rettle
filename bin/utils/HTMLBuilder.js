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
exports.createHelmet = exports.createHeaders = exports.createHeaderTags = exports.transformReact2HTMLCSS = void 0;
const esBuild = __importStar(require("esbuild"));
const vm_1 = __importDefault(require("vm"));
const fs_1 = __importDefault(require("fs"));
const path = __importStar(require("path"));
const config_1 = require("./config");
const variable_1 = require("./variable");
const react_helmet_1 = __importDefault(require("react-helmet"));
const { dependencies } = JSON.parse(fs_1.default.readFileSync(path.resolve("./package.json"), "utf-8"));
const transformReact2HTMLCSS = (path) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let res;
        esBuild.build({
            bundle: true,
            entryPoints: [path],
            platform: "node",
            write: false,
            external: Object.keys(dependencies),
            plugins: config_1.config.esbuild.plugins,
        }).then(res => {
            try {
                const code = res.outputFiles[0].text;
                const context = { exports, module, process, require, __filename, __dirname };
                vm_1.default.runInNewContext(code, context);
                const result = context.module.exports.default;
                if ("html" in result && "css" in result && "ids" in result) {
                    resolve(result);
                }
                else {
                    reject(new Error(`${path}: The value of export default is different.`));
                }
            }
            catch (e) {
                reject(e);
            }
        }).catch(e => {
            reject(e);
        });
    }));
};
exports.transformReact2HTMLCSS = transformReact2HTMLCSS;
const createHeaderTags = (tagName, contents) => {
    return contents.map(item => {
        const content = Object.keys(item).map(key => {
            return `${key}="${item[key]}"`;
        });
        return `<${tagName} ${content.join(" ")} ${tagName === "script" ? "></script>" : ">"}`;
    });
};
exports.createHeaderTags = createHeaderTags;
const createHeaders = () => {
    var _a, _b, _c, _d, _e, _f;
    const versionMeta = config_1.config.version ? [`<meta name="generator" content="Rettle ${variable_1.version}">`] : [""];
    const headerMeta = ((_a = config_1.config.header) === null || _a === void 0 ? void 0 : _a.meta) ? (0, exports.createHeaderTags)("meta", (_b = config_1.config.header) === null || _b === void 0 ? void 0 : _b.meta) : [""];
    const headerLink = ((_c = config_1.config.header) === null || _c === void 0 ? void 0 : _c.link) ? (0, exports.createHeaderTags)("link", (_d = config_1.config.header) === null || _d === void 0 ? void 0 : _d.link) : [""];
    const headerScript = ((_e = config_1.config.header) === null || _e === void 0 ? void 0 : _e.script) ? (0, exports.createHeaderTags)("script", (_f = config_1.config.header) === null || _f === void 0 ? void 0 : _f.script) : [""];
    return [
        ...versionMeta,
        ...headerMeta,
        ...headerLink,
        ...headerScript,
    ];
};
exports.createHeaders = createHeaders;
const createHelmet = () => {
    const helmet = react_helmet_1.default.renderStatic();
    const heads = ["title", "base", "link", "meta", "script", "style"];
    const attributes = ["bodyAttributes", "htmlAttributes"];
    const body = ["noscript"];
    const results = {
        headers: [],
        attributes: {
            body: "",
            html: ""
        },
        body: []
    };
    for (const opts of heads) {
        const opt = opts;
        if (helmet[opt]) {
            results.headers.push(helmet[opt].toString());
        }
    }
    results.attributes.body = helmet.bodyAttributes.toString() || "";
    results.attributes.html = helmet.htmlAttributes.toString() || "";
    for (const opts of body) {
        const opt = opts;
        if (helmet[opt]) {
            results.body.push(helmet[opt].toString());
        }
    }
    return results;
};
exports.createHelmet = createHelmet;
//# sourceMappingURL=HTMLBuilder.js.map