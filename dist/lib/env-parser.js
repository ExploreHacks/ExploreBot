"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envParseArray = void 0;
const utilities_1 = require("@sapphire/utilities");
function envParseArray(key, defaultValue) {
    const value = process.env[key];
    if ((0, utilities_1.isNullishOrEmpty)(value)) {
        if (defaultValue === undefined)
            throw new Error(`[ENV] ${key} - The key must be an array, but is empty or undefined.`);
        return defaultValue;
    }
    return value.split(' ');
}
exports.envParseArray = envParseArray;
//# sourceMappingURL=env-parser.js.map