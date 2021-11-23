const Database = require("@replit/database")
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

let gm = require("./gameManager.js");

const token = process.env['token'];

//PREFIX FOR BOT COMMANDS
const prefix = ".";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "ratio") {
    if (message.mentions.repliedUser !== null) {
      message.channel.messages.fetch(message.reference.messageId).then(msg => {
        msg.react('🇷')
        msg.react('🇦')
        msg.react('🇹')
        msg.react('🇮')
        msg.react('🇴')
      }
      )
    }
  }

  if (command === "ttt") {
    gm.gameManager(message, args);
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