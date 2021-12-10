"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEvent = void 0;
const framework_1 = require("@sapphire/framework");
class UserEvent extends framework_1.Listener {
    async run(message) {
        const prefix = this.container.client.options.defaultPrefix;
        return message.channel.send(prefix ? `My prefix in this guild is: \`${prefix}\`` : 'You do not need a prefix in DMs.');
    }
}
exports.UserEvent = UserEvent;
//# sourceMappingURL=mentionPrefixOnly.js.map