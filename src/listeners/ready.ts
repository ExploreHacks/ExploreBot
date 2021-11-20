import type { ListenerOptions, PieceContext } from '@sapphire/framework';
import { Listener, Store } from '@sapphire/framework';
import { blue, gray, green, magenta, magentaBright, white, yellow } from 'colorette';
import { google } from 'googleapis';

const dev = process.env.NODE_ENV !== 'production';

export class UserEvent extends Listener {
	private readonly style = dev ? yellow : blue;

	public constructor(context: PieceContext, options?: ListenerOptions) {
		super(context, {
			...options,
			once: true
		});
	}

	public async run() {
                this.container.logger.debug(await this.connectToSpreadsheet() == "200" ? "Connected to GoogleSheets" : "Connection to GoogleSheets Failed, you probably fucked something up")
		this.printBanner();
		this.printStoreDebugInformation();
	}

        private async connectToSpreadsheet() {
		this.container.auth = new google.auth.GoogleAuth({
			keyFile: 'src/lib/google-sheets/credentials.json',

			scopes: 'https://www.googleapis.com/auth/spreadsheets'
		});

		this.container.googleClient = await this.container.auth.getClient();

		this.container.sheets = google.sheets({ version: 'v4', auth: this.container.googleClient });

		this.container.metaData = await this.container.sheets.spreadsheets.get({
			auth: this.container.auth,
			spreadsheetId: process.env.SPREAD_SHEET_ID!
		});
                return this.container.metaData.status;
        }
	private printBanner() {
		const success = green('+');

		const llc = dev ? magentaBright : white;
		const blc = dev ? magenta : blue;

		const line01 = llc('');
		const line02 = llc('');
		const line03 = llc('');

		// Offset Pad
		const pad = ' '.repeat(7);

		console.log(
			String.raw`
${line01} ${pad}${blc('1.0.0')}
${line02} ${pad}[${success}] Gateway
${line03}${dev ? ` ${pad}${blc('<')}${llc('/')}${blc('>')} ${llc('DEVELOPMENT MODE')}` : ''}
		`.trim()
		);
	}

	private printStoreDebugInformation() {
		const { client, logger } = this.container;
		const stores = [...client.stores.values()];
		const last = stores.pop()!;

		for (const store of stores) logger.info(this.styleStore(store, false));
		logger.info(this.styleStore(last, true));
	}

	private styleStore(store: Store<any>, last: boolean) {
		return gray(`${last ? '└─' : '├─'} Loaded ${this.style(store.size.toString().padEnd(3, ' '))} ${store.name}.`);
	}
}
