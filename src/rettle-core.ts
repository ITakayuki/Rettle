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
        if (labelName === null) return console.error(`Cannot found property ${selector} of ${target}`);
        if (!args[labelName]) return console.error(`Cannot found property ${labelName}`);
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