import { container } from "@sapphire/framework";
import type { GuildMember, User } from "discord.js"
export function addHoursToRoles(user: GuildMember, hours: Number) {
    user = user;
    hours = hours;
}

export async function addHoursToUser(user: User, hours: number) {
    hours = hours;
    user = user;

    let resource = {
        values: [[user.username, hours, new Date()]]
    }

    await container.sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SPREAD_SHEET_ID,
        range: user.username + "!A:C",
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        resource
    })


    
}