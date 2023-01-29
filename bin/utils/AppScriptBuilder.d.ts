interface BuildScriptInterface {
    minify: boolean;
    outDir: string;
}
export declare const createTsConfigFile: () => Promise<unknown>;
export declare const createCacheAppFile: () => Promise<unknown>;
export declare const buildScript: ({ minify, outDir }: BuildScriptInterface) => Promise<unknown>;
export declare const watchScript: ({ minify, outDir }: BuildScriptInterface) => Promise<unknown>;
export {};
