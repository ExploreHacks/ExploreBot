import './lib/setup';
import { LogLevel, SapphireClient } from '@sapphire/framework';
import { MessageEmbed } from 'discord.js';
import dotenv from "dotenv";
import { channel } from 'diagnostics_channel';
import { strictEqual } from 'assert';
dotenv.config()
const fetch = require('node-fetch');
let membersJson = require("../json/members.json")
let listsToIgnoreJson = require("../json/listsToIgnore.json")
// console.log(membersJson)


// import { resolve } from 'path/posix';
//TODO: extend me later
const client = new SapphireClient({
	defaultPrefix: '.',
	caseInsensitiveCommands: true,
	logger: {
		level: LogLevel.Debug
	},
	shards: 'auto',
	intents: [
		'GUILDS',
		'GUILD_MEMBERS',
		'GUILD_BANS',
		'GUILD_EMOJIS_AND_STICKERS',
		'GUILD_VOICE_STATES',
		'GUILD_MESSAGES',
		'GUILD_MESSAGE_REACTIONS',
		'DIRECT_MESSAGES',
		'DIRECT_MESSAGE_REACTIONS'
	]
});

const main = async () => {
	try {
		client.logger.info('Logging in');
		await client.login();
		client.logger.info('logged in');
    // processCardsInList(`https://api.trello.com/1/lists/6190815c0659fb166a7e9c36/cards?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`)
    let lists:List[] = await getLists(`https://api.trello.com/1/boards/6190815575f5307e9c1f3221/lists/all?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`)
    console.log(lists)
    sendReminders(lists)
  } catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

// // reminder code. idk where else to put it so i'll keep it here for now
// // ====================================================================




// gettings lists in board
// https://api.trello.com/1/boards/6190815575f5307e9c1f3221/lists?key=23df9d1448db3501a3d1bf0003f39578&token=c4cf1859bde9e45871ba7664c6a2dedd75f9ff03386041e35cb67d05dd471ab7

// getting cards in board
// api.trello.com/lists/[listid]/cards?key=[key]&token=[token]
// https://api.trello.com/1/lists/6190815c0659fb166a7e9c36/cards?key=23df9d1448db3501a3d1bf0003f39578&token=c4cf1859bde9e45871ba7664c6a2dedd75f9ff03386041e35cb67d05dd471ab7

// console.log(process.env.TRELLO_KEY)

// var myObj;

// var name;

// helper function that takes in a list of trello member ids and returns a list of member objects with trello id, discord id, and discord name

type Member = {trelloId: string, discordId:string, name:string};
type Card = {name: string, daysDueIn: number, members: Member[], dueString: string, desc: string}
type List = {name:string, trelloId: string, cards: Card[]}

function round(value:number, precision:number) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

function getMembers(trelloIdMembers: string[]) {
  // console.log(trelloIdMembers)
  let member:Member;
  let members = new Array<Member>()
  let trelloId:string;

  // trelloIdMembers.forEach((trelloId: string) => { 
  for (const trelloId of trelloIdMembers) {
    member = {trelloId: trelloId, discordId: membersJson[trelloId].id, name: membersJson[trelloId].name}
    members.push(member)
  }

  return members;

  // console.log(members)

}

/**
 * sends reminders in a particular channel if a task is due late
 * @param list 
 */
function sendReminders(lists: List[]){
  // list.cards.forEach((card: Card) => {
  for (const list of lists) {
    for (const card of list.cards) {
      let members:Member[] = card.members
      for (const member of members) {
      // members.forEach( (member : Member) => {
        if (card.daysDueIn <= 2){
          let dueLabel:string = (card.daysDueIn <= 0) ? "overdue by" : "due in"
          // get the discord user to dm using the discord id
          client.users.fetch(member.discordId).then((user) => {
            // create an embedded message
            let embed = new MessageEmbed()
            .setAuthor(member.name,  user.avatarURL()?.toString(), '')
            .setDescription(card.desc)
            .setTitle(card.name)
            .addField(dueLabel, round(Math.abs(card.daysDueIn), 3)+" days")
            .addField('due', `${card.dueString}`)
            .setColor([237, 66, 69])
            // send the message
            // client.channels.cache.get("695852556718440538").send({embeds: [embed]})
            const TargetChannel = client.channels.cache.get("695852556718440538")
            if (TargetChannel != undefined && TargetChannel.isText()) TargetChannel.send({embeds: [embed]})
          });
        }
      }
    }
  }
}

/**
 * takes in list id and returns a list of cards
 * @param listId 
 * @returns 
 */
async function getList(listId: string){
  let url = `https://api.trello.com/1/lists/${listId}/cards?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`
  console.log("opening url "+url)
  let obj: any, list: List
  let cards: Card[] = []
  let members: Member[] = []

  await fetch(url, {method: 'GET'}).then((res: { json: () => any; }) => res.json())
  .then((data: any) => obj = data).then(() => {

    // console.log(listId)
    // console.log("Member id: "+obj[0]["idMembers"])

    // obj.forEach((element: { due: string, name:string, idMembers: string[], desc:string; }) => {
    for (const element of obj) {
    
      // if there is no due date set to the element, go to the next iteration in the for each loop
      if (element.due == null) return;

      // get the members!
      // console.log("=================================================")
      let dueDate:Date = new Date(element.due)
      let daysLeft:number = (dueDate.getTime() - Date.now())/(1000*60*60*24)
      members = getMembers(element.idMembers)
      let card:Card = {name: element.name, daysDueIn: daysLeft, members: members, dueString: dueDate.toDateString(), desc: element.desc}
      cards.push(card)
      // console.log("=================================================")
    }

  })

  list = {name: "list", trelloId: listId, cards: cards}
  // console.log(cards)
  return list;
  
} 

async function getLists(url:any){
  console.log("opening url "+url)
  let obj: any;
  let lists: List[] = [];
  await fetch(url, {method: 'GET'}).then((res: { json: () => any; }) => res.json())
  .then((data: any) => obj = data).then(async () => {
    // console.log(obj)
    // obj.forEach((element: { id: string, name:string}) => {
      for (const element of obj) {
      console.log(element.id)
      if (!listsToIgnoreJson["ids"].includes(element.id)) {
          await getList(element.id).then(
          myList => { 
            lists.push(myList)
            console.log("yo")
            // console.log(JSON.stringify(myList,null,'  '))
          }
        )
      }
    }
    //});
  })
  // console.log(JSON.stringify(lists,null,'  '))
  // console.log(lists)
  // console.log("dofjfldajl;djfakl")

  return lists
}


// code to get all lists
// https://api.trello.com/1/boards/6190815575f5307e9c1f3221/lists?key=23df9d1448db3501a3d1bf0003f39578&token=c4cf1859bde9e45871ba7664c6a2dedd75f9ff03386041e35cb67d05dd471ab7
// https://api.trello.com/1/boards/6190815575f5307e9c1f3221/lists/6190815c0659fb166a7e9c36/cards

// console.log(myObj)
// console.log(res)
// var lists = {}
// var name:string
// for (var r in res){
//   name = r.filter("name")
// }

// function waitUntilTime() {

// 	var dueDate = new Date("11/14/2021 11:14:00 PM").getTime()
// 	var currentTime = new Date().getTime()
// 	var msdifference = dueDate - currentTime
// 	// setTimeout(() => console.log("timer started"), msdifference);
		
// 	if (msdifference < 0) return -1
// 	console.log("starting timer of " + msdifference+" ms")
// 	return new Promise(resolve => {setTimeout(() => { resolve('timer ended'); }, msdifference);});
// 	// return "it is time"
// }

// async function asyncCall() {
// 	console.log('calling')
// 	// const result = await resolveAfter2Seconds();
// 	const result = await waitUntilTime()
// 	console.log(result)
// 	// expected output: "resolved"
// }

// asyncCall();


// reminder code. idk where else to put it so i'll keep it here for now
// ====================================================================

main();
