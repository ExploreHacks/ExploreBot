import type { CommandSuccessPayload, ListenerOptions, PieceContext } from '@sapphire/framework';
import { Events, Listener } from '@sapphire/framework';
export declare class UserEvent extends Listener<typeof Events.CommandSuccess> {
    constructor(context: PieceContext, options?: ListenerOptions);
    run({ message, command }: CommandSuccessPayload): void;
    onLoad(): unknown;
    private shard;
    private command;
    private author;
    private direct;
    private guild;
}
//# sourceMappingURL=commandSuccessLogger.d.ts.map