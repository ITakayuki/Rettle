interface BuildOptionsInterface {
    copyStatic?: () => void;
    buildScript?: () => void;
    buildCss?: () => void;
    buildHTML?: () => void;
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
    envs?: Array<Record<string, string>>;
    header?: {
        meta: Array<Record<string, string>>;
        link: Array<Record<string, string>>;
        script: Array<Record<string, string>>;
    };
    encode: "UTF-8" | "Shift_JIS" | "EUC-JP";
    alias?: Record<string, string>;
    build?: BuildOptionsInterface;
    esbuild: {
        minify: boolean;
    };
}
export declare const config: any;
export {};
