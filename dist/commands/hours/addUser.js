"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserHours = void 0;
const tslib_1 = require("tslib");
const decorators_1 = require("@sapphire/decorators");
const framework_1 = require("@sapphire/framework");
const plugin_editable_commands_1 = require("@sapphire/plugin-editable-commands");
const hours_backend_1 = require("../../lib/google-sheets/hours-backend");
let AddUserHours = class AddUserHours extends framework_1.Command {
    async messageRun(message, args) {
        const user = await args.pick('user');
        const hours = await args.pick('number');
        const reason = await args.rest('string');
        this.container.logger.trace(`Adding ${hours} to ${user.username} because they did ${reason}`);
        (0, hours_backend_1.addHoursToUser)(user, hours, reason, message);
        (0, plugin_editable_commands_1.send)(message, 'user hours successfully added');
    }
};
AddUserHours = (0, tslib_1.__decorate)([
    (0, decorators_1.ApplyOptions)({
        description: 'adds hours to a single user',
        aliases: ['ahu']
    })
], AddUserHours);
exports.AddUserHours = AddUserHours;
//# sourceMappingURL=addUser.js.map