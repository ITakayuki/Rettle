"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.getIgnores = void 0;
const sortStringsBySlashCount = (strings) => {
    const slashCountMap = new Map();
    // 各文字列の/の数をカウントする
    for (const string of strings) {
        const count = (string.match(/\//g) || []).length;
        slashCountMap.set(string, count);
    }
    // /の数でソートする
    const sorted = strings.sort((a, b) => {
        return slashCountMap.get(b) - slashCountMap.get(a);
    });
    return sorted;
};
const getConfigure = () => {
    const path = require("path");
    const fs = require("fs");
    const { extensions } = require("interpret");
    const deepmerge = require("deepmerge");
    const { defaultConfig } = require("./defaultConfigure");
    const { isPlainObject } = require("is-plain-object");
    const rechoir = require("rechoir");
    const tsConfigPath = path.resolve("./rettle-config.ts");
    const jsConfigPath = path.resolve("./rettle-config.js");
    const inputConfig = (() => {
        if (fs.existsSync(tsConfigPath)) {
            rechoir.prepare(extensions, './rettle-config.ts');
            const requireConfig = require(tsConfigPath).default;
            return requireConfig;
        }
        else if (fs.existsSync(jsConfigPath)) {
            return require(jsConfigPath).default;
        }
        else {
            return {};
        }
    });
    const config = deepmerge(defaultConfig, inputConfig(), {
        isMergeableObject: isPlainObject
    });
    config.endpoints = sortStringsBySlashCount(config.endpoints);
    console.log(JSON.stringify(config, null, 2));
    return config;
};
const getIgnores = (endpoint) => {
    const ignore = exports.config.endpoints.filter((x, i, self) => {
        return self[i] !== endpoint && !endpoint.includes(self[i].replace("/**/*", ""));
    });
    return ignore;
};
exports.getIgnores = getIgnores;
exports.config = getConfigure();
//# sourceMappingURL=config.js.map