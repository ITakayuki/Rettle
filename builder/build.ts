import * as esBuild from "esbuild";
import fs from "fs";

const init = async() => {
  await esBuild.build({
    bundle: true,
    minify: true,
    entryPoints: ["./src/**/*"],
    outdir: "bin",
    platform: "node"
  })
}

init().then()