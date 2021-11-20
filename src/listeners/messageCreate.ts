import type { PieceContext } from "@sapphire/framework";
import { Listener } from "@sapphire/framework";
import type { Message } from "discord.js";

export default class onMessage extends Listener {
  public constructor(context: PieceContext) {
    super(context);
  }

  public async run(message: Message) {
    if ( this.container.leo === message.author.id && message.content.endsWith(".")) {
      const leomessage = message.content;
      const newmessage = message.content.substring(0, leomessage.length - 1)
      const channel = message.channel;
      await message.delete()
      channel.send(newmessage)
    }
  }
}
