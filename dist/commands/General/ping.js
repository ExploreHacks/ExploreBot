"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCommand = void 0;
const tslib_1 = require("tslib");
const decorators_1 = require("@sapphire/decorators");
const framework_1 = require("@sapphire/framework");
const plugin_editable_commands_1 = require("@sapphire/plugin-editable-commands");
let UserCommand = class UserCommand extends framework_1.Command {
    async messageRun(message) {
        const msg = await (0, plugin_editable_commands_1.send)(message, 'Ping?');
        const content = `Pong! Bot Latency ${Math.round(this.container.client.ws.ping)}ms. API Latency ${(msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp)}ms.`;
        return (0, plugin_editable_commands_1.send)(message, content);
    }
};
UserCommand = (0, tslib_1.__decorate)([
    (0, decorators_1.ApplyOptions)({
        description: 'ping pong'
    })
], UserCommand);
exports.UserCommand = UserCommand;
//# sourceMappingURL=ping.js.map