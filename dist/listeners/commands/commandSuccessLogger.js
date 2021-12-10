"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEvent = void 0;
const framework_1 = require("@sapphire/framework");
const colorette_1 = require("colorette");
class UserEvent extends framework_1.Listener {
    constructor(context, options) {
        super(context, {
            ...options,
            event: framework_1.Events.CommandSuccess
        });
    }
    run({ message, command }) {
        const shard = this.shard(message.guild?.shardId ?? 0);
        const commandName = this.command(command);
        const author = this.author(message.author);
        const sentAt = message.guild ? this.guild(message.guild) : this.direct();
        this.container.logger.debug(`${shard} - ${commandName} ${author} ${sentAt}`);
    }
    onLoad() {
        this.enabled = this.container.logger.level <= 20 /* Debug */;
        return super.onLoad();
    }
    shard(id) {
        return `[${(0, colorette_1.cyan)(id.toString())}]`;
    }
    command(command) {
        return (0, colorette_1.cyan)(command.name);
    }
    author(author) {
        return `${author.username}[${(0, colorette_1.cyan)(author.id)}]`;
    }
    direct() {
        return (0, colorette_1.cyan)('Direct Messages');
    }
    guild(guild) {
        return `${guild.name}[${(0, colorette_1.cyan)(guild.id)}]`;
    }
}
exports.UserEvent = UserEvent;
//# sourceMappingURL=commandSuccessLogger.js.map