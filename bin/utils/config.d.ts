/// <reference types="node" />
import { templateHTMLInterface } from "./template.html";
import * as esBuild from "esbuild";
import { Express } from "express";
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
    buildScript?: (outDir: string) => void;
    buildCss?: (code: string, outDir: string) => string | Buffer;
    buildHTML?: (code: string, outDir: string) => string | Buffer;
}
interface esbuildInterface {
    plugins?: (mode: "server" | "client") => esBuild.Plugin[];
}
export interface RettleConfigInterface {
    pathPrefix: string;
    port: number;
    css: string;
    js: string;
    endpoints: Array<string>;
    static: string;
    outDir: string;
    envs?: Record<string, string>;
    header?: {
        meta?: Array<object>;
        link?: Array<object>;
        script?: Array<object>;
    };
    template: (options: templateHTMLInterface) => string;
    build?: BuildOptionsInterface;
    esbuild: esbuildInterface;
    version: boolean;
    server: (app: Express, express: e & (() => core.Express)) => void;
}
export declare const getIgnores: (endpoint: string) => string[];
export declare const config: any;
export {};
