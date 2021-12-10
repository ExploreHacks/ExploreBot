"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// Unless explicitly defined, set NODE_ENV as development:
(_a = process.env).NODE_ENV ?? (_a.NODE_ENV = 'development');
require("reflect-metadata");
require("@sapphire/plugin-logger/register");
require("@sapphire/plugin-editable-commands/register");
const colorette = (0, tslib_1.__importStar)(require("colorette"));
const dotenv_cra_1 = require("dotenv-cra");
const path_1 = require("path");
const util_1 = require("util");
const constants_1 = require("./constants");
// Read env var
(0, dotenv_cra_1.config)({ path: (0, path_1.join)(constants_1.srcDir, '.env') });
// Set default inspection depth
util_1.inspect.defaultOptions.depth = 1;
// Enable colorette
colorette.createColors({ useColor: true });
//# sourceMappingURL=setup.js.map