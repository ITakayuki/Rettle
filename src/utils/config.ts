const getConfigure = () => {
  const path = require("path");
  const fs = require("fs");
  const {extensions} = require("interpret");
  const deepmerge = require("deepmerge");
  const {defaultConfig} = require("./defaultConfigure");
  const {isPlainObject} = require("is-plain-object");
  const rechoir = require("rechoir");
  const tsConfigPath = path.resolve("./rettle-config.ts");
  const jsConfigPath = path.resolve("./rettle-config.js");
  console.log("PATH: ", tsConfigPath)
  const inputConfig  = (() => {
    if (fs.existsSync(tsConfigPath)) {
      rechoir.prepare(extensions, './rettle-config.ts');
      const requireConfig = require(tsConfigPath);
      console.log("CONFIG: ", requireConfig)
      return requireConfig
    } else if (fs.existsSync(jsConfigPath)) {
      return require(jsConfigPath)
    } else {
      return {}
    }
  });
  const config = deepmerge(defaultConfig, inputConfig(), {
    isMergeableObject: isPlainObject
  })
  return config;
}

export const config = getConfigure();