import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command, CommandOptions } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import type { Message } from 'discord.js';
import { addHoursToRoles } from '../../lib/google-sheets/hours-backend';

@ApplyOptions<CommandOptions>({
	description: 'adds hours to a single user',
	aliases: ['ahr']
})
export class AddRolesHours extends Command {
	public async messageRun(message: Message, args: Args) {
		let role = await args.pick('role');
		let hours = await args.pick('number');
                const reason = await args.rest('string');

		this.container.logger.trace(`adding ${hours} hours to ${role} because they did ${reason}`);

		addHoursToRoles(role, hours, reason, message);
		send(message, 'role hours successfully added');
	}
}
