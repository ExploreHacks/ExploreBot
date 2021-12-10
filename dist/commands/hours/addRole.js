"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRolesHours = void 0;
const tslib_1 = require("tslib");
const decorators_1 = require("@sapphire/decorators");
const framework_1 = require("@sapphire/framework");
const plugin_editable_commands_1 = require("@sapphire/plugin-editable-commands");
const hours_backend_1 = require("../../lib/google-sheets/hours-backend");
let AddRolesHours = class AddRolesHours extends framework_1.Command {
    async messageRun(message, args) {
        let role = await args.pick('role');
        let hours = await args.pick('number');
        const reason = await args.rest('string');
        this.container.logger.trace(`adding ${hours} hours to ${role} because they did ${reason}`);
        (0, hours_backend_1.addHoursToRoles)(role, hours, reason, message);
        (0, plugin_editable_commands_1.send)(message, 'role hours successfully added');
    }
};
AddRolesHours = (0, tslib_1.__decorate)([
    (0, decorators_1.ApplyOptions)({
        description: 'adds hours to a single user',
        aliases: ['ahr']
    })
], AddRolesHours);
exports.AddRolesHours = AddRolesHours;
//# sourceMappingURL=addRole.js.map