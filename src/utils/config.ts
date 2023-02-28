import {templateHTMLInterface} from "./template.html";
import * as esBuild from "esbuild";
import * as path from "path";

interface BuildOptionsInterface {
  copyStatic?: ()=>void;
  buildScript?: () => void;
  buildCss?: () => void;
  buildHTML?: () => void;
}

interface esbuildInterface {
  minify: boolean;
  bundle?: boolean;
  tsconfig?: string;
  tsconfigRow?: string;
  loader?: Record<string, string>;
  charset?: string;
  plugins: esBuild.Plugin[]
}

export interface  RettleConfigInterface {
  pathPrefix: string;
  port: number;
  css: string;
  js: string;
  endpoints: Array<string>;
  static: string;
  outDir: string;
  staticPath: string;
  envs?: Array<Record<string, string>>;
  header?: {
    meta?: Array<Record<string, string>>;
    link?: Array<Record<string,string>>;
    script?: Array<Record<string, string>>;
  },
  template: (options: templateHTMLInterface) => string;
  encode: "UTF-8" | "Shift_JIS" | "EUC-JP";
  alias?: Record<string, string>;
  build?: BuildOptionsInterface;
  esbuild: esbuildInterface,
  version: boolean,

}

const sortStringsBySlashCount = (strings: Array<string>) => {
  const slashCountMap = new Map();

  // 各文字列の/の数をカウントする
  for (const string of strings) {
    const count = (string.match(/\//g) || []).length;
    slashCountMap.set(string, count);
  }

  // /の数でソートする
  const sorted = strings.sort((a, b) => {
    return slashCountMap.get(b) - slashCountMap.get(a);
  });

  return sorted;
}

const getConfigure = () => {
  const path = require("path");
  const fs = require("fs");
  const {extensions} = require("interpret");
  const deepmerge = require("deepmerge");
  const {defaultConfig} = require("./defaultConfigure");
  const {isPlainObject} = require("is-plain-object");
  const rechoir = require("rechoir");
  const tsConfigPath = path.resolve("./rettle-config.ts");
  const jsConfigPath = path.resolve("./rettle-config.js");
  const inputConfig  = (() => {
    if (fs.existsSync(tsConfigPath)) {
      rechoir.prepare(extensions, './rettle-config.ts');
      const requireConfig = require(tsConfigPath).default();
      return requireConfig
    } else if (fs.existsSync(jsConfigPath)) {
      return require(jsConfigPath).default();
    } else {
      return {}
    }
  });
  const config = deepmerge(defaultConfig, inputConfig(), {
    isMergeableObject: isPlainObject
  })
  config.endpoints = sortStringsBySlashCount(config.endpoints);
  return config;
}

export const getIgnores = (endpoint: string) => {
  const ignores = config.endpoints.filter((x: string, i: number , self:string[]) => {
    return self[i] !== endpoint && !endpoint.includes(self[i].replace("/**/*", ""))
  }) as string[];
  return ignores.map(item => {
    return item.includes("/**/*") ? item : path.join(item, "/**/*")
  });
}

export const config = getConfigure();