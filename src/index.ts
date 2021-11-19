import './lib/setup';
import { LogLevel, SapphireClient, container } from '@sapphire/framework';
import { google } from 'googleapis';
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

		container.auth = new google.auth.GoogleAuth({
			keyFile: "src/lib/google-sheets/credentials.json",

			scopes: "https://www.googleapis.com/auth/spreadsheets"
		});

		container.googleClient = await container.auth.getClient()

		container.sheets = google.sheets({ version: "v4", auth: container.googleClient })

		container.metaData = await container.sheets.spreadsheets.get({
			auth: container.auth,
			spreadsheetId: process.env.SPREAD_SHEET_ID!,
		})

		client.logger.info('Logging in');
		await client.login();
		client.logger.info('logged in');
		console.log(container.metaData);
		
	}  
	catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

main();
