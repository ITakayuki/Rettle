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
const events = [
  // Other Events
  `scroll`,
 `resize`,
  `load`,
  // Mouse Events
  `click`,
  `mouseenter`,
  `mouseleave`,
  `mouseover`,
  `mousedown`,
  `mouseup`,
  `mouseout`,
  `mousemove`,
  `dblclick`,
  // Dom Events
  `DOMFocusIn`,
  `DOMFocusOut`,
  `DOMActivate`,
  // Inputs Events
  `change`,
  `select`,
  `submit`,
  `reset`,
  `focus`,
  `blur`,
  // Keyboard Events
  `keypress`,
  `keydown`,
  `keyup`
]

const ComponentInit = (hash:string, args: Record<string, any>) => {
  for (const event of events) {
    const selector = `[data-${event}-${hash}]`;
    const targets = document.querySelectorAll(selector);
    if (targets) {
      for (const target of targets) {
        const labelName = target.getAttribute(selector);
        if (labelName === null) return console.error(`Cannot found property ${selector} of ${target}`);
        if (labelName in args) {
          target.addEventListener(event, args[labelName]);
        } else {
          console.error(`Cannot found property ${labelName}`);
        }
      }
    }
  }
}

export const createComponent = (hash: string, args: Record<string, any>) => {
  ComponentInit(hash, args);
}