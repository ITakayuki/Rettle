import { templateHTMLInterface } from "./template.html";
import * as esBuild from "esbuild";
import * as core from "express-serve-static-core";
import * as bodyParser from "body-parser";
import * as serveStatic from "serve-static";
import * as qs from "qs";
interface RouterOptions {
    caseSensitive?: boolean | undefined;
    mergeParams?: boolean | undefined;
    strict?: boolean | undefined;
}
interface Application extends core.Application {
}
interface Express extends core.Express {
}
interface Handler extends core.Handler {
}
interface Request<P = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = core.Query, Locals extends Record<string, any> = Record<string, any>> extends core.Request<P, ResBody, ReqBody, ReqQuery, Locals> {
}
export interface Response<ResBody = any, Locals extends Record<string, any> = Record<string, any>> extends core.Response<ResBody, Locals> {
}
declare type e = {
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
};
interface BuildOptionsInterface {
    copyStatic?: () => void;
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
    plugins?: esBuild.Plugin[];
}
export interface RettleConfigInterface {
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
        meta?: Array<Record<string, string>>;
        link?: Array<Record<string, string>>;
        script?: Array<Record<string, string>>;
    };
    template: (options: templateHTMLInterface) => string;
    encode: "UTF-8" | "Shift_JIS" | "EUC-JP";
    alias?: Record<string, string>;
    build?: BuildOptionsInterface;
    esbuild: esbuildInterface;
    version: boolean;
    server: (app: Express, express: e & (() => core.Express)) => void;
}
export declare const getIgnores: (endpoint: string) => string[];
export declare const config: any;
export {};
