import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command, CommandOptions } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import type { Message } from 'discord.js';
import {getLists, displayTasks, List} from '../../tasks/trelloTasks'
import { client } from '../../index';


@ApplyOptions<CommandOptions>({
	description: 'lists tasks of a user',
	aliases: ['ls']
})
export class ListTasks extends Command {
	// , _args: Args
	public async messageRun(message: Message) {
		let lists:List[] = await getLists("6190815575f5307e9c1f3221")
		let authorId:string = message.author.id
		displayTasks(client, message.channelId, lists, (_daysDueIn:number, discordId:string) => {
		return (authorId == discordId)
		// return (discordId == "545063650088452127")
		})
	}
}
