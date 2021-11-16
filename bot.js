const Database = require("@replit/database")
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

let ttt = require("./ttt.js");
//let player = require("./player.js");

const token = process.env['token'];

//Hash tables for players and games
const players = new Object();
const games = new Object();

//PREFIX FOR BOT COMMANDS
const prefix = ".";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate",  message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  // if (Object.keys(games).length !== 0 && message.author.id !== `908744402439135323`) {
  //   let game_id = players[message.author.id];
  //   if (games[game_id].game_over === true) {
  //     delete players[(games[game_id].player1)];
  //     delete players[(games[game_id].player2)];
  //     delete games[game_id];
  //   } else {
  //     message.channel.send(games[game_id].playTicTacToe(message))
  //     message.channel.send(games[game_id].returnBoard())
  //   }    
  // }  

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

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
    if (args.length !== 1) {
      message.reply("Invalid format.  Please use command |h for command information!")
    } else if (message.mentions.users.first() !== undefined ) {
      if (players[message.author.id] !== undefined) {
        message.reply(`You are currently in a game.  You may not start another game until your current game is finished.`)
      } else if (players[message.mentions.users.first().id] !== undefined) {
        message.reply(`<@!${message.mentions.users.first().id} is currently in a game, you may not start a game with them untill they finish their game.`);
      } else {
        //// Create new game and send embed
        // Create variables to store ids
        let p1 = message.author.id;
        let p2 = message.mentions.users.first().id;
        let game_id = parseInt(p1.toString() + p2.toString());

        // Add players & game to respective hash tables
        games[game_id] = new ttt(p1, p2);
        players[p1] = game_id;
        players[p2] = game_id;

        //send embed
        message.channel.send('<@!' + games[game_id].currentPlayer() + '>\'s Turn. ');
        message.channel.send(games[game_id].returnBoard());
      }
    } else if (args[0] === "board") {
      if (players[message.author.id] === undefined) {
        message.reply(`You are currently not playing a game.  To start a game, use the following command: \`${prefix}ttt @<user>\``);
      } else {
        let game_id = players[message.author.id];
        // Create embed and @ user as message in channel
        message.channel.send('<@!' + games[game_id].currentPlayer() + '>\'s Turn. ');
        message.channel.send(games[game_id].returnBoard());
      }
    }  else if (args[0] === "ff") {
      if (players[message.author.id] === undefined) {
        message.reply(`You are currently not playing a game.  To start a game, use the following command: \`${prefix}ttt @<user>\``);
      } else {
        let game_id = players[message.author.id];
        // Create embed and @ user as message in channel
        message.channel.send(`<@!${games[game_id].player1}> <@!${games[game_id].player2}>`);
        message.channel.send(`<@!${message.author.id}> has forfeit the game`);
        message.channel.send(games[game_id].returnBoard());
        delete players[(games[game_id].player1)];
        delete players[(games[game_id].player2)];
        delete games[game_id];
      }
    } else {
      // Check that message.author.id === ...currentPlayer() - handle logic accordingly
      // Play turn with user argument.  Create embed and send
      // Follow with logic to handle if game.is_ended is true
      let game_id = players[message.author.id];

      if (message.author.id !== games[game_id].currentPlayer()) {
        message.reply(`It's not your turn right now.  Use \`${prefix}ttt board\` for game information.`)
      } else {
        msgString = games[game_id].playTicTacToe(args[0]);
        if (games[game_id].game_over === true) {
          message.channel.send('<@!' + games[game_id].player1 + '>' + '<@!' + games[game_id].player2 + '>');
          message.channel.send(msgString);
          message.channel.send(games[game_id].returnBoard());
          delete players[(games[game_id].player1)];
          delete players[(games[game_id].player2)];
          delete games[game_id];
        } else {
          //message.channel.send(games[game_id].playTicTacToe(args[0]));
          message.channel.send('<@!' + games[game_id].currentPlayer() + '>\'s Turn. ');
          message.channel.send(games[game_id].returnBoard());
        }
      }      
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