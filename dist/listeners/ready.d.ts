import type { ListenerOptions, PieceContext } from '@sapphire/framework';
import { Listener } from '@sapphire/framework';
export declare class UserEvent extends Listener {
    private readonly style;
    constructor(context: PieceContext, options?: ListenerOptions);
    run(): Promise<void>;
    private connectToSpreadsheet;
    private printBanner;
    private printStoreDebugInformation;
    private styleStore;
}
//# sourceMappingURL=ready.d.ts.map