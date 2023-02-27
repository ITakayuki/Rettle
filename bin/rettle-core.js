"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProps = exports.RettleStart = exports.Component = exports.watcher = exports.createHash = void 0;
const React = __importStar(require("react"));
const djb2Hash = (str) => {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i);
    }
    return hash;
};
const createHash = (str) => {
    const hash = djb2Hash(str);
    const fullStr = ('0000000' + (hash & 0xFFFFFF).toString(16));
    return fullStr.substring(fullStr.length - 8, fullStr.length);
};
exports.createHash = createHash;
const globalValues = {
    props: {},
    scripts: {}
};
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
const ComponentInit = (frame, hash, args) => {
    for (const event of events) {
        const selector = `data-${event}-${hash}`;
        const eventTargets = frame.querySelectorAll(`[${selector}]`);
        if (eventTargets) {
            for (const eventTarget of eventTargets) {
                const labelName = eventTarget.getAttribute(selector);
                if (!args)
                    return console.error(`Cannot found property ${labelName}`);
                if (labelName === null)
                    return console.error(`Cannot found property ${selector} of ${eventTarget}`);
                if (!args.hasOwnProperty(labelName))
                    return console.error(`Cannot found property ${labelName}`);
                if (labelName in args) {
                    eventTarget.addEventListener(event, args[labelName]);
                }
            }
        }
    }
};
const watcher = (value, callback) => {
    const temp = {
        value: value
    };
    return [temp, (setter) => {
            if (typeof setter !== "function") {
                temp.value = setter;
            }
            else if (typeof setter === "function") {
                const call = setter;
                temp.value = call(temp.value);
            }
            callback();
        }];
};
exports.watcher = watcher;
exports.Component = new Proxy({}, {
    get: (_, key) => {
        return (props) => {
            const prop = {
                css: props.css,
                className: props.className,
                href: props.href,
                alt: props.alt
            };
            return React.createElement(key, Object.assign(prop, { "data-rettle-fr": props.frame }), props.children);
        };
    }
});
const getRefs = (frame, hash) => {
    const targets = frame.querySelectorAll(`[data-ref-${hash}]`);
    const result = {};
    for (const target of targets) {
        const tag = target.getAttribute(`data-ref-${hash}`);
        if (tag === null)
            console.error(`Cannot found ref value.`, target);
        result[tag] = target;
    }
    return () => result;
};
const RettleStart = (scripts) => {
    const frames = document.querySelectorAll("[data-rettle-fr]");
    for (const frame of frames) {
        const hash = frame.getAttribute("data-rettle-fr");
        const args = scripts[hash]({
            getRefs: getRefs(frame, hash),
            getRef: (key) => getRefs(frame, hash)()[key],
            watcher: exports.watcher,
            getProps: exports.getProps
        }, globalValues.scripts);
        globalValues.scripts[hash] = args;
        ComponentInit(frame, hash, args);
    }
};
exports.RettleStart = RettleStart;
const getProps = (hash) => {
    return globalValues.props[hash];
};
exports.getProps = getProps;
//# sourceMappingURL=rettle-core.js.map