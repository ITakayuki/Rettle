interface BuildScriptInterface {
    minify: boolean;
    outDir: string;
}
export declare const createCacheAppFile: () => void;
export declare const buildScript: ({ minify, outDir }: BuildScriptInterface) => Promise<unknown>;
export declare const watchScript: ({ minify, outDir }: BuildScriptInterface) => Promise<unknown>;
export {};
