/// <reference types="react" />
import { RettleConfigInterface } from "./utils/config";
import { EmotionCache } from "@emotion/cache";
interface configOptionArg {
    buildMode: string;
}
export declare const defineOption: (options: (mode: configOptionArg) => Partial<RettleConfigInterface>) => Partial<RettleConfigInterface>;
export declare const createCache: (key: string) => EmotionCache;
export declare const createRettle: (cache: EmotionCache, element: JSX.Element) => import("@emotion/server/create-instance").EmotionCritical;
export {};
