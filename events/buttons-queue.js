const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, EmbedBuilder, StringSelectMenuBuilder } = require("discord.js");
const distube = require('../client/distube')
const wait = require('node:timers/promises').setTimeout;
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction) {
        try {
            if (!interaction.isButton()) return;
            const reload = new ButtonBuilder()
                .setCustomId('reload')
                .setLabel('🔄')
                .setStyle(ButtonStyle.Primary);
            if (interaction.customId === 'next') {
                const queue = distube.getQueue(interaction)
                if (!queue) return interaction.message.edit({ content: `:no_entry_sign: There must be music playing to use that!`, embeds: [], components: [] })

                var num = Math.floor(interaction.message.embeds[0].footer.text.split('/')[0])


                if (!queue.songs[num]) {
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
                    const row2 = new ActionRowBuilder()
                        .addComponents(back, reload, next);

                    const embed = new EmbedBuilder()
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
                    interaction.reply({ content: `✓`, ephemeral: true });
                    return interaction.message.edit({
                        embeds: [embed],
                        components: [row2]
                    })
                }
                const next = new ButtonBuilder()
                    .setCustomId('next')
                    .setLabel('➡️')
                    .setStyle(ButtonStyle.Primary);
                if (queue.songs[num + 1]) next.setDisabled(false);
                else next.setDisabled(true);

                const back = new ButtonBuilder()
                    .setCustomId('back')
                    .setLabel('⬅️')
                    .setStyle(ButtonStyle.Primary)

                if (queue.songs[num - 1]) back.setDisabled(false)
                else back.setDisabled(true)
                const row = new ActionRowBuilder()
                    .addComponents(back, reload, next);

                const exampleEmbed = new EmbedBuilder()
                    .setTitle(queue.songs[0 + num].name)
                    .setURL(queue.songs[0 + num].url)
                    .addFields(
                        { name: 'Time', value: queue.songs[0 + num].formattedDuration, inline: true },
                        { name: 'Views', value: queue.songs[0 + num].views + ' view', inline: true },
                        { name: 'Likes', value: queue.songs[0 + num].likes + ' like', inline: true },
                    )
                    .setImage(queue.songs[0 + num].thumbnail)
                    .setTimestamp()
                    .setFooter({ text: `${1 + num} / ${queue.songs.length}` });
                interaction.reply({ content: `✓`, ephemeral: true });
                return interaction.message.edit({
                    embeds: [exampleEmbed],
                    components: [row]
                })


            } else if (interaction.customId === 'back') {
                const queue = distube.getQueue(interaction)
                if (!queue) return interaction.message.edit({ content: `:no_entry_sign: There must be music playing to use that!`, embeds: [], components: [] })

                var num = Math.floor(interaction.message.embeds[0].footer.text.split('/')[0])


                if (!queue.songs[num - 2]) {
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
                    const row2 = new ActionRowBuilder()
                        .addComponents(back, reload, next);

                    const embed = new EmbedBuilder()
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
                    interaction.reply({ content: `✓`, ephemeral: true });
                    return interaction.message.edit({
                        embeds: [embed],
                        components: [row2]
                    })
                }
                const next = new ButtonBuilder()
                    .setCustomId('next')
                    .setLabel('➡️')
                    .setStyle(ButtonStyle.Primary);
                if (queue.songs[num - 1]) next.setDisabled(false);
                else next.setDisabled(true);

                const back = new ButtonBuilder()
                    .setCustomId('back')
                    .setLabel('⬅️')
                    .setStyle(ButtonStyle.Primary)

                if (queue.songs[num - 3]) back.setDisabled(false)
                else back.setDisabled(true)
                const row = new ActionRowBuilder()
                    .addComponents(back, reload, next);

                const exampleEmbed = new EmbedBuilder()
                    .setTitle(queue.songs[num - 2].name)
                    .setURL(queue.songs[num - 2].url)
                    .addFields(
                        { name: 'Time', value: queue.songs[num - 2].formattedDuration, inline: true },
                        { name: 'Views', value: queue.songs[num - 2].views + ' view', inline: true },
                        { name: 'Likes', value: queue.songs[num - 2].likes + ' like', inline: true },
                    )
                    .setImage(queue.songs[num - 2].thumbnail)
                    .setTimestamp()
                    .setFooter({ text: `${num - 1} / ${queue.songs.length}` });
                interaction.reply({ content: `✓`, ephemeral: true });
                return interaction.message.edit({
                    embeds: [exampleEmbed],
                    components: [row]
                })

            } else if (interaction.customId === 'reload') {
                const queue = distube.getQueue(interaction)
                if (!queue) return interaction.message.edit({ content: `:no_entry_sign: There must be music playing to use that!`, embeds: [], components: [] })
                var num = Math.floor(interaction.message.embeds[0].footer.text.split('/')[0])
                if (!queue.songs[num - 1]) {

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
                    const row2 = new ActionRowBuilder()
                        .addComponents(back, reload, next);

                    const embed = new EmbedBuilder()
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
                    interaction.reply({ content: `✓`, ephemeral: true });
                    return interaction.message.edit({
                        embeds: [embed],
                        components: [row2]
                    })
                }

                const next = new ButtonBuilder()
                    .setCustomId('next')
                    .setLabel('➡️')
                    .setStyle(ButtonStyle.Primary);
                if (queue.songs[num]) next.setDisabled(false);
                else next.setDisabled(true);

                const back = new ButtonBuilder()
                    .setCustomId('back')
                    .setLabel('⬅️')
                    .setStyle(ButtonStyle.Primary)

                if (queue.songs[num - 2]) back.setDisabled(false)
                else back.setDisabled(true)
                const row = new ActionRowBuilder()
                    .addComponents(back, reload, next);

                const exampleEmbed = new EmbedBuilder()
                    .setTitle(queue.songs[num - 1].name)
                    .setURL(queue.songs[num - 1].url)
                    .addFields(
                        { name: 'Time', value: queue.songs[num - 1].formattedDuration, inline: true },
                        { name: 'Views', value: queue.songs[num - 1].views + ' view', inline: true },
                        { name: 'Likes', value: queue.songs[num - 1].likes + ' like', inline: true },
                    )
                    .setImage(queue.songs[num - 1].thumbnail)
                    .setTimestamp()
                    .setFooter({ text: `${num} / ${queue.songs.length}` });
                interaction.reply({ content: `✓`, ephemeral: true });
                return interaction.message.edit({
                    embeds: [exampleEmbed],
                    components: [row]
                })
            }
        } catch (err) {
            console.log(err);
            utilites.logger(err)
        }
    }
}