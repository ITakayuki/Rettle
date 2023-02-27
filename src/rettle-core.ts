import * as React from "react";
import {SerializedStyles} from "@emotion/react";
type htmlTagTypes = 'a' | 'abbr' | 'acronym' | 'address' | 'applet' | 'area' | 'article' | 'aside' | 'audio' | 'b' | 'base' | 'basefont' | 'bdi' | 'bdo' | 'bgsound'| 'big'| 'blink'| 'blockquote'| 'body'| 'br'| 'button'| 'canvas'| 'caption'| 'center'| 'cite'| 'code'| 'col'| 'colgroup'| 'command'| 'content'| 'data'| 'datalist'| 'dd'| 'del'| 'details'| 'dfn'| 'dialog'| 'dir'| 'div'| 'dl'| 'dt'| 'element'| 'em'| 'embed'| 'fieldset'| 'figcaption'| 'figure'| 'font'| 'footer'| 'form'| 'frame'| 'frameset'| 'h1'| 'h2'| 'h3'| 'h4'| 'h5'| 'h6'| 'head'| 'header'| 'hgroup'| 'hr'| 'html'| 'i'| 'iframe'| 'image'| 'img'| 'input'| 'ins'| 'isindex'| 'kbd'| 'keygen'| 'label'| 'legend'| 'li'| 'link'| 'listing'| 'main'| 'map'| 'mark'| 'marquee'| 'math'| 'menu'| 'menuitem'| 'meta'| 'meter'| 'multicol'| 'nav'| 'nextid'| 'nobr'| 'noembed'| 'noframes'| 'noscript'| 'object'| 'ol'| 'optgroup'| 'option'| 'output'| 'p'| 'param'| 'picture'| 'plaintext'| 'pre'| 'progress'| 'q'| 'rb'| 'rbc'| 'rp'| 'rt'| 'rtc'| 'ruby'| 's'| 'samp'| 'script'| 'section'| 'select'| 'shadow'| 'slot'| 'small'| 'source'| 'spacer'| 'span'| 'strike'| 'strong'| 'style'| 'sub'| 'summary'| 'sup'| 'svg'| 'table'| 'tbody'| 'td'| 'template'| 'textarea'| 'tfoot'| 'th'| 'thead'| 'time'| 'title'| 'tr'| 'track'| 'tt'| 'u'| 'ul'| 'var'| 'video'| 'wbr'| 'xmp' | string
const djb2Hash = (str:string) => {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
  }
  return hash;
}
export const createHash = (str:string) => {
  const hash = djb2Hash(str);
  const fullStr = ('0000000' + (hash & 0xFFFFFF).toString(16));
  return fullStr.substring(fullStr.length - 8, fullStr.length)
}

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

interface RettleComponent {
  frame: "[fr]";
  children: JSX.Element | React.ReactNode;
  css?: SerializedStyles;
  className?: string;
  href?: string;
  alt?: string;
}
export const Component =  new Proxy({}, {
    get: (_, key: htmlTagTypes) => {
      return (props: RettleComponent) => {
        const prop = {
          css: props.css,
          className: props.className,
          href: props.href,
          alt: props.alt
        }
        return React.createElement(key, Object.assign(prop, {"data-rettle-fr": props.frame}), props.children);
      }
    }
}) as { [key in htmlTagTypes]: (props: RettleComponent) => React.ReactElement };

type getRefsMethodType = {
  (key: string): Element;
  (): Record<string, Element>;
}
interface RettleMethods {
  getRefs: () => Record<string, HTMLElement>;
  getRef: (key: string) => HTMLElement;
  watcher: typeof watcher,
  onMounted: typeof onMounted
}
const getRefs = (frame: Element, hash: string) => {
  const targets = frame.querySelectorAll(`[data-ref-${hash}]`);
  const result: Record<string, HTMLElement> = {};
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
      cb();
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
      const args = scripts[hash]({
        getRefs: getRefs(frame, hash),
        getRef: (key: string) => getRefs(frame, hash)()[key],
        watcher,
        onMounted
      }, globalValues.scripts[parentHash]);
      globalValues.scripts[hash] = args;
      await ComponentInit(frame, hash, args);
      console.log("hoge")
    }))
  globalValues.isLoaded = true;
}
