const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const db = require(`quick.db`)
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "repeat",
    description: "Toggles the repeat mode.",
    options: [
        {
            name: `number`,
            description: `number of sonds to skip`,
            type: 10
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
            if (0 <= Number(args) && Number(args) <= 2) {
                distube.setRepeatMode(interaction, parseInt(args))
                interaction.reply({ content: `:notes: **Repeat mode set to:** ${args.replace("0", "\`OFF\`").replace("1", "\`Repeat song\`").replace("2", "\`Repeat Queue\`")}` })
            } else {
                interaction.reply({ content: `:no_entry_sign: Please use a number between **0** and **2**   |   0: **disabled**, 1: **Repeat a song**, 2: **Repeat all the queue**`, ephemeral: true })
            }
        } catch (err) {
            console.log(err)
        }
    },
};