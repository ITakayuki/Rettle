import {RettleConfigInterface} from "./utils/config";
import {default as emotionCreateCache, EmotionCache} from "@emotion/cache";
import ReactDom from "react-dom/server";
import createEmotionServer from "@emotion/server/create-instance";
import * as React from "react";
import {SerializedStyles} from "@emotion/react";
import {IntrinsicElements} from "./elementTypes";
import {CacheProvider} from "@emotion/react";


export const defineOption = (options: () => Partial<RettleConfigInterface>) => {
  return options;
}

export const createCache = (key: string) => emotionCreateCache({key});

export const createRettle = (cache: EmotionCache, element: JSX.Element) => {
  const html = React.createElement(CacheProvider, {value: cache}, element);
  const {extractCritical } = createEmotionServer(cache);
  return extractCritical(ReactDom.renderToString(html));
}


/********************/
/* Common Methods */
/********************/

interface globalValueInterface {
  props: {[index in string]: Record<string, any>},
  scripts: {[index in string]: Record<string, any>},
  isLoaded: boolean
}

const globalValues:globalValueInterface = {
  props: {},
  scripts: {},
  isLoaded: false
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


const ComponentInit = (frame:Element, hash: string, args: Record<string, any>) => {
  return new Promise(resolve => {
    for (const event of events) {
      const selector = `data-${event}-${hash}`;
      const eventTargets = frame.querySelectorAll(`[${selector}]`);
      if (eventTargets) {
        for (const eventTarget of eventTargets) {
          const labelName = eventTarget.getAttribute(selector);
          if (!args) return console.error(`Cannot found property ${labelName}`);
          if (labelName === null) return console.error(`Cannot found property ${selector} of ${eventTarget}`);
          if (!args.hasOwnProperty(labelName)) return console.error(`Cannot found property ${labelName}`);
          if (labelName in args) {
            eventTarget.addEventListener(event, args[labelName]);
          }
        }
      }
    }
    resolve(null);
  })
}


type watcherFunctionType<T> = (arg: T) => T;

export const watcher = <T,>(value: T, callback: () => void): [{value: T}, (arg:  ((val: T) => T) | T) => void ] => {
  const temp = {
    value: value
  }
  return [temp, (setter: T | watcherFunctionType<T> ) => {
    if (typeof setter !== "function") {
      temp.value = setter;
    } else if (typeof setter === "function") {
      const call = setter as watcherFunctionType<T>
      temp.value = call(temp.value);
    }
    callback();
  }]
}

type RettleComponent =  {
  frame: "[fr]",
  children: JSX.Element | React.ReactNode,
  css?: SerializedStyles,

}
export const Component =  new Proxy({}, {
  get: (_, key: keyof IntrinsicElements) => {
    return (props: Record<string, any>) => {
      const prop = Object.keys(props).reduce((objAcc: any, key: any) => {
        // 累積オブジェクトにキーを追加して、値を代入
        if (key !== "frame" && key !== "css" && key !== "children") {
          objAcc[key] = props[key];
        }
        // 累積オブジェクトを更新
        return objAcc;
      }, {});
      return React.createElement(key, Object.assign(prop, {"data-rettle-fr": props.frame}), props.children);
    }
  }
}) as { [key in keyof IntrinsicElements]: (props: RettleComponent & IntrinsicElements[key]) => JSX.Element };



interface RettleMethods {
  getRefs: () => Record<string, HTMLElement>;
  getRef: (key: string) => HTMLElement;
  watcher: typeof watcher,
  onMounted: typeof onMounted
}
const getRefs = (frame: Element, hash: string) => {
  const targets = frame.querySelectorAll(`[data-ref-${hash}]`);
  const result: Record<string, HTMLElement> = {};
  if (frame.getAttribute(`data-ref-${hash}`)) {
    const key = frame.getAttribute(`data-ref-${hash}`);
    result[key!] = frame as HTMLElement;
  }
  for (const target of targets) {
    const tag = target.getAttribute(`data-ref-${hash}`);
    if (tag === null) console.error(`Cannot found ref value.`, target);
    result[tag!] = target as HTMLElement;
  }
  return () => result;
}

const onMounted = (cb: () => void) => {
  const mountInterval = setInterval(() => {
    if (globalValues.isLoaded === true) {
      try {
        cb();
      } catch (e) {
        console.error(e);
      }
      clearInterval(mountInterval)
    }
  }, 500);
}

export const RettleStart = async(scripts: {[index in string]: ({getRefs}: RettleMethods, props: Record<string, any>) => Record<string, any>}) => {
  const frames = [...document.querySelectorAll("[data-rettle-fr]")];
  await Promise.all(frames.map(async(frame) => {
    const hash = frame.getAttribute("data-rettle-fr")!;
    let parents = frame.parentNode! as Element;
    while (!parents.getAttribute("data-rettle-fr") && document.body !== parents) {
      parents = parents.parentNode! as Element;
    }
    const parentHash = parents.getAttribute("data-rettle-fr")!;
    if (scripts[hash]) {
      const args = scripts[hash]({
        getRefs: getRefs(frame, hash),
        getRef: (key: string) => getRefs(frame, hash)()[key],
        watcher,
        onMounted
      }, globalValues.scripts[parentHash]);
      globalValues.scripts[hash] = args;
      await ComponentInit(frame, hash, args);
    }
  }))
  globalValues.isLoaded = true;
}

export type RettleFrame = (methods: RettleMethods, props: Record<string, any>) => Record<string, any> | void