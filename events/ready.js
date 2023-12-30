const { ActivityType } = require('discord.js');
const Discord = require('discord.js');
const db = require('quick.db');
const { prefix } = require('../config.json');
const { joinVoiceChannel } = require('@discordjs/voice');
const distube = require('../client/distube');
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    try {
      client.pickPresence = async () => {
        const options = [
          {
            type: ActivityType.Watching,
            text: "over my server",
            status: "online",
          },
          {
            type: ActivityType.Listening,
            text: "to your commands",
            status: "idle",
          },
          {
            type: ActivityType.Playing,
            text: "your songs",
            status: "dnd",
          },
        ];
        const option = Math.floor(Math.random() * options.length);
    
        client.user.setPresence({
          activities: [
            {
              name: options[option].text,
              type: options[option].type,
            },
          ],
          status: options[option].status,
        });
      };
      console.log((`Logged in as ${client.user.tag}`).red);
      console.log((`Servers: ${client.guilds.cache.size}`).magenta, (`Users: ${client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString()}`).yellow, (`Commands: ${client.commands.size}`).green);
        setInterval(client.pickPresence, 10 * 1000);
    } catch (err) {
      console.log(err)
    }
  }
};