#!/usr/bin/env node
"use strict";
import {Command} from "commander";
import {server} from "./module/server";
import {build} from "./module/build";

const program = new Command();

interface OptsInterface {
  build: boolean
}

program
  .option("-b, --build", "lunch build mode.", false)

program.parse();

const opts = program.opts() as OptsInterface;

if (opts.build) {
  console.log("build!!!???")
  process.env.RETTLE_BUILD_MODE = "build";
  build();
} else {
  process.env.RETTLE_BUILD_MODE = "server";
  server();
}