/// <reference types="react" />
import { RettleConfigInterface } from "./utils/config";
import { EmotionCache } from "@emotion/cache";
import * as process from "process";
interface configOptionArg {
    buildMode: typeof process.env;
}
export declare const defineOption: (options: (mode: configOptionArg) => Partial<RettleConfigInterface>) => (mode: configOptionArg) => Partial<RettleConfigInterface>;
export declare const createCache: (key: string) => EmotionCache;
export declare const createRettle: (cache: EmotionCache, element: JSX.Element) => import("@emotion/server/create-instance").EmotionCritical;
export {};
