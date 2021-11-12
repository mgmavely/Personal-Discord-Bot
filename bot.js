const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const token = process.env['token']

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
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