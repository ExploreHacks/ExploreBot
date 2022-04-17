import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command, CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { send } from '@sapphire/plugin-editable-commands';


@ApplyOptions<CommandOptions>({
	description: 'lists tasks of a user',
	aliases: ['help', 'h']
})
export class Help extends Command {
	// , _args: Args
	public async messageRun(message: Message) {
		send(message, `
**.help** - shows this menu
**.ls** - lists user's tasks
**.ahu [@person] [hours] [task name]** - adds person's hours to spreadsheet
		`);
	}
}