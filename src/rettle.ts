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

export const getRefs = (hash: string) => {
  const targets = document.querySelectorAll(`[data-ref-${hash}]`);
  const result: Record<string, HTMLElement | Element> = {};
  for (const target of targets) {
    const tag = target.getAttribute(`data-ref-${hash}`);
    if (tag === null) return console.error(`Cannot found ref value.`, target);
    result[tag] = target;
  }
  return result;
}

export const getRef = <T>(hash:string, key: string):T => {
  const targets =  getRefs(hash)!;
  if (!targets.hasOwnProperty(key)) console.error(`Cannot found ref ${key}.`)
  return targets[key] as T
}