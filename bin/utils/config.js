"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var getConfigure = function () {
    var path = require("path");
    var fs = require("fs");
    var extensions = require("inspector").extensions;
    var deepmerge = require("deepmerge");
    var defaultConfig = require("./defaultConfigure").defaultConfig;
    var isPlainObject = require("is-plain-object").isPlainObject;
    var rechoir = require("rechoir");
    var tsConfigPath = path.resolve("./rettle.config.ts");
    var jsConfigPath = path.resolve("./rettle.config.js");
    console.log("PATH: ", tsConfigPath);
    var inputConfig = (function () {
        if (fs.existsSync(tsConfigPath)) {
            rechoir.prepare(extensions, './rettle.config.ts');
            var requireConfig = require(tsConfigPath);
            console.log("CONFIG: ", requireConfig);
            return requireConfig;
        }
        else if (fs.existsSync(jsConfigPath)) {
            return require(jsConfigPath);
        }
        else {
            return {};
        }
    });
    var config = deepmerge(defaultConfig, inputConfig(), {
        isMergeableObject: isPlainObject
    });
    return config;
};
exports.config = getConfigure();
