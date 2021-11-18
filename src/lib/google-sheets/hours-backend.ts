import { container } from "@sapphire/framework";
import type { GuildMember, User } from "discord.js"
export function addHoursToRoles(user: GuildMember, hours: Number) {
    user = user;
    hours = hours;
}

export async function addHoursToUser(user: User, hours: Number) {
    user = user;
    hours = hours;

    await container.sheets.loadInfo(); // loads document properties and worksheets
    console.log(container.sheets.title);
    await container.sheets.updateProperties({ title: 'renamed doc' });
}