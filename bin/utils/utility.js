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
exports.mkdirp = void 0;
const path = __importStar(require("path"));
const fs_1 = __importDefault(require("fs"));
const mkdirp = (filePath) => {
    return new Promise(resolve => {
        const dirPath = path.extname(filePath) !== "" ? path.dirname(filePath) : filePath;
        console.log("dire: ", dirPath);
        const parts = dirPath.split(path.sep);
        for (let i = 1; i <= parts.length; i++) {
            const currPath = path.join.apply(null, parts.slice(0, i));
            console.log("EXIST: ", !fs_1.default.existsSync(currPath));
            if (!fs_1.default.existsSync(currPath)) {
                console.log("create DIR");
                fs_1.default.mkdirSync(currPath);
            }
            if (i === parts.length) {
                resolve(null);
            }
        }
    });
};
exports.mkdirp = mkdirp;
