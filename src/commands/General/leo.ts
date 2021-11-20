import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command, CommandOptions } from '@sapphire/framework';
import type { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
	description: 'ping pong'
})
export class Leo extends Command {
	public async messageRun(message: Message, args: Args) {
          message = message
          const user = await args.pick("user");
          this.container.leo = user.id;
	}
}
