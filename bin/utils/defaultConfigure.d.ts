export interface RettleConfigInterface {
    pathPrefix: string;
    port: number;
    assetsPath: {
        css: string;
        js: string;
        images: string;
    };
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
}
//# sourceMappingURL=defaultConfigure.d.ts.map