"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComponent = exports.createRettle = exports.createCache = exports.defineOption = void 0;
const cache_1 = __importDefault(require("@emotion/cache"));
const server_1 = __importDefault(require("react-dom/server"));
const create_instance_1 = __importDefault(require("@emotion/server/create-instance"));
const defineOption = (option) => {
    return option;
};
exports.defineOption = defineOption;
const createCache = (key) => (0, cache_1.default)({ key });
exports.createCache = createCache;
const createRettle = (cache, element) => {
    const { extractCritical } = (0, create_instance_1.default)(cache);
    return extractCritical(server_1.default.renderToString(element));
};
exports.createRettle = createRettle;
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
        const selector = `[data-${event}-${hash}]`;
        const targets = document.querySelectorAll(selector);
        if (targets) {
            for (const target of targets) {
                const labelName = target.getAttribute(selector);
                if (labelName === null)
                    throw new Error(`Cannot found property ${selector} of ${target}`);
                if (labelName in args) {
                    target.addEventListener(event, args[labelName]);
                }
                else {
                    throw new Error(`Cannot found property ${labelName}`);
                }
            }
        }
    }
};
const createComponent = (hash, args) => {
    try {
        ComponentInit(hash, args);
    }
    catch (e) {
        console.error(e);
    }
};
exports.createComponent = createComponent;
//# sourceMappingURL=rettle.js.map