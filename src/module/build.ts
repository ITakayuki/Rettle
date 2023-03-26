import path from "path";
import { config } from "../utils/config";
import glob from "glob";
import fs from "fs";
import {
  buildScript,
  createCacheAppFile,
  createTsConfigFile,
  outputFormatFiles,
} from "../utils/AppScriptBuilder";
import { getEntryPaths, mkdirp } from "../utils/utility";
import {
  transformReact2HTMLCSS,
  createHeaders,
  createHelmet,
} from "../utils/HTMLBuilder";
import { minify } from "html-minifier-terser";
import { purgeCSS } from "css-purge";
import { deleteDir, copyStatic } from "../utils/directoryControl";
import js_beautify from "js-beautify";

const resetDir = (dirRoot: string) => {
  return new Promise((resolve) => {
    if (fs.existsSync(dirRoot)) {
      deleteDir(dirRoot);
    }
    resolve(null);
  });
};

export const build = async () => {
  await Promise.all([
    resetDir(config.outDir),
    resetDir(".cache/src"),
    resetDir(".cache/scripts"),
    resetDir(".cache/temporary"),
  ]);
  /* build app.js files */
  const buildSetupOptions = {
    outDir: path.join(config.outDir, config.pathPrefix),
  };
  const srcFiles = glob.sync("./src/**/*{ts,js,tsx,jsx,json}", {
    nodir: true,
  });
  await Promise.all(
    srcFiles.map(
      (file) =>
        new Promise(async (resolve, reject) => {
          try {
            await outputFormatFiles(file);
            resolve(null);
          } catch (e) {
            reject(e);
          }
        })
    )
  );
  try {
    await createTsConfigFile();
  } catch (e) {
    throw e;
  }
  try {
    await createCacheAppFile();
  } catch (e) {
    throw e;
  }
  try {
    await buildScript(buildSetupOptions);
  } catch (e) {
    throw e;
  }

  if (config.beautify.script) {
    const files = glob.sync(path.join(buildSetupOptions.outDir, "/**/*"), {
      nodir: true,
    });
    for (const file of files) {
      const code = fs.readFileSync(file, "utf-8");
      const beauty = js_beautify.js(
        code,
        typeof config.beautify.script === "boolean"
          ? {}
          : config.beautify.script
      );
      fs.writeFileSync(file, beauty);
    }
  }

  const jsFiles = glob.sync(
    path.join(config.outDir, config.pathPrefix, "/**/*.js"),
    {
      nodir: true,
    }
  );

  for (const js of jsFiles) {
    config.build?.buildScript(js);
  }

  // Create HTML FILES
  const entryPaths = getEntryPaths();
  Object.keys(entryPaths).map(async (key) => {
    const items = entryPaths[key];
    let styles = ``;
    await Promise.all(
      items.map(async (item) => {
        const { html, css, ids } = await transformReact2HTMLCSS(item);
        const helmet = createHelmet();
        const headers = createHeaders().concat(helmet.headers);
        const root = key.replace("src/views", config.pathPrefix);
        const script = path.join("/", root, config.js);
        headers.push(
          `<link rel="stylesheet" href="${path.join("/", root, config.css)}">`
        );
        const markup = config.template({
          html,
          headers,
          script,
          helmet: helmet.attributes,
          noScript: helmet.body,
        });
        styles = styles + css;
        const exName = path.extname(item);
        const htmlOutputPath = path
          .join(
            config.outDir,
            config.pathPrefix,
            item.replace("src/views/", "")
          )
          .replace(exName, ".html");
        await mkdirp(htmlOutputPath);
        const minifyHtml = await minify(markup, {
          collapseInlineTagWhitespace: true,
          collapseWhitespace: true,
          preserveLineBreaks: true,
        });
        const code = config.build?.buildHTML(minifyHtml, htmlOutputPath);
        fs.writeFileSync(htmlOutputPath, code, "utf-8");
      })
    );
    const root = key.replace("./src/views", "");
    const cssOutputPath = path.join(
      config.outDir,
      config.pathPrefix,
      root,
      config.css
    );
    purgeCSS(styles, {}, async (error, result) => {
      if (error) return console.log(`Cannot Purge style in ${key}`);
      await mkdirp(cssOutputPath);
      let style = result ? result : "";
      style = config.beautify.css
        ? typeof config.beautify.css === "boolean"
          ? js_beautify.css(style, {})
          : js_beautify.css(style, config.beautify.css)
        : style;
      const purge = config.build?.buildCss(style, cssOutputPath);
      fs.writeFileSync(cssOutputPath, purge, "utf-8");
    });
  });
  await copyStatic();
  config.build?.copyStatic();
};
