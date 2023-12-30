const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const { joinVoiceChannel } = require('@discordjs/voice');
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "join",
    description: "join the voice channel.",
    options: [],
    async execute(client, interaction) {
        try {
            if (interaction.guild.members.me.voice?.channelId && interaction.member.voice.channelId) return interaction.reply({ content: `:no_entry_sign: I'm there already \`${interaction.guild.members.me?.voice?.channel.name}\`` });
            if (interaction.guild.members.me.voice?.channelId && interaction.member.voice.channelId !== interaction.guild.members.me?.voice?.channelId) return interaction.reply({ content: `:no_entry_sign: You must be listening in \`${interaction.guild.members.me?.voice?.channel.name}\` to use that!`, ephemeral: true });
            let channel = interaction.member.voice.channel;
            if (!channel) return interaction.reply({ content: ":no_entry_sign: You must join a voice channel to use that!", ephemeral: true });
            distube.voices.join(channel).then(() => {
                interaction.reply({ content: `:white_check_mark: Succesfully joined \`${channel.name}\`` });
            }).catch(() => {
                interaction.reply({ content: `:no_entry_sign: Couldn't join this channel.`, ephemeral: true });
            })
        } catch (err) {
            console.log(err)
        }
    },
};