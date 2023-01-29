"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.color = void 0;
var target = {
    blue: "\x1b[34m",
    normal: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m"
};
exports.color = new Proxy(target, {
    get: function (target, prop) {
        return function (log) {
            console.log("".concat(prop).concat(log, "\u001B[0m"));
        };
    }
});
