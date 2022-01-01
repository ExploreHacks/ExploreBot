import type { SapphireClient } from "@sapphire/framework";
export declare type Member = {
    trelloId: string;
    discordId: string;
    name: string;
};
export declare type Card = {
    name: string;
    daysDueIn: number;
    members: Member[];
    dueString: string;
    desc: string;
};
export declare type List = {
    name: string;
    trelloId: string;
    cards: Card[];
};
/**
 * filters out tasks from lists and displays it on a discord channel
 * @param client
 * @param channelId
 * @param lists
 * @param filter
 */
export declare function displayTasks(client: SapphireClient, channelId: string, lists: List[], filter: (daysDueIn: number, discordId: string) => boolean): Promise<void>;
/**
 * takes in board id and returns board/lists (list of List objects)
 * @param boardId
 * @returns
 */
export declare function getLists(boardId: string): Promise<List[]>;
//# sourceMappingURL=trelloTasks.d.ts.map