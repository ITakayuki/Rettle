import path from "path";
import {config} from "../utils/config";
import glob from "glob";
import fs from "fs";
import {
  buildScript,
  createCacheAppFile,
  createTsConfigFile,
  outputFormatFiles
} from "../utils/AppScriptBuilder";
import {getEntryPaths, mkdirp} from "../utils/utility";
import {transformReact2HTMLCSS, createHeaders} from "../utils/HTMLBuilder";
import {minify} from "html-minifier-terser";
import {purgeCSS} from "css-purge";

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
  Object.keys(entryPaths).map(async(key) => {
    const items = entryPaths[key];
    let styles = ``;
    await Promise.all(items.map(async(item) => {
      const {html, css, ids} = await transformReact2HTMLCSS(item);
      const headers = createHeaders();
      const root = key.replace("src/views", config.pathPrefix);
      const script = path.join("/",root,config.js);
      headers.push(`<link rel="stylesheet" href="${path.join("/", root, config.css)}">`)
      const markup = config.template({
        html,
        headers,
        script
      })
      styles = styles + css;
      const exName = path.extname(item);
      const htmlOutputPath = path.join(config.outDir, config.pathPrefix, item.replace("src/views/", "")).replace(exName, ".html");
      await mkdirp(htmlOutputPath);
      const minifyHtml = await minify(markup, {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        preserveLineBreaks: true,
      });
      fs.writeFileSync(htmlOutputPath,minifyHtml , "utf-8");
    }));
    const root = key.replace("./src/views", "");
    const cssOutputPath = path.join(config.outDir, config.pathPrefix, root, config.css);
    purgeCSS(styles, {}, async(error, result) => {
      if (error) return console.log(`Cannot Purge style in ${key}`);
      await mkdirp(cssOutputPath);
      const style = result ? result : "";
      fs.writeFileSync(cssOutputPath, style, "utf-8");
    })
  })
}