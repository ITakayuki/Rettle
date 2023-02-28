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
exports.deleteOutputDir = exports.copyStatic = void 0;
const fs_1 = __importDefault(require("fs"));
const config_1 = require("./config");
const path = __importStar(require("path"));
const rimraf_1 = require("rimraf");
const glob_1 = __importDefault(require("glob"));
const copyStatic = () => {
    const files = glob_1.default.sync(path.resolve(path.join("./", config_1.config.static, "**/*")), {
        nodir: true
    });
    for (const file of files) {
        const before = path.join("/", config_1.config.static);
        const after = path.join("/", config_1.config.outDir, config_1.config.pathPrefix);
        fs_1.default.copyFileSync(file, file.replace(before, after));
    }
};
exports.copyStatic = copyStatic;
const deleteOutputDir = () => {
    (0, rimraf_1.rimrafSync)(path.join(config_1.config.outDir));
};
exports.deleteOutputDir = deleteOutputDir;
//# sourceMappingURL=directoryControl.js.map