#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const server_1 = require("./module/server");
const program = new commander_1.Command();
program
    .option("-b, --build", "lunch build mode.", false);
program.parse();
const opts = program.opts();
if (opts.build) {
    console.log("build!!!???");
    process.env.RETTLE_BUILD_MODE = "build";
}
else {
    process.env.RETTLE_BUILD_MODE = "server";
    (0, server_1.server)();
}
//# sourceMappingURL=index.js.map