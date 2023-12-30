const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "previous",
    description: "Plays the previous song in the queue.",
    options: [],
    async execute(client, interaction) {
        try {
            if (interaction.guild.members.me.voice?.channelId && interaction.member.voice.channelId !== interaction.guild.members.me?.voice?.channelId) return interaction.reply({ content: `:no_entry_sign: You must be listening in \`${interaction.guild.members.me?.voice?.channel.name}\` to use that!`, ephemeral: true });
            if (!interaction.member.voice.channel)
                return interaction.reply({ content: ":no_entry_sign: You must join a voice channel to use that!", ephemeral: true })
            const queue = distube.getQueue(interaction)
            if (!queue) return interaction.reply({ content: `:no_entry_sign: There must be music playing to use that!`, ephemeral: true })
            if (queue.previousSongs.length == 0) {
                interaction.reply({ content: `:no_entry_sign: There is no previous song in this queue`, ephemeral: true })
            } else {
            await distube.previous(interaction);
            interaction.reply({ content: `:notes: Song has been Previous` })
            }
        } catch (err) {
            console.log(err)
        }
    },
};