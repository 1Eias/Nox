const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const wait = require('node:timers/promises').setTimeout;
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "play",
    description: "Add a song to queue and plays it.",
    options: [
        {
            name: `song`,
            description: `the song to play.`,
            type: 3,//string 12
            required: true
        }
    ],
    async execute(client, interaction) {
        let args = interaction.options.getString('song')
        const songTitle = args
        try {
            if (interaction.guild.members.me.voice?.channelId && interaction.member.voice.channelId !== interaction.guild.members.me?.voice?.channelId) return interaction.reply({ content: `:no_entry_sign: You must be listening in \`${interaction.guild.members.me?.voice?.channel.name}\` to use that!`, ephemeral: true });
            if (!interaction.member.voice.channel)
                return interaction.reply({ content: ":no_entry_sign: You must join a voice channel to use that!", ephemeral: true })
            let player = args//.slice(0).join(' ')
            if (!player) return interaction.reply({ content: `:no_entry_sign: You should type song name or url.`, ephemeral: true })

            const queue = distube.getQueue(interaction)
            interaction.reply({ content: `:watch: Searching ... (\`${player}\`)` })
            await wait(3000);
            await interaction.deleteReply()
            
            const voiceChannel = interaction.member?.voice?.channel;
            if (voiceChannel) {
                distube.play(voiceChannel, player, {
                    interaction,
                    textChannel: interaction.channel,
                    member: interaction.member,
                });
            }
        } catch (err) {
            console.log(err)
        }
    },
};