import * as esBuild from "esbuild";
import fs from "fs";
import glob from "glob"

const init = async() => {
  await esBuild.build({
    watch: {
      onRebuild: (err, res) => {
        if (err) return console.log(err);
        console.log(res!.outputFiles)
      }
    },
    loader: { ".node": "file" },
    minify: true,
    entryPoints: glob.sync("./src/**/*", {
      nodir: true
    }),
    outdir: "bin",
    platform: "node"
  })
  console.log("Watch Started ....")
}

init().then()