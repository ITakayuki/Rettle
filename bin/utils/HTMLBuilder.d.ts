export declare const transformReact2HTMLCSS: (path: string) => Promise<{
    html: string;
    ids: Array<string>;
    css: string;
}>;
export declare const transformReact2HTMLCSSDynamic: (path: string, id: string) => Promise<{
    html: string;
    ids: Array<string>;
    css: string;
}>;
export declare const createHeaderTags: (tagName: string, contents: Record<string, string | number | boolean>[]) => string[];
export declare const createHeaders: () => string[];
interface RettleHelmetType {
    headers: string[];
    attributes: {
        body: string;
        html: string;
    };
    body: string[];
}
export declare const createHelmet: () => RettleHelmetType;
export {};
