const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "autoplay",
    description: "Toggles autoplay for the current guild.",
    async execute(client, interaction) {
        try {
            const queue = distube.getQueue(interaction)
            if (!queue) return interaction.reply({ content: `:no_entry_sign: There must be music playing to use that!`, ephemeral: true })
            if (interaction.guild.members.me.voice?.channelId && interaction.member.voice.channelId !== interaction.guild.members.me?.voice?.channelId) return interaction.reply({ content: `:no_entry_sign: You must be listening in \`${interaction.guild.members.me?.voice?.channel.name}\` to use that!`, ephemeral: true });
            if (!interaction.member.voice.channel)
                return interaction.reply({ content: ":no_entry_sign: You must join a voice channel to use that!", ephemeral: true })
            const mode = distube.toggleAutoplay(interaction)
//            interaction.reply(":white_check_mark: Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
            if (!queue.autoplay) {
                interaction.reply({ content: `:white_check_mark: Set autoplay mode to **\`${queue.autoplay ? "On" : "Off"}\`**` })
            } else {
                interaction.reply({ content: `:white_check_mark: Set autoplay mode to **\`${queue.autoplay ? "On" : "Off"}\`**` })
            }
        } catch (err) {
            console.log(err)
        }
    },
};