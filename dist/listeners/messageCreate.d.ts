import type { PieceContext } from "@sapphire/framework";
import { Listener } from "@sapphire/framework";
import type { Message } from "discord.js";
export default class onMessage extends Listener {
    constructor(context: PieceContext);
    run(message: Message): Promise<void>;
}
//# sourceMappingURL=messageCreate.d.ts.map