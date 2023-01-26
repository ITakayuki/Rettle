#!/usr/bin/env node
"use strict";
const {Command} = require("commander");

const program = new Command();

interface OptsInterface {
  develop: boolean,
  build: boolean
}

program
  .option("-d, --develop", "lunch develop mode", true)
  .option("-b, --build", "lunch build mode.", false)

program.parse();

const opts = program.opts() as OptsInterface;

if (opts.build) {
  console.log("build!!!???")
} else {
}