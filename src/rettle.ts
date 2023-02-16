import {RettleConfigInterface} from "./utils/config";
import {default as emotionCreateCache, EmotionCache} from "@emotion/cache";
import ReactDom from "react-dom/server";
import createEmotionServer from "@emotion/server/create-instance";

export const defineOption = (option: Partial<RettleConfigInterface>) => {
  return option;
}

export const createCache = (key: string) => emotionCreateCache({key});

export const createRettle = (cache: EmotionCache, element: JSX.Element) => {
  const {extractCritical } = createEmotionServer(cache);
  return extractCritical(ReactDom.renderToString(element));
}