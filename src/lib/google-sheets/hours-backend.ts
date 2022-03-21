import { container } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import type { Message, Role, User } from 'discord.js';

export async function addHoursToRoles(role: Role, hours: number, reason: string, message: Message) {
	role.members.forEach(async (member) => {
		container.logger.debug('member being added: ' + member.user.username);
		return await addHoursToUser(member.user, hours, reason, message,);
	});
}

export async function addHoursToUser(user: User, hours: number, reason: string, message: Message ) {
	let resource = { values: [[user.username, hours, new Date().toLocaleString(), reason]] };
	await container.sheets.spreadsheets.values.append(
		{
			spreadsheetId: process.env.SPREAD_SHEET_ID,
			range: user.username + '!A:D',
			valueInputOption: 'USER_ENTERED',
			insertDataOption: 'INSERT_ROWS',
                        // @ts-ignore: asdf
			resource
		},
		async (err: Error) => {
			if (err) {
				send(message, 'Failed to add: ' + user.username + "Because of " + err.name);

				let sheets = await container.sheets.spreadsheets.get({
					auth: container.auth,
					spreadsheetId: process.env.SPREAD_SHEET_ID!
				});
				let data = sheets.data.sheets!.map((it) => it.properties!.title ?? '');
				container.logger.debug(data);

				if (data!.indexOf(user.username) == -1) {
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
							auth: container.auth
						};

						await container.sheets.spreadsheets.batchUpdate(request);
					} catch (error) {
						console.log(error);
					}
				}
			} else {
				send(message, 'Successfully added: ' + user.username);
			}
		}
	);
}
