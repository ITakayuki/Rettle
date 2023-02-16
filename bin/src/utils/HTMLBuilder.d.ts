export declare const transformReact2HTMLCSS: (path: string) => Promise<{
    html: string;
    ids: Array<string>;
    css: string;
}>;
export declare const createHeaderTags: (tagName: string, contents: Array<Record<string, string>>) => string[];
