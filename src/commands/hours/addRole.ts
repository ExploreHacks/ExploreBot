import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command, CommandOptions } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import type { Message } from 'discord.js';
import { addHoursToRoles } from "../../lib/google-sheets/hours-backend"


@ApplyOptions<CommandOptions>({
    description: "adds hours to a single user",
    aliases: ['ahr']
})
export class AddRolesHours extends Command {
    public async messageRun(message: Message, args: Args) {
        const role = await args.pick('role');
        const hours = await args.pick('number');

        role.members.map(it => {
            addHoursToRoles(it, hours);
        })

        send(message, "role hours successfully added");
    }
}