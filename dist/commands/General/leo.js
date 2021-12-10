"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leo = void 0;
const tslib_1 = require("tslib");
const decorators_1 = require("@sapphire/decorators");
const framework_1 = require("@sapphire/framework");
let Leo = class Leo extends framework_1.Command {
    async messageRun(message, args) {
        message = message;
        const user = await args.pick("user");
        this.container.leo = user.id;
    }
};
Leo = (0, tslib_1.__decorate)([
    (0, decorators_1.ApplyOptions)({
        description: 'ping pong'
    })
], Leo);
exports.Leo = Leo;
//# sourceMappingURL=leo.js.map