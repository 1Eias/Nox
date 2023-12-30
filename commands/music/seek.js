const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "seek",
    description: "Seeks to a certain point in the current track.",
    options: [
        {
            name: `seconds`,
            description: `the seconds to seek througth the current song.`,
            type: 10,
            required: true
        }
    ],
    async execute(client, interaction) {
        let args = interaction.options.getNumber('seconds')
        try {
            if (interaction.guild.members.me.voice?.channelId && interaction.member.voice.channelId !== interaction.guild.members.me?.voice?.channelId) return interaction.reply({ content: `:no_entry_sign: You must be listening in \`${interaction.guild.members.me?.voice?.channel.name}\` to use that!`, ephemeral: true });
            if (!interaction.member.voice.channel)
                return interaction.reply({ content: ":no_entry_sign: You must join a voice channel to use that!", ephemeral: true })
            const queue = distube.getQueue(interaction)
            if (!queue.autoplay && queue.formattedCurrentTime <= song.formattedDuration) return message.reply({ content: `:no_entry_sign:  Max formattedDuration: [${queue.formattedCurrentTime} / ${song.formattedDuration}]`, ephemeral: true });
            if (!queue) return interaction.reply({ content: `:no_entry_sign: There must be music playing to use that!` })
            interaction.reply({ content: `:notes: seeked the song for \`${args} seconds\`` })
            return distube.seek(interaction, Number(args * 1000));
        } catch (err) {
            console.log(err)
        }
    },
};