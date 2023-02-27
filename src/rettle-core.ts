import * as React from "react";
import {htmlTagNames} from "html-tag-names";
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
    const selector = `data-${event}-${hash}`;
    const targets = document.querySelectorAll(`[${selector}]`);
    if (targets) {
      for (const target of targets) {
        const labelName = target.getAttribute(selector);
        if (!args) return console.error(`Cannot found property ${labelName}`);
        if (labelName === null) return console.error(`Cannot found property ${selector} of ${target}`);
        if (!args.hasOwnProperty(labelName)) return console.error(`Cannot found property ${labelName}`);
        if (labelName in args) {
          target.addEventListener(event, args[labelName]);
        }
      }
    }
  }
}

export const createComponent = (hash: string, args: Record<string, any>) => {
  ComponentInit(hash, args);
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
  children: JSX.Element | React.ReactNode;
}

type UnionStringArray <T extends Readonly<string[]>> = T[number];
type HTMLElements = UnionStringArray<typeof htmlTagNames>;
export const Component =  new Proxy({}, {
    get: (_, key: HTMLElements): React.FC<RettleComponent> => {
      return (props) => React.createElement(key, {"rettle-component": "[rettle-component-location]"}, props.children);
    }
}) as {[key in HTMLElements]: (props: RettleComponent) => JSX.Element | React.ReactNode};