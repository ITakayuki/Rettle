#!/usr/bin/env node
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
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const server_1 = require("./module/server");
const build_1 = require("./module/build");
const variable_1 = require("./utils/variable");
const process = __importStar(require("process"));
const program = new commander_1.Command();
program
    .option("-b, --build", "lunch build mode.", false);
program.parse();
const opts = program.opts();
if (opts.build) {
    console.log("build!!!???");
    (0, variable_1.setBuildMode)(process.env.NODE_ENV || "build");
    (0, build_1.build)();
}
else {
    (0, variable_1.setBuildMode)(process.env.NODE_ENV || "server");
    (0, server_1.server)();
}
//# sourceMappingURL=index.js.map