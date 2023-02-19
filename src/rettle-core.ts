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