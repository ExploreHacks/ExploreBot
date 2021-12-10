"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const framework_1 = require("@sapphire/framework");
class onMessage extends framework_1.Listener {
    constructor(context) {
        super(context);
    }
    async run(message) {
        if (this.container.leo === message.author.id && message.content.endsWith(".")) {
            const leomessage = message.content;
            const newmessage = message.content.substring(0, leomessage.length - 1);
            const channel = message.channel;
            await message.delete();
            channel.send(newmessage);
        }
    }
}
exports.default = onMessage;
//# sourceMappingURL=messageCreate.js.map