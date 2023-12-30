const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "resume",
    description: "Resumes the currently paused track.",
    async execute(client, interaction) {
        try {
            if (interaction.guild.members.me.voice?.channelId && interaction.member.voice.channelId !== interaction.guild.members.me?.voice?.channelId) return interaction.reply({ content: `:no_entry_sign: You must be listening in \`${interaction.guild.members.me?.voice?.channel.name}\` to use that!`, ephemeral: true });
            if (!interaction.member.voice.channel)
                return interaction.reply({ content: ":no_entry_sign: You must join a voice channel to use that!", ephemeral: true })
            const queue = distube.getQueue(interaction)
            const song = queue.songs[0]
            let name = song.name
            if (!queue) return interaction.reply({ content: `:no_entry_sign: There must be music playing to use that!`, ephemeral: true })
            interaction.reply(`:notes: Resumed **${name}**.`)
            return distube.resume(interaction);
        } catch (err) {
            console.log(err)
        }
    },
};