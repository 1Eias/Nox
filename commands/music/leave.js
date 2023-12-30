const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const { joinVoiceChannel } = require('@discordjs/voice');
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "leave",
    description: "leave the voice channel.",
    options: [],
    async execute(client, interaction) {
        try {
            if (interaction.guild.members.me.voice?.channelId !== interaction.member.voice.channelId) return interaction.reply({ content: `:no_entry_sign: I'm not there already \`${interaction.member.voice.channel.name}\`` });
            if (interaction.guild.members.me.voice?.channelId && interaction.member.voice.channelId !== interaction.guild.members.me?.voice?.channelId) return interaction.reply({ content: `:no_entry_sign: You must be listening in \`${interaction.guild.members.me?.voice?.channel.name}\` to use that!`, ephemeral: true });
            let channel = interaction.member.voice.channel;
            if (!channel) return interaction.reply({ content: ":no_entry_sign: You must join a voice channel to use that!", ephemeral: true });
            distube.voices.leave(interaction.guild)
            return interaction.reply({ content: `:white_check_mark: Succesfully leave \`${channel.name}\`` });
        } catch (err) {
            console.log(err)
        }
    },
};