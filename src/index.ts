import './lib/setup';
import {getLists, displayTasks, List} from './tasks/trelloTasks'
import { LogLevel, SapphireClient, container, Command } from '@sapphire/framework';

//TODO: extend me later
export const client = new SapphireClient({
	defaultPrefix: '.',
	caseInsensitiveCommands: true,
	logger: {
		level: LogLevel.Trace
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
    sendReminder(16, 0, 0)
  } catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

main();

/**
 * sends reminders at a certain time everyday in a specific channel
 * @param hour 
 * @param minute 
 * @param second 
 */
async function sendReminder(hour:number, minute: number, second: number) {
  while (true) {
    const now:any = new Date(); // works only with any
    const then:any = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, second, 0)
    var millisTill:number = then - now;
    if (millisTill < 0) {
        millisTill += 1000*60*60*24; // it's after x am/pm, try x am/pm tomorrow.
    }
    client.logger.info("set timer for "+millisTill+"ms")
    await new Promise(resolve => setTimeout(resolve, millisTill));
    let lists:List[] = await getLists("6190815575f5307e9c1f3221")
    displayTasks(client, "914272295047028776", lists, (daysDueIn:number, _discordId:string) => {
      return (daysDueIn != null && daysDueIn < 2)
      // return (discordId == "545063650088452127")
    })
  }
  
}
