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
exports.getDependencies = void 0;
const glob_1 = __importDefault(require("glob"));
const madge_1 = __importDefault(require("madge"));
const fs_1 = __importDefault(require("fs"));
const checkScript = (filePath) => {
    return fs_1.default.readFileSync(filePath, "utf-8").includes("export const script");
};
const getDependencies = (targetDir, ignore) => __awaiter(void 0, void 0, void 0, function* () {
    const targets = glob_1.default.sync(targetDir, {
        ignore: ignore,
        nodir: true
    });
    const dependenciesFiles = [];
    const madgePromises = [];
    for (const target of targets) {
        madgePromises.push(() => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, madge_1.default)(target);
            const obj = res.obj();
            Object.keys(obj).forEach((key) => {
                if (checkScript(key)) {
                    dependenciesFiles.push(key);
                }
                for (const targetFilePath of obj[key]) {
                    if (checkScript(key)) {
                        dependenciesFiles.push(targetFilePath);
                    }
                }
            });
        }));
    }
    ;
    yield Promise.all(madgePromises);
    return dependenciesFiles.filter((x, i, self) => {
        return self.indexOf(x) === i;
    });
});
exports.getDependencies = getDependencies;
