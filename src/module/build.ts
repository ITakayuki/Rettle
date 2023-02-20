import path from "path";
import {config} from "../utils/config";
import glob from "glob";
import {
  buildScript,
  createCacheAppFile,
  createTsConfigFile,
  outputFormatFiles
} from "../utils/AppScriptBuilder";
import {getEntryPaths, mkdirp} from "../utils/utility";
import {transformReact2HTMLCSS, createHeaders} from "../utils/HTMLBuilder";

export const build = async() => {
  /* build app.js files */
  const buildSetupOptions = {
    outDir: path.join(config.outDir, config.pathPrefix)
  }
  const srcFiles = glob.sync("./src/**/*{ts,js,tsx,jsx,json}", {
    nodir: true
  });
  await Promise.all(srcFiles.map(file => new Promise(async(resolve, reject) => {
      try {
        await outputFormatFiles(file)
        resolve(null);
      } catch (e) {
        reject(e)
      }
    })
  ));
  try {
    await createTsConfigFile();
  } catch (e) {
    throw e
  }
  try {
    await createCacheAppFile();
  }catch (e) {
    throw e
  }
  try {
    await buildScript(buildSetupOptions);
  } catch (e) {
    throw e
  }
  // Create HTML FILES
  const entryPaths = getEntryPaths();
  let promises = [];
  Object.keys(entryPaths).forEach(key => {
    const items = entryPaths[key];
    items.forEach(item => {
      promises.push(new Promise(async (resolve, reject) => {
        const {html, css, ids} = await transformReact2HTMLCSS(item);
        const headers = createHeaders();
        const script = path.join(key.replace("src/views/", path.join(config.pathPrefix)), config.js)
        const markup = config.template({
          html,
          headers,
          script
        })
        const htmlOutputPath = path.join(config.outDir, config.pathPrefix, item.replace(path.resolve("src/views/"), ""));
        console.log("html path: ", htmlOutputPath, item)
        await mkdirp(htmlOutputPath);
      }))
    })
  })
}