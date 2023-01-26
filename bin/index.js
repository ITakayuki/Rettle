#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var server_1 = require("./module/server");
var program = new commander_1.Command();
program
    .option("-d, --develop", "lunch develop mode", true)
    .option("-b, --build", "lunch build mode.", false);
program.parse();
var opts = program.opts();
if (opts.build) {
    console.log("build!!!???");
}
else {
    (0, server_1.server)();
}
