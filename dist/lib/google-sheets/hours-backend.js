"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addHoursToUser = exports.addHoursToRoles = void 0;
const framework_1 = require("@sapphire/framework");
const plugin_editable_commands_1 = require("@sapphire/plugin-editable-commands");
async function addHoursToRoles(role, hours, reason, message) {
    role.members.forEach(async (member) => {
        framework_1.container.logger.debug('member being added: ' + member.user.username);
        return await addHoursToUser(member.user, hours, reason, message);
    });
}
exports.addHoursToRoles = addHoursToRoles;
async function addHoursToUser(user, hours, reason, message) {
    let resource = { values: [[user.username, hours, new Date().toLocaleString(), reason]] };
    await framework_1.container.sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SPREAD_SHEET_ID,
        range: user.username + '!A:D',
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        // @ts-ignore: asdf
        resource
    }, async (err) => {
        if (err) {
            (0, plugin_editable_commands_1.send)(message, 'Failed to add: ' + user.username + "Because of " + err.name);
            let sheets = await framework_1.container.sheets.spreadsheets.get({
                auth: framework_1.container.auth,
                spreadsheetId: process.env.SPREAD_SHEET_ID
            });
            let data = sheets.data.sheets.map((it) => it.properties.title ?? '');
            framework_1.container.logger.debug(data);
            if (data.indexOf(user.username) == -1) {
                try {
                    const request = {
                        spreadsheetId: process.env.SPREAD_SHEET_ID,
                        // @ts-ignore: asdf
                        resource: {
                            requests: [
                                {
                                    addSheet: {
                                        properties: {
                                            title: user.username
                                        }
                                    }
                                }
                            ]
                        },
                        auth: framework_1.container.auth
                    };
                    await framework_1.container.sheets.spreadsheets.batchUpdate(request);
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
        else {
            (0, plugin_editable_commands_1.send)(message, 'Successfully added: ' + user.username);
        }
    });
}
exports.addHoursToUser = addHoursToUser;
//# sourceMappingURL=hours-backend.js.map