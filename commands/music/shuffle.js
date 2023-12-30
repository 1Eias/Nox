const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "shuffle",
    description: "Shuffle the queue.",
    async execute(client, interaction) {
        try {
            if (interaction.guild.members.me.voice?.channelId && interaction.member.voice.channelId !== interaction.guild.members.me?.voice?.channelId) return interaction.reply({ content: `:no_entry_sign: You must be listening in \`${interaction.guild.members.me?.voice?.channel.name}\` to use that!`, ephemeral: true });
            if (!interaction.member.voice.channel)
                return interaction.reply({ content: ":no_entry_sign: You must join a voice channel to use that!", ephemeral: true })
            if (!queue.autoplay && queue.songs.length <= 1) return interaction.reply({ content: `:no_entry_sign:  this is last song in queue list` });
            const queue = distube.getQueue(interaction)
            if (!queue) return interaction.reply({ content: `:no_entry_sign: There must be music playing to use that!`, ephemeral: true })
            interaction.reply({ content: `:white_check_mark: Song has been: \`Shuffle ${queue.songs.length - 1}\`` })
            return distube.shuffle(interaction);
        } catch (err) {
            console.log(err)
        }
    },
};