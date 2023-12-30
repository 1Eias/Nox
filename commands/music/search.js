const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, EmbedBuilder, StringSelectMenuBuilder } = require("discord.js");
const distube = require('../../client/distube')
const ytsr = require("@distube/ytsr")
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "search",
    description: "Search song and play music.",
    options: [
        {
            name: "song",
            type: 3,
            description: "The song to play.",
            required: true
        }
    ],
    async execute(client, interaction, args) {
        try {
            const string = interaction.options.getString("song");

            await interaction.reply(`:watch: **Searching...** (\`${string}\`)`);

            const message = await interaction.fetchReply();

            if (interaction.guild.members.me.voice?.channelId && interaction.member.voice.channelId !== interaction.guild.members.me?.voice?.channelId) return interaction.reply({ content: `:no_entry_sign: You must be listening in \`${interaction.guild.members.me?.voice?.channel.name}\` to use that!`, ephemeral: true });
            let channel = interaction.member.voice.channel;
            if (!channel) return interaction.reply({ content: ":no_entry_sign: You must join a voice channel to use that!", ephemeral: true });

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("one")
                        .setEmoji("1️⃣")
                        .setStyle(ButtonStyle.Secondary)
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("two")
                        .setEmoji("2️⃣")
                        .setStyle(ButtonStyle.Secondary)
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("three")
                        .setEmoji("3️⃣")
                        .setStyle(ButtonStyle.Secondary)
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("four")
                        .setEmoji("4️⃣")
                        .setStyle(ButtonStyle.Secondary)
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("five")
                        .setEmoji("5️⃣")
                        .setStyle(ButtonStyle.Secondary)
                )

            const options = {
                member: interaction.member,
                textChannel: interaction.channel,
                interaction,
            }
            const res = await ytsr(string, { safeSearch: true, limit: 5 });

            let index = 1;
            const result = res.items.slice(0, 5).map(x => `**${index++}. [${x.name}](${x.url})**`).join("\n")
            const embed = new EmbedBuilder()
                .setAuthor({ name: `Song Selection`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .setDescription(result)
                .setFooter({ text: `Please response in 30s` })

            await message.edit({ content: " ", embeds: [embed], components: [row] });
            const filter = i => i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000, max: 1 });

            collector.on('collect', async (interaction) => {
                const id = interaction.customId;
                if (id === "one") {
                    await message.delete({ embeds: [], components: [] });
                    await distube.play(interaction.member.voice.channel, res.items[0].url, options);
                } else if (id === "two") {
                    await message.delete({ embeds: [], components: [] });
                    await distube.play(interaction.member.voice.channel, res.items[1].url, options);
                } else if (id === "three") {
                    await message.delete({ embeds: [], components: [] });
                    await distube.play(interaction.member.voice.channel, res.items[2].url, options);
                } else if (id === "four") {
                    await message.delete({ embeds: [], components: [] });
                    await distube.play(interaction.member.voice.channel, res.items[3].url, options);
                } else if (id === "five") {
                    await message.delete({ embeds: [], components: [] });
                    await distube.play(interaction.member.voice.channel, res.items[4].url, options);
                }
            });

            collector.on('end', async (collected, reason) => {
                if (reason === "time") {
                    msg.delete({ content: ``, embeds: [], components: [] });
                }
            });
        } catch (err) {
            console.log(err)
        }
    }
}