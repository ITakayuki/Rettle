"use strict";
exports.getConfigure = function () {
    var path = require("path");
    var fs = require("fs");
    var extensions = require("inspector").extensions;
    var deepmerge = require("deepmerge");
    var defaultConfig = require("./defaultConfigure").defaultConfig;
    var isPlainObject = require("is-plain-object").isPlainObject;
    var rechoir = require("rechoir");
    var tsConfigPath = path.resolve("./rettle.config.ts");
    var jsConfigPath = path.resolve("./rettle.config.js");
    var inputConfig = (function () {
        if (fs.existsSync(tsConfigPath)) {
            rechoir.prepare(extensions, './rettle.config.ts');
            return require(tsConfigPath);
        }
        else if (fs.existsSync(jsConfigPath)) {
            return require(jsConfigPath);
        }
        else {
            return {};
        }
    });
    var config = deepmerge(defaultConfig, inputConfig, {
        isMergeableObject: isPlainObject
    });
    return config;
};
