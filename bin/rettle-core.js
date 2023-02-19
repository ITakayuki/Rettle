"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRef = exports.getRefs = exports.createComponent = void 0;
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
];
const ComponentInit = (hash, args) => {
    for (const event of events) {
        const selector = `data-${event}-${hash}`;
        const targets = document.querySelectorAll(`[${selector}]`);
        if (targets) {
            for (const target of targets) {
                const labelName = target.getAttribute(selector);
                if (!args)
                    return console.error(`Cannot found property ${labelName}`);
                if (labelName === null)
                    return console.error(`Cannot found property ${selector} of ${target}`);
                if (!args.hasOwnProperty(labelName))
                    return console.error(`Cannot found property ${labelName}`);
                if (labelName in args) {
                    target.addEventListener(event, args[labelName]);
                }
            }
        }
    }
};
const createComponent = (hash, args) => {
    ComponentInit(hash, args);
};
exports.createComponent = createComponent;
const getRefs = (hash) => {
    const targets = document.querySelectorAll(`[data-ref-${hash}]`);
    const result = {};
    for (const target of targets) {
        const tag = target.getAttribute(`data-ref-${hash}`);
        if (tag === null)
            return console.error(`Cannot found ref value.`, target);
        result[tag] = target;
    }
    return result;
};
exports.getRefs = getRefs;
const getRef = (hash, key) => {
    const targets = (0, exports.getRefs)(hash);
    if (!targets.hasOwnProperty(key))
        console.error(`Cannot found ref ${key}.`);
    return targets[key];
};
exports.getRef = getRef;
//# sourceMappingURL=rettle-core.js.map