import { container, LogLevel, SapphireClient } from "@sapphire/framework";
import { join } from "path";

export default class ExploreBot extends SapphireClient {
  public constructor() {
    super({
      baseUserDirectory: join(__dirname, "..", ".."),
      caseInsensitiveCommands: true,
      caseInsensitivePrefixes: true,
      defaultPrefix: ".",
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
	],
      logger: { level: LogLevel.Warn },
    });
    // Store.defaultStrategy.onLoad = (store, piece: Piece) => container.logger.debug(`Loading ${store.name}:${piece.name}`);
    container.client = this;
  }

  public fetchPrefix = (): string => process.env.PREFIX || "cx ";

  public start(): void {
    this.login().catch(() => this.stop());
  }

  public stop(): void {
    process.exit(1);
  }
}
