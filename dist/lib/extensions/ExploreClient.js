"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const framework_1 = require("@sapphire/framework");
const path_1 = require("path");
class ExploreBot extends framework_1.SapphireClient {
    constructor() {
        super({
            baseUserDirectory: (0, path_1.join)(__dirname, "..", ".."),
            caseInsensitiveCommands: true,
            caseInsensitivePrefixes: true,
            defaultPrefix: ".",
            intents: [
                'GUILDS',
                'GUILD_MEMBERS',
                'GUILD_BANS',
                'GUILD_EMOJIS_AND_STICKERS',
                'GUILD_VOICE_STATES',
                'GUILD_MESSAGES',
                'GUILD_MESSAGE_REACTIONS',
                'DIRECT_MESSAGES',
                'DIRECT_MESSAGE_REACTIONS'
            ],
            logger: { level: 40 /* Warn */ },
        });
        Object.defineProperty(this, "fetchPrefix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => process.env.PREFIX || "cx "
        });
        // Store.defaultStrategy.onLoad = (store, piece: Piece) => container.logger.debug(`Loading ${store.name}:${piece.name}`);
        framework_1.container.client = this;
    }
    start() {
        this.login().catch(() => this.stop());
    }
    stop() {
        process.exit(1);
    }
}
exports.default = ExploreBot;
//# sourceMappingURL=ExploreClient.js.map