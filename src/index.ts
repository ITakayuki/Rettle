#!/usr/bin/env node
"use strict";
import {Command} from "commander";
import {server} from "./module/server";
import {build} from "./module/build";
import {setBuildMode} from "./utils/variable";
import * as process from "process";

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
  setBuildMode(process.env.NODE_ENV || "build");
  build();
} else {
  setBuildMode(process.env.NODE_ENV || "server");
  server();
}