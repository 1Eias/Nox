const { Client, Collection, Partials, GatewayIntentBits} = require('discord.js');
const Discord = require('discord.js');
const config = require('./config.json');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { createCanvas, loadImage } = require('canvas');
const { Script } = require('vm');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember
  ],
  shards: "auto",
  allowedMentions: {
    parse: [],
    repliedUser: false
  },
})

client.on('guildMemberAdd', async member => {
  const welcomeChannel = member.guild.channels.cache.get(config.welcomeChannelId);
  const role = member.guild.roles.cache.get(config.autoRoleId);

  
  if (role) {
      member.roles.add(role).catch(console.error);
  } else {
      console.log('Role not found');
  }

  const fullUser = await client.users.fetch(member.user.id, { force: true });

  const welcomeEmbed = new Discord.EmbedBuilder()
      .setColor('#05131f')
      .setTitle('Welcome to the Server!')
      .setDescription(`اهلا وسهلا ${member}, Welcome to **${member.guild.name}**! enjoy your stay`)
      .addFields(
          { name: 'Username', value: member.user.tag, inline: true },
          { name: 'You\'re the', value: `${member.guild.memberCount}th member`, inline: true }
      )
      .setThumbnail(member.user.displayAvatarURL())
      .setTimestamp();
  const bannerUrl = fullUser.bannerURL({ dynamic: true, format: 'png', size: 1024 });
  if (bannerUrl) {
      welcomeEmbed.setImage(bannerUrl);
  }

  welcomeChannel.send({ embeds: [welcomeEmbed] });
});

client.setMaxListeners(25);
require('events').defaultMaxListeners = 25;
require('dotenv').config();

module.exports = client;
client.commands = new Collection();
client.events = new Collection();
client.slashCommands = new Collection();
['commands', 'events', 'slash'].forEach(handler => {
  require(`./handlers/${handler}`)(client);
})

const commands = client.slashCommands.map(({ execute, ...data }) => data);

// Register slash commands
const rest = new REST({ version: '9' }).setToken(process.env.token);
rest.put(
  Routes.applicationGuildCommands(process.env.clientID, process.env.guildID),
  { body: commands },
).then(() => console.log('Successfully registered application commands.'))
  .catch(console.error)

client.on('guildMemberAdd', (member) =>{ //when members join server
  client.channels.cache.get('1193838770752082000').setName(`🌐 Total users - ${member.guild.memberCount}`) // count the total members
})

client.on('guildMemberRemove', (member) =>{ //when members leave server
  client.channels.cache.get('1193838770752082000').setName(`🌐 Total users - ${member.guild.memberCount}`) // count the total members
})

client.login(process.env.token).catch((err) => {
  console.log(err.message)
})