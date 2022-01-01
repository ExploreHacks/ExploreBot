"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLists = exports.displayTasks = void 0;
const discord_js_1 = require("discord.js");
const framework_1 = require("@sapphire/framework");
const fetch = require('node-fetch');
const membersJson = require("../../json/members.json");
const listsToIgnoreJson = require("../../json/listsToIgnore.json");
// helper function to make rounding easier
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
// takes a list of trello ids of members and uses members.json to return a list of Members
function getMembers(trelloIdMembers) {
    let member;
    let members = new Array();
    for (const trelloId of trelloIdMembers) {
        member = { trelloId: trelloId, discordId: membersJson[trelloId].id, name: membersJson[trelloId].name };
        members.push(member);
    }
    return members;
}
/**
 * filters out tasks from lists and displays it on a discord channel
 * @param client
 * @param channelId
 * @param lists
 * @param filter
 */
async function displayTasks(client, channelId, lists, filter) {
    let status, fieldColor;
    for (const list of lists) {
        for (const card of list.cards) {
            let members = card.members;
            for (const member of members) {
                // assign status and fieldColor based on daysDueIn
                if (card.daysDueIn === null) {
                    status = "none";
                    fieldColor = [24, 25, 28];
                }
                else if (card.daysDueIn < 0) {
                    status = "overdue";
                    fieldColor = [255, 0, 0];
                }
                else if (card.daysDueIn <= 2) {
                    status = "due very soon";
                    fieldColor = [237, 66, 69];
                }
                else if (card.daysDueIn <= 4) {
                    status = "due soon";
                    fieldColor = [239, 188, 18];
                }
                else {
                    status = "due soon";
                    fieldColor = [76, 175, 80];
                }
                // use filter
                if (filter(card.daysDueIn, member.discordId)) {
                    // get the discord user that the task is assigned to
                    await client.users.fetch(member.discordId).then((user) => {
                        // create an embedded message
                        let dueLabel = (card.daysDueIn <= 0) ? "overdue by" : "due in";
                        let embed = new discord_js_1.MessageEmbed()
                            .setAuthor(member.name, user.avatarURL()?.toString(), '')
                            .setDescription(card.desc)
                            .setTitle(card.name)
                            .addField('due', `${card.dueString}`)
                            .addField('status', status)
                            .setColor(fieldColor);
                        if (card.daysDueIn != null) {
                            embed.addField(dueLabel, round(Math.abs(card.daysDueIn), 3) + " days");
                        }
                        // send embed message in channel
                        const TargetChannel = client.channels.cache.get(channelId);
                        if (TargetChannel != undefined && TargetChannel.isText())
                            TargetChannel.send({ embeds: [embed] });
                    });
                }
            }
        }
    }
}
exports.displayTasks = displayTasks;
/**
 * takes in list id and returns a list structure
 * @param listId
 * @returns
 */
async function getList(listId) {
    let url = `https://api.trello.com/1/lists/${listId}/cards?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`;
    framework_1.container.logger.trace("opening url " + url);
    let obj, list;
    let cards = [];
    let members = [];
    let daysLeft, dueDate, dueString;
    await fetch(url, { method: 'GET' }).then((res) => res.json())
        .then((data) => obj = data).then(() => {
        for (const element of obj) {
            if (element.due != null) {
                dueDate = new Date(element.due);
                daysLeft = (dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
                dueString = dueDate.toDateString();
            }
            else {
                daysLeft = null;
                dueDate = null;
                dueString = "no due date given";
            }
            members = getMembers(element.idMembers);
            let card = { name: element.name, daysDueIn: daysLeft, members: members, dueString: dueString, desc: element.desc };
            cards.push(card);
        }
    });
    list = { name: "list", trelloId: listId, cards: cards };
    return list;
}
/**
 * takes in board id and returns board/lists (list of List objects)
 * @param boardId
 * @returns
 */
async function getLists(boardId) {
    let url = `https://api.trello.com/1/boards/${boardId}/lists/all?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`;
    framework_1.container.logger.trace("opening url " + url);
    let obj;
    let lists = [];
    await fetch(url, { method: 'GET' }).then((res) => res.json())
        .then((data) => obj = data).then(async () => {
        for (const element of obj) {
            framework_1.container.logger.trace(element.id);
            if (!listsToIgnoreJson["ids"].includes(element.id)) {
                await getList(element.id).then(myList => {
                    lists.push(myList);
                    // container.logger.trace(JSON.stringify(myList,null,'  '))
                });
            }
        }
    });
    framework_1.container.logger.info(JSON.stringify(lists, null, '  '));
    return lists;
}
exports.getLists = getLists;
//# sourceMappingURL=trelloTasks.js.map