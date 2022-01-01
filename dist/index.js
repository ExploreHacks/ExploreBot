"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
require("./lib/setup");
const trelloTasks_1 = require("./tasks/trelloTasks");
const framework_1 = require("@sapphire/framework");
//TODO: extend me later
exports.client = new framework_1.SapphireClient({
    defaultPrefix: '.',
    caseInsensitiveCommands: true,
    logger: {
        level: 10 /* Trace */
    },
    shards: 'auto',
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
    ]
});
const main = async () => {
    try {
        exports.client.logger.info('Logging in');
        await exports.client.login();
        exports.client.logger.info('logged in');
        sendReminder(16, 0, 0);
    }
    catch (error) {
        exports.client.logger.fatal(error);
        exports.client.destroy();
        process.exit(1);
    }
};
main();
/**
 * sends reminders at a certain time everyday in a specific channel
 * @param hour
 * @param minute
 * @param second
 */
async function sendReminder(hour, minute, second) {
    while (true) {
        const now = new Date();
        const then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, second, 0);
        let millisTill = then - now;
        if (millisTill < 0) {
            millisTill += 1000 * 60 * 60 * 24; // it's after x am/pm, try x am/pm tomorrow.
        }
        exports.client.logger.info("set timer for " + millisTill + "ms");
        await new Promise(resolve => setTimeout(resolve, millisTill));
        let lists = await (0, trelloTasks_1.getLists)("6190815575f5307e9c1f3221");
        (0, trelloTasks_1.displayTasks)(exports.client, "914272295047028776", lists, (daysDueIn, _discordId) => {
            return (daysDueIn != null && daysDueIn < 2);
            // return (discordId == "545063650088452127")
        });
    }
}
//# sourceMappingURL=index.js.map