const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "jump",
    description: "Skip to a song in the queue.",
    options: [
        {
            name: `number`,
            description: `number of sonds to skip`,
            type: 10,
            required: true
        }
    ],
    async execute(client, interaction) {
        let args = interaction.options.getNumber('number')
        try {
            if (interaction.guild.members.me.voice?.channelId && interaction.member.voice.channelId !== interaction.guild.members.me?.voice?.channelId) return interaction.reply({ content: `:no_entry_sign: You must be listening in \`${interaction.guild.members.me?.voice?.channel.name}\` to use that!`, ephemeral: true });
            if (!interaction.member.voice.channel)
                return interaction.reply({ content: ":no_entry_sign: You must join a voice channel to use that!", ephemeral: true })
            const queue = distube.getQueue(interaction)
            if (!queue) return interaction.reply({ content: `:no_entry_sign: There must be music playing to use that!`, ephemeral: true })
            if (!queue.autoplay && queue.songs.length <= 1) return interaction.reply({ content: `:no_entry_sign:  this is last song in queue list`, ephemeral: true });
            if (0 <= Number(args) && Number(args) <= queue.songs.length) {
                interaction.reply({ content: `:notes: Jumped songs!` })
                return distube.jump(interaction, parseInt(args))
                    .catch(err => interaction.reply({ content: `:no_entry_sign: Invalid song number.`, ephemeral: true }));
            } else {
                interaction.reply({ content: `:no_entry_sign: Please use a number between **0** and **${queue.songs.length}**`, ephemeral: true })
            }
        } catch (err) {
            console.log(err)
        }
    },
};