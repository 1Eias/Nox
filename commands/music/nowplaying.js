const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "nowplaying",
    description: "Shows what is song that the bot is currently playing.",
    options: [],
    async execute(client, interaction) {
        try {
            if (interaction.guild.members.me.voice?.channelId && interaction.member.voice.channelId !== interaction.guild.members.me?.voice?.channelId) return interaction.reply({ content: `:no_entry_sign: You must be listening in \`${interaction.guild.members.me?.voice?.channel.name}\` to use that!`, ephemeral: true });
            if (!interaction.member.voice.channel)
                return interaction.reply({ content: ":no_entry_sign: You must join a voice channel to use that!", ephemeral: true })
            const queue = distube.getQueue(interaction)
            if (!queue) return interaction.reply({ content: `:no_entry_sign: There must be music playing to use that!`, ephemeral: true })
            const song = queue.songs[0]
            const uni = `${song.playing ? '➕ | ' : '➕ | '}`;
            const part = Math.floor((queue.currentTime / song.duration) * 30);
            let embed = new EmbedBuilder()
                .setTitle(`${song.name}`)
                .setURL(`${song.url}`)
                .setDescription(`\nCurrent Duration: \`[${queue.formattedCurrentTime}/${song.formattedDuration}]\`\n${uni}${'▇'.repeat(part) + '▇' + '—'.repeat(24 - part)}`)
                .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
                .setFooter({ text: `@ ${song.uploader.name} | Views: ${song.views} | Like: ${song.likes}` })
            interaction.reply({ embeds: [embed] })
        } catch (err) {
            console.log(err)
        }
    },
};