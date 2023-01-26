#!/usr/bin/env node
"use strict";
const { Command } = require("commander");
const { getFiles } = require("./develop");
const program = new Command();
program
    .option("-d, --develop", "lunch develop mode", true)
    .option("-H, --HOST <value>", "overwrite host  name.", "localhost")
    .option("-P, --PORT <value>", "overwrite port number.", "3000")
    .option("-b, --build", "lunch build mode.", false);
program.parse();
const opts = program.opts();
if (opts.build) {
    console.log("build!!!???");
}
else {
    getFiles();
}
