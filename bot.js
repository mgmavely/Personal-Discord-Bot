const Database = require("@replit/database")
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

let ttt = require("./ttt.js");
let player = require("./player.js");

const token = process.env['token'];

//Hash tables for players and games
const players = new Object();
const games = new Object();

//PREFIX FOR BOT COMMANDS
const prefix = "|";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate",  message => {
  if (Object.keys(games).length !== 0 && message.author.id !== `908744402439135323`) {
    let game_id = players[message.author.id];
    if (games[game_id].game_over === true) {
      delete players[(games[game_id].player1)];
      delete players[(games[game_id].player2)];
      delete games[game_id];
    } else {
      message.channel.send(games[game_id].playTicTacToe(message))
      message.channel.send(games[game_id].returnBoard())
    }    
  }
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  console.log("Args: " + args.length);
  console.log("Command: " + command);

  if (command === "ratio") {
          if (message.mentions.repliedUser !== null) {
            message.channel.messages.fetch(message.reference.messageId).then(msg => {msg.react('🇷')
            msg.react('🇦')
            msg.react('🇹')
            msg.react('🇮')
            msg.react('🇴')}
            )
          }          
        }

  if (command === "ttt") {
    console.log(args[0]);
    if (args.length !== 1) {
      message.reply("Invalid format.  Please use command |h for command information!")
    } else if (message.mentions.users.first() !== undefined ) {
      if (players[message.author.id] !== undefined) {
        message.reply(`You are currently in a game.  You may not start another game until your current game is finished.`)
      } else if (players[message.mentions.users.first().id] !== undefined) {
        message.reply(`<@!${message.mentions.users.first().id} is currently in a game, you may not start a game with them untill they finish their game.`);
      } else {
        // Create new game and send embed
        // let p1 = message.author.id;
        // let p2 = message.mentions.users.first().id;
        // let game_id = parseInt(p1.toString() + p2.toString());
        // games[game_id] = new ttt(p1, p2);
        // players[p1] = game_id;
        // players[p2] = game_id;
        // message.channel.send('<@!' + p1 + '>\'s Turn. ');
        // message.channel.send(games[game_id].returnBoard());
      }
    } else if (args[0] === "board") {
      if (players[message.author.id] === undefined) {
        message.reply("You are currently not playing a game.  To start a game, use the following command: `|ttt @<user>`");
      } else {
        // Create embed and @ user as message in channel
      }
      message.channel.send("test");
    } else {
      // Play turn with user argument.  Create embed and send
    }
  }

});


client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'wave') {
    const rng = Math.floor(Math.random() * 3)
    if (rng === 0) {
      await interaction.reply('Hello User!');
    } else if (rng === 1) {
      await interaction.reply('Hi User!');
    } else {
      await interaction.reply('👋');
    }
    
  }
});

client.login(token);