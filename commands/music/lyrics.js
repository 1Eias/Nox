const { EmbedBuilder } = require("discord.js");
const { escapeMarkdown } = require("discord.js");
const distube = require('../../client/distube')
const lyricsFinder = require("@jeve/lyrics-finder");
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "lyrics",
    description: "Display lyrics of a song",
    async execute(client, interaction) {
        try {
            if (interaction.guild.members.me.voice?.channelId && interaction.member.voice.channelId !== interaction.guild.members.me?.voice?.channelId) return interaction.reply({ content: `:no_entry_sign: You must be listening in \`${interaction.guild.members.me?.voice?.channel.name}\` to use that!`, ephemeral: true });
            if (!interaction.member.voice.channel)
                return interaction.reply({ content: ":no_entry_sign: You must join a voice channel to use that!", ephemeral: true })
            const queue = distube.getQueue(interaction)
            if (!queue) return interaction.reply({ content: `:no_entry_sign: There must be music playing to use that!`, ephemeral: true })
            const song = queue.songs[0]
            let data;
            try {
                data = await lyricsFinder.LyricsFinder(`${song.name}`)
            } catch {
                data = false
            }
            if (!data || !data?.trim) return interaction.reply({ content: `:rolling_eyes: No lyrics found for **${song.name}**` })
            let embeds0 = [];
            let embeds1 = [];
            let embeds2 = [];
            let embeds3 = [];
            let embeds4 = [];
            let embeds5 = [];
            let embeds6 = [];
            let embeds7 = [];
            let embeds8 = [];
            let embeds9 = [];
            let embeds10 = [];
            if (data.length >= 2048) {
                //const interactions = escapeMarkdown(data, {
                const interactions = splitinteraction(data, {
                    maxLength: 4000,
                    char: '\n',
                });
                for (const interaction of interactions) {
                    let embed = new EmbedBuilder()
                        .setDescription(`${interaction}`)
                    if (!embeds0.length) embed.setTitle(`Lyrics for "${song.name}"`);
                    if (embeds0.length < 10) { embeds0.push(embed) }
                    else if (embeds0.length >= 10) { embeds1.push(embed) }
                    else if (embeds0.length >= 10 && embeds1.length >= 10) { embeds2.push(embed) }
                    else if (embeds0.length >= 10 && embeds1.length >= 10 && embeds2.length >= 10) { embeds3.push(embed) }
                    else if (embeds0.length >= 10 && embeds1.length >= 10 && embeds2.length >= 10 && embeds3.length >= 10) { embeds4.push(embed) }
                    else if (embeds0.length >= 10 && embeds1.length >= 10 && embeds2.length >= 10 && embeds3.length >= 10 && embeds4.length >= 10) { embeds5.push(embed) }
                    else if (embeds0.length >= 10 && embeds1.length >= 10 && embeds2.length >= 10 && embeds3.length >= 10 && embeds4.length >= 10 && embeds5.length >= 10) { embeds6.push(embed) }
                    else if (embeds0.length >= 10 && embeds1.length >= 10 && embeds2.length >= 10 && embeds3.length >= 10 && embeds4.length >= 10 && embeds5.length >= 10 && embeds6.length >= 10) { embeds7.push(embed) }
                    else if (embeds0.length >= 10 && embeds1.length >= 10 && embeds2.length >= 10 && embeds3.length >= 10 && embeds4.length >= 10 && embeds5.length >= 10 && embeds6.length >= 10 && embeds7.length >= 10) { embeds8.push(embed) }
                    else if (embeds0.length >= 10 && embeds1.length >= 10 && embeds2.length >= 10 && embeds3.length >= 10 && embeds4.length >= 10 && embeds5.length >= 10 && embeds6.length >= 10 && embeds7.length >= 10 && embeds8.length >= 10) { embeds9.push(embed) }
                    else if (embeds0.length >= 10 && embeds1.length >= 10 && embeds2.length >= 10 && embeds3.length >= 10 && embeds4.length >= 10 && embeds5.length >= 10 && embeds6.length >= 10 && embeds7.length >= 10 && embeds8.length >= 10 && embeds9.length >= 10) { embeds10.push(embed) }
                    else if (embeds0.length >= 10 && embeds1.length >= 10 && embeds2.length >= 10 && embeds3.length >= 10 && embeds4.length >= 10 && embeds5.length >= 10 && embeds6.length >= 10 && embeds7.length >= 10 && embeds8.length >= 10 && embeds9.length >= 10 && embeds10.length >= 10) { }
                }
            }
            if (embeds0.length) { interaction.reply({ embeds: embeds0 }); }
            if (embeds1.length) { interaction.reply({ embeds: embeds1 }); }
            if (embeds2.length) { interaction.reply({ embeds: embeds2 }); }
            if (embeds3.length) { interaction.reply({ embeds: embeds3 }); }
            if (embeds4.length) { interaction.reply({ embeds: embeds4 }); }
            if (embeds5.length) { interaction.reply({ embeds: embeds5 }); }
            if (embeds6.length) { interaction.reply({ embeds: embeds6 }); }
            if (embeds7.length) { interaction.reply({ embeds: embeds7 }); }
            if (embeds8.length) { interaction.reply({ embeds: embeds8 }); }
            if (embeds9.length) { interaction.reply({ embeds: embeds9 }); }
            if (embeds10.length) { interaction.reply({ embeds: embeds10 }); }
        } catch (err) {
            console.log(err)
        }
    },
};

function verifyString(
    data,
    error = Error,
    errorinteraction = `Expected a string, got ${data} instead.`,
    allowEmpty = true,
) {
    if (typeof data !== 'string') throw new error(errorinteraction);
    if (!allowEmpty && data.length === 0) throw new error(errorinteraction);
    return data;
}
function splitinteraction(text, { maxLength = 1024, char = '\n', prepend = '', append = '' }) {
    text = verifyString(text);
    //////////////////////////////
    if (text.length <= maxLength) return [text];
    let splitText = [text];
    if (Array.isArray(char)) {
        while (char.length > 0 && splitText.some(elem => elem.length > maxLength)) {
            const currentChar = char.shift();
            if (currentChar instanceof RegExp) {
                splitText = splitText.flatMap(chunk => chunk.match(currentChar));
            } else {
                splitText = splitText.flatMap(chunk => chunk.split(currentChar));
            }
        }
    } else {
        splitText = text.split(char);
    }
    if (splitText.some(elem => elem.length > maxLength)) throw new RangeError('SPLIT_MAX_LEN');
    const interactions = [];
    let msg = '';
    for (const chunk of splitText) {
        if (msg && (msg + char + chunk + append).length > maxLength) {
            interactions.push(msg + append);
            msg = prepend;
        }
        msg += (msg && msg !== prepend ? char : '') + chunk;
    }
    return interactions.concat(msg).filter(m => m);
}