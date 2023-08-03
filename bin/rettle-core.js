"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RettleStart = void 0;
const globalValues = {
    props: {},
    scripts: {},
    isLoaded: false
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
    return new Promise(resolve => {
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
        resolve(null);
    });
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
const getRefs = (frame, hash) => {
    const targets = frame.querySelectorAll(`[data-ref-${hash}]`);
    const result = {};
    if (frame.getAttribute(`data-ref-${hash}`)) {
        const key = frame.getAttribute(`data-ref-${hash}`);
        result[key] = frame;
    }
    for (const target of targets) {
        const tag = target.getAttribute(`data-ref-${hash}`);
        if (tag === null)
            console.error(`Cannot found ref value.`, target);
        result[tag] = target;
    }
    return () => result;
};
const onMounted = (cb) => {
    const mountInterval = setInterval(() => {
        if (globalValues.isLoaded === true) {
            try {
                cb();
            }
            catch (e) {
                console.error(e);
            }
            clearInterval(mountInterval);
        }
    }, 500);
};
const RettleStart = (scripts) => __awaiter(void 0, void 0, void 0, function* () {
    const frames = [...document.querySelectorAll("[data-rettle-fr]")];
    yield Promise.all(frames.map((frame) => __awaiter(void 0, void 0, void 0, function* () {
        const hash = frame.getAttribute("data-rettle-fr");
        let parents = frame.parentNode;
        while (!parents.getAttribute("data-rettle-fr") && document.body !== parents) {
            parents = parents.parentNode;
        }
        const parentHash = parents.getAttribute("data-rettle-fr");
        if (scripts[hash]) {
            const args = scripts[hash]({
                getRefs: getRefs(frame, hash),
                getRef: (key) => getRefs(frame, hash)()[key],
                watcher,
                onMounted
            }, globalValues.scripts[parentHash] || {});
            globalValues.scripts[hash] = args;
            yield ComponentInit(frame, hash, args);
        }
    })));
    globalValues.isLoaded = true;
});
exports.RettleStart = RettleStart;
//# sourceMappingURL=rettle-core.js.map