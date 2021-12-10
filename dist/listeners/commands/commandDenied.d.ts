import type { CommandDeniedPayload, Events } from '@sapphire/framework';
import { Listener, UserError } from '@sapphire/framework';
export declare class UserEvent extends Listener<typeof Events.CommandDenied> {
    run({ context, message: content }: UserError, { message }: CommandDeniedPayload): Promise<import("discord.js").Message<boolean> | undefined>;
}
//# sourceMappingURL=commandDenied.d.ts.map