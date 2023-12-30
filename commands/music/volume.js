const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const db = require(`quick.db`)
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "volume",
    description: "Changes/Shows the current volume.",
    options: [
        {
            name: `volume`,
            description: `the volume to set`,
            type: 10,
            required: false
        }
    ],
    async execute(client, interaction) {
        try {
            if (interaction.guild.members.me.voice?.channelId && interaction.member.voice.channelId !== interaction.guild.members.me?.voice?.channelId) return interaction.reply({ content: `:no_entry_sign: You must be listening in \`${interaction.guild.members.me?.voice?.channel.name}\` to use that!`, ephemeral: true });
            if (!interaction.member.voice.channel)
                return interaction.reply({ content: ":no_entry_sign: You must join a voice channel to use that!", ephemeral: true })
            const queue = distube.getQueue(interaction)
            if (!queue) return interaction.reply({ content: `:no_entry_sign: There must be music playing to use that!`, ephemeral: true })
            let args = interaction.options.getNumber('volume')
            const volume = parseInt(args);
            if (volume) {
                if (volume < 0 || volume > 150 || isNaN(volume))
                    return interaction.reply({ content: ":no_entry_sign: **Volume must be a valid integer between 0 and 150!**", ephemeral: true })
                if (volume < 0) volume = 0;
                if (volume > 150) volume = 150;
                db.set(`volume_${interaction.guild.id}`, volume)
                interaction.reply(`:loud_sound: Volume changed from \`${queue.volume}\` to \`${volume}\``)
                distube.setVolume(interaction, volume);
            } else if (!volume) {
                return interaction.reply({ content: `:loud_sound: Volume: \`${queue.volume}\`%`, ephemeral: true });
            }
        } catch (err) {
            console.log(err)
        }
    },
};
