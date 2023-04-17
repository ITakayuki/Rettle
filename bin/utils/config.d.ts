/// <reference types="node" />
import { templateHTMLInterface } from "./template.html";
import * as esBuild from "esbuild";
import js_beautify from "js-beautify";
interface BuildOptionsInterface {
    copyStatic?: () => void;
    buildScript?: (outDir: string) => void;
    buildCss?: (code: string, outDir: string) => string | Buffer;
    buildHTML?: (code: string, outDir: string) => string | Buffer;
}
interface esbuildInterface {
    plugins?: (mode: "server" | "client") => esBuild.Plugin[];
}
interface BeautifyOptions {
    css?: js_beautify.CSSBeautifyOptions | boolean;
    html?: js_beautify.HTMLBeautifyOptions | boolean;
    script?: js_beautify.JSBeautifyOptions | boolean;
}
export interface RettleConfigInterface {
    pathPrefix: string;
    css: string;
    js: string;
    beautify: BeautifyOptions;
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
    server: {
        port: number;
        host: string;
    };
}
export declare const getIgnores: (endpoint: string) => string[];
export declare const config: any;
export {};
