import {RettleConfigInterface} from "./utils/config";
import {default as emotionCreateCache, EmotionCache} from "@emotion/cache";
import ReactDom from "react-dom/server";
import createEmotionServer from "@emotion/server/create-instance";
import * as process from "process";

interface configOptionArg {
  buildMode: typeof process.env;
}

export const defineOption = (options: (mode: configOptionArg) => Partial<RettleConfigInterface>) => {
  return options;
}

export const createCache = (key: string) => emotionCreateCache({key});

export const createRettle = (cache: EmotionCache, element: JSX.Element) => {
  const {extractCritical } = createEmotionServer(cache);
  return extractCritical(ReactDom.renderToString(element));
}