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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRettle = exports.createCache = exports.defineOption = void 0;
const cache_1 = __importDefault(require("@emotion/cache"));
const server_1 = __importDefault(require("react-dom/server"));
const create_instance_1 = __importDefault(require("@emotion/server/create-instance"));
const process = __importStar(require("process"));
const defineOption = (options) => {
    return options({ buildMode: process.env.RETTLE_BUILD_MODE });
};
exports.defineOption = defineOption;
const createCache = (key) => (0, cache_1.default)({ key });
exports.createCache = createCache;
const createRettle = (cache, element) => {
    const { extractCritical } = (0, create_instance_1.default)(cache);
    return extractCritical(server_1.default.renderToString(element));
};
exports.createRettle = createRettle;
//# sourceMappingURL=rettle.js.map