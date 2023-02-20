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
exports.getEntryPaths = exports.createHash = exports.mkdirp = void 0;
const path = __importStar(require("path"));
const fs_1 = __importDefault(require("fs"));
const config_1 = require("./config");
const glob_1 = __importDefault(require("glob"));
const mkdirp = (filePath) => {
    return new Promise(resolve => {
        const dirPath = path.extname(filePath) !== "" ? path.dirname(filePath) : filePath;
        const parts = dirPath.split(path.sep);
        for (let i = 1; i <= parts.length; i++) {
            const currPath = path.join.apply(null, parts.slice(0, i));
            if (!fs_1.default.existsSync(currPath)) {
                fs_1.default.mkdirSync(currPath);
            }
            if (i === parts.length) {
                resolve(null);
            }
        }
    });
};
exports.mkdirp = mkdirp;
const djb2Hash = (str) => {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i);
    }
    return hash;
};
const createHash = (str) => {
    const hash = djb2Hash(str);
    const fullStr = ('0000000' + (hash & 0xFFFFFF).toString(16));
    return fullStr.substring(fullStr.length - 8, fullStr.length);
};
exports.createHash = createHash;
const getEntryPaths = () => {
    const entryPaths = {};
    config_1.config.endpoints.map((endpoint) => {
        const ignore = (0, config_1.getIgnores)(endpoint);
        const files = glob_1.default.sync(path.join(endpoint, "/**/*"), {
            ignore,
            nodir: true
        });
        entryPaths[endpoint] = files;
    });
    return entryPaths;
};
exports.getEntryPaths = getEntryPaths;
//# sourceMappingURL=utility.js.map