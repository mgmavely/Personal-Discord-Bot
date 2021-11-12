const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const token = process.env['token']

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate",  message => {
  const prefix = "|";
  console.log(message.content.startsWith(prefix))
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  console.log(args);
  console.log(command);

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