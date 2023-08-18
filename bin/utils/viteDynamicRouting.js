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
exports.checkDynamicRoute = exports.viteDynamicRouting = void 0;
const node_path_1 = __importDefault(require("node:path"));
const glob = __importStar(require("glob"));
const config_1 = require("./config");
const viteCompileTsxFile_1 = require("./viteCompileTsxFile");
const getDynamicRootFiles = () => {
    const files = glob.sync(node_path_1.default.join("./", config_1.config.root, "./**/*[[]*[]]*/*"), {
        nodir: true,
    });
    return files;
};
const getTargetFileData = (filePath) => {
    const pattern = /\[(.*?)\]/g;
    const id = filePath.match(pattern)[0].replace("[", "").replace("]", "");
    return { path: filePath, id };
};
const checkDynamicRoute = (request) => {
    const files = getDynamicRootFiles();
    const requestPathArray = node_path_1.default.dirname(request).split("/");
    const nearDir = requestPathArray[requestPathArray.length - 1];
    const replaceReg = new RegExp(request.replace(nearDir, "[[]|[]]").replace(node_path_1.default.extname(request), ""), "g");
    for (const file of files) {
        if (replaceReg.test(file)) {
            return true;
        }
    }
    return false;
};
exports.checkDynamicRoute = checkDynamicRoute;
const viteDynamicRouting = (tsxPath) => __awaiter(void 0, void 0, void 0, function* () {
    const fileData = getTargetFileData(tsxPath);
    if (fileData) {
        try {
            const result = yield (0, viteCompileTsxFile_1.compileDynamicTsx)(fileData.path, fileData.id);
            return yield Promise.resolve(result);
        }
        catch (e) {
            return yield Promise.reject(e);
        }
    }
    else {
        return yield Promise.reject();
    }
});
exports.viteDynamicRouting = viteDynamicRouting;
//# sourceMappingURL=viteDynamicRouting.js.map