import './lib/setup';
import { LogLevel, SapphireClient } from '@sapphire/framework';
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
    processList(`https://api.trello.com/1/lists/6190815c0659fb166a7e9c36/cards?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`)

	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

// // reminder code. idk where else to put it so i'll keep it here for now
// // ====================================================================


import dotenv from "dotenv";
dotenv.config()
const fetch = require('node-fetch');

// gettings lists in board
// https://api.trello.com/1/boards/6190815575f5307e9c1f3221/lists?key=23df9d1448db3501a3d1bf0003f39578&token=c4cf1859bde9e45871ba7664c6a2dedd75f9ff03386041e35cb67d05dd471ab7

// getting cards in board
// api.trello.com/lists/[listid]/cards?key=[key]&token=[token]
// https://api.trello.com/1/lists/6190815c0659fb166a7e9c36/cards?key=23df9d1448db3501a3d1bf0003f39578&token=c4cf1859bde9e45871ba7664c6a2dedd75f9ff03386041e35cb67d05dd471ab7

// console.log(process.env.TRELLO_KEY)

// var myObj;

// var name;
function storeVar(obj: any) {
  // for (let o in obj){
  //   console.log(o.name)
  // }
  obj.forEach((element: { due: string, name:string; }) => {
    console.log(`the task ${element.name} is due at ${element.due}`)
    let dueDate:Date = new Date(element.due)
    console.log("today: "+new Date())
    let daysLeft:number = (dueDate.getTime() - Date.now())/(1000*60*60*24)
    console.log("due in "+daysLeft+" days")
    if (daysLeft <= 2){
      client.users.fetch('545063650088452127').then((user) => {
        user.send(`Your task named ${element.name} is due in 2 days. get it done or else leo will slap you`);
    });  
    }


    console.log("=================================================")
  });
  // console.log(obj)
  // console.log(obj[0].name)
  // name = obj[0]["name"]
}

async function processList(url:any){
  let obj: any;
  let broplsstore:any;
  fetch(url, {method: 'GET'}).then((res: { json: () => any; }) => res.json())
  .then((data: any) => obj = data).then(() => {storeVar(obj)})
  return broplsstore
}


// code to get all lists
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

