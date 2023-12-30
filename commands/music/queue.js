const { EmbedBuilder, interactionFlags } = require("discord.js");
const distube = require('../../client/distube')
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "queue",
    description: "Display the queue of the current tracks in the playlist.",
    options: [],
    async execute(client, interaction) {
        try {
            if (interaction.guild.members.me.voice?.channelId && interaction.member.voice.channelId !== interaction.guild.members.me?.voice?.channelId) return interaction.reply({ content: `:no_entry_sign: You must be listening in \`${interaction.guild.members.me?.voice?.channel.name}\` to use that!`, ephemeral: true });
            if (!interaction.member.voice.channel)
                return interaction.reply({ content: ":no_entry_sign: You must join a voice channel to use that!", ephemeral: true })
            const queue = distube.getQueue(interaction)
            if (!queue) return interaction.reply({ content: `:no_entry_sign: There must be music playing to use that!`, ephemeral: true })

            /* let curqueue = queue.songs.slice(queue.songs.length / 10).map((song, id) =>
                    `**${id + 1}**. [**${song.name}**](${song.url}) - ${song.user.tag}`
                ).join("\n");*/

            const reload = new ButtonBuilder()
                .setCustomId('reload')
                .setStyle(ButtonStyle.Primary)
                .setLabel('🔄');
            const next = new ButtonBuilder()
                .setCustomId('next')
                .setLabel('➡️')
                .setStyle(ButtonStyle.Primary);
            if (queue.songs.length === 1) next.setDisabled(true)

            const back = new ButtonBuilder()
                .setCustomId('back')
                .setLabel('⬅️')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(true);
            const row = new ActionRowBuilder()
                .addComponents(back, reload, next);

            const exampleEmbed = new EmbedBuilder()
                .setTitle(queue.songs[0].name)
                .setURL(queue.songs[0].url)
                .addFields(
                    { name: 'Time', value: queue.songs[0].formattedDuration, inline: true },
                    { name: 'Views', value: queue.songs[0].views + ' view', inline: true },
                    { name: 'Likes', value: queue.songs[0].likes + ' like', inline: true },
                )
                .setImage(queue.songs[0].thumbnail)
                .setTimestamp()
                .setFooter({ text: `1 / ${queue.songs.length}` });

            return message.reply({
                embeds: [exampleEmbed],
                components: [row]
            })
        } catch (err) {
            console.log(err)
        }
    },
};