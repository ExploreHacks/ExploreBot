"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTasks = void 0;
const tslib_1 = require("tslib");
const decorators_1 = require("@sapphire/decorators");
const framework_1 = require("@sapphire/framework");
require("@sapphire/plugin-editable-commands");
const trelloTasks_1 = require("../../tasks/trelloTasks");
const index_1 = require("../../index");
let ListTasks = class ListTasks extends framework_1.Command {
    // , _args: Args
    async messageRun(message) {
        let lists = await (0, trelloTasks_1.getLists)("6190815575f5307e9c1f3221");
        let authorId = message.author.id;
        (0, trelloTasks_1.displayTasks)(index_1.client, message.channelId, lists, (_daysDueIn, discordId) => {
            return (authorId == discordId);
            // return (discordId == "545063650088452127")
        });
    }
};
ListTasks = (0, tslib_1.__decorate)([
    (0, decorators_1.ApplyOptions)({
        description: 'lists tasks of a user',
        aliases: ['ls']
    })
], ListTasks);
exports.ListTasks = ListTasks;
//# sourceMappingURL=listTasks.js.map