import { RettleConfigInterface } from "./config";
export interface templateHTMLInterface extends Pick<RettleConfigInterface, "header"> {
    html: string;
    headers: Array<string>;
    script: string;
    style?: string;
}
export declare const templateHtml: (options: templateHTMLInterface) => string;
