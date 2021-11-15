import './lib/setup';
import { LogLevel, SapphireClient } from '@sapphire/framework';
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
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

// reminder code. idk where else to put it so i'll keep it here for now
// ====================================================================

// function resolveAfter2Seconds() {
// 	var today = new Date();
// 	console.log(today.getMinutes())
// 	while (today.getMinutes() != 21){}
// 	// return new Promise(resolve => { resolve("helloooooooo im tryna remind you!!") })
// 	return "hi"

// 	// while (today.getMinutes !)

// 	return new Promise(resolve => {
// 		setTimeout(() => {
// 			resolve('resolved');
// 		}, 2000);
// 	});
// }

function waitUntilTime() {

	var dueDate = new Date("11/14/2021 11:14:00 PM").getTime()
	var currentTime = new Date().getTime()
	var msdifference = dueDate - currentTime
	// setTimeout(() => console.log("timer started"), msdifference);
		
	if (msdifference < 0) return -1
	console.log("starting timer of " + msdifference+" ms")
	return new Promise(resolve => {setTimeout(() => { resolve('timer ended'); }, msdifference);});
	// return "it is time"
}

async function asyncCall() {
	console.log('calling')
	// const result = await resolveAfter2Seconds();
	const result = await waitUntilTime()
	console.log(result)
	// expected output: "resolved"
}

asyncCall();

// reminder code. idk where else to put it so i'll keep it here for now
// ====================================================================



main();

