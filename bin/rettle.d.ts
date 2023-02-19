/// <reference types="react" />
import { RettleConfigInterface } from "./utils/config";
import { EmotionCache } from "@emotion/cache";
export declare const defineOption: (option: Partial<RettleConfigInterface>) => Partial<RettleConfigInterface>;
export declare const createCache: (key: string) => EmotionCache;
export declare const createRettle: (cache: EmotionCache, element: JSX.Element) => import("@emotion/server/create-instance").EmotionCritical;
