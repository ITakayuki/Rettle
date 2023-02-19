"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRef = exports.getRefs = exports.createRettle = exports.createCache = exports.defineOption = void 0;
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
//# sourceMappingURL=rettle.js.map