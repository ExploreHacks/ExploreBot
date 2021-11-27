import './lib/setup';
import { LogLevel, SapphireClient } from '@sapphire/framework';
import {getLists, displayTasks, List} from './tasks/trelloTasks'

// import { resolve } from 'path/posix';
//TODO: extend me later
const client = new SapphireClient({
	defaultPrefix: '.',
	caseInsensitiveCommands: true,
	logger: {
		level: LogLevel.Debug
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
		client.logger.info('Logging in');
		await client.login();
		client.logger.info('logged in');
    let lists:List[] = await getLists("6190815575f5307e9c1f3221")
    // displayTasks(client, "695852556718440538", lists, (_daysDueIn:number, discordId:string) => {
    //   return (discordId == "545063650088452127")
    // })
    displayTasks(client, "695852556718440538", lists, (daysDueIn:number, _discordId:string) => {
      return (daysDueIn != null && daysDueIn < 2)
    })

  } catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

main();
