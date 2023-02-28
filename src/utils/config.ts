import {templateHTMLInterface} from "./template.html";
import * as esBuild from "esbuild";
import * as path from "path";
import {Express} from "express";
import * as core from "express-serve-static-core";
import * as bodyParser from "body-parser";
import * as serveStatic from "serve-static";
import * as qs from "qs";

interface RouterOptions {
  caseSensitive?: boolean | undefined;
  mergeParams?: boolean | undefined;
  strict?: boolean | undefined;
}
interface Application extends core.Application {}

interface Handler extends core.Handler {}
interface Request<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>
> extends core.Request<P, ResBody, ReqBody, ReqQuery, Locals> {}
export interface Response<ResBody = any, Locals extends Record<string, any> = Record<string, any>>
  extends core.Response<ResBody, Locals> {}
type e = {
  json: typeof bodyParser.json;
  raw: typeof bodyParser.raw;
  text: typeof bodyParser.text;
  application: Application;
  request: Request;
  response: Response;
  static: serveStatic.RequestHandlerConstructor<Response>;
  urlencoded: typeof bodyParser.urlencoded;
  query(options: qs.IParseOptions | typeof qs.parse): Handler;
  Router(options?: RouterOptions): core.Router;
}

interface BuildOptionsInterface {
  copyStatic?: ()=> void;
  buildScript?: (outDir: string) => void;
  buildCss?: (code: string, outDir: string) => string;
  buildHTML?: (code: string, outDir: string) => string;
}

interface esbuildInterface {
  minify: boolean;
  bundle?: boolean;
  tsconfig?: string;
  tsconfigRow?: string;
  loader?: Record<string, string>;
  charset?: string;
  plugins?: esBuild.Plugin[]
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
  envs?: Record<string, string>;
  header?: {
    meta?: Array<object>;
    link?: Array<object>
    script?: Array<object>;
  },
  template: (options: templateHTMLInterface) => string;
  encode: "UTF-8" | "Shift_JIS" | "EUC-JP";
  alias?: Record<string, string>;
  build?: BuildOptionsInterface;
  esbuild: esbuildInterface,
  version: boolean,
  server: (app: Express, express: e & (() => core.Express)) => void;
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