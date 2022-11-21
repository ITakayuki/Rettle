const fs = require("fs");
const path = require("path");
const package = require("../package.json");
const variableFilePath = path.resolve("./src/utils/variable.ts");
const version = process.argv[2];

package.version = version;

const versionFile = `export const version = "${version}";`;

fs.writeFileSync(path.resolve("./package.json"), JSON.stringify(package, null, 2), "utf-8");
fs.writeFileSync(variableFilePath, versionFile, "utf-8");
