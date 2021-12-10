"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEvent = void 0;
const framework_1 = require("@sapphire/framework");
const colorette_1 = require("colorette");
const googleapis_1 = require("googleapis");
const dev = process.env.NODE_ENV !== 'production';
class UserEvent extends framework_1.Listener {
    constructor(context, options) {
        super(context, {
            ...options,
            once: true
        });
        Object.defineProperty(this, "style", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: dev ? colorette_1.yellow : colorette_1.blue
        });
    }
    async run() {
        this.container.logger.debug(await this.connectToSpreadsheet() == "200" ? "Connected to GoogleSheets" : "Connection to GoogleSheets Failed, you probably fucked something up");
        this.printBanner();
        this.printStoreDebugInformation();
    }
    async connectToSpreadsheet() {
        this.container.auth = new googleapis_1.google.auth.GoogleAuth({
            keyFile: 'src/lib/google-sheets/credentials.json',
            scopes: 'https://www.googleapis.com/auth/spreadsheets'
        });
        this.container.googleClient = await this.container.auth.getClient();
        this.container.sheets = googleapis_1.google.sheets({ version: 'v4', auth: this.container.googleClient });
        this.container.metaData = await this.container.sheets.spreadsheets.get({
            auth: this.container.auth,
            spreadsheetId: process.env.SPREAD_SHEET_ID
        });
        this.container.leo = "574739108983734282";
        return this.container.metaData.status;
    }
    printBanner() {
        const success = (0, colorette_1.green)('+');
        const llc = dev ? colorette_1.magentaBright : colorette_1.white;
        const blc = dev ? colorette_1.magenta : colorette_1.blue;
        const line01 = llc('');
        const line02 = llc('');
        const line03 = llc('');
        // Offset Pad
        const pad = ' '.repeat(7);
        console.log(String.raw `
${line01} ${pad}${blc('1.0.0')}
${line02} ${pad}[${success}] Gateway
${line03}${dev ? ` ${pad}${blc('<')}${llc('/')}${blc('>')} ${llc('DEVELOPMENT MODE')}` : ''}
		`.trim());
    }
    printStoreDebugInformation() {
        const { client, logger } = this.container;
        const stores = [...client.stores.values()];
        const last = stores.pop();
        for (const store of stores)
            logger.info(this.styleStore(store, false));
        logger.info(this.styleStore(last, true));
    }
    styleStore(store, last) {
        return (0, colorette_1.gray)(`${last ? '└─' : '├─'} Loaded ${this.style(store.size.toString().padEnd(3, ' '))} ${store.name}.`);
    }
}
exports.UserEvent = UserEvent;
//# sourceMappingURL=ready.js.map