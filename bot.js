const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

let ttt = require("./ttt.js");

const token = process.env['token'];

const games = [];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate",  message => {
  if (games.length !== 0 && message.author.id !== `908744402439135323`) {
    if (games[0].game_over === true) {
      games.length = 0;
    } else {
      message.channel.send(games[0].playTicTacToe(message))
      message.channel.send(games[0].returnBoard())
    }    
  }
  const prefix = "|";
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  console.log("Args: " + args.length);
  console.log("Command: " + command);

  if (command === "ratio" /*message.member.roles.cache.some(r => r.name === "Mod")*/) {
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
      message.reply("Invalid format.  Please \@ one user to play tic-tac-toe with them!")
    } else {
      games.push(new ttt(message.author.id, 123));
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