const { cmd } = require('../command');
const { ytsearch, ytmp3, ytmp4 } = require('@dark-yasiya/yt-dl.js');

//==================== YTV (MP4) ====================//
cmd({
    pattern: "mp4",
    alias: ["video", "ytv"],
    react: "🎥",
    desc: "Download YouTube video",
    category: "main",
    use: '.video < Yt url or Name >',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("*Please provide a YouTube URL or Video Name.*");

        const yt = await ytsearch(q);
        if (!yt.results.length) return reply("No results found!");

        const yts = yt.results[0];
        const videoData = await ytmp4(yts.url); // Directly get MP4 data

        if (!videoData || !videoData.video || !videoData.video.url) {
            return reply("Failed to fetch the video. Try again later.");
        }

        let ytmsg = `╔═══〔 *𓆩𝐍𝐄𝐎𝐍 𝐗𝐌𝐃 ᪳𓆪* 〕═══❒
║ *❍ VIDEO DOWNLOADER*
╚══════════════════❒
⿻ *Title:* ${yts.title}
⿻ *Duration:* ${yts.timestamp}
⿻ *Views:* ${yts.views}
⿻ *Author:* ${yts.author.name}
⿻ *Link:* ${yts.url}
> *Powered by 𝙽𝙸𝙼𝙴𝚂𝙷𝙺𝙰 𝙼𝙸𝙷𝙸𝚁𝙰𝙽*`;

        // Send thumbnail & details
        await conn.sendMessage(from, { image: { url: yts.image }, caption: ytmsg }, { quoted: mek });

        // Send video
        await conn.sendMessage(from, { video: { url: videoData.video.url }, mimetype: "video/mp4" }, { quoted: mek });

        // Send as document
        await conn.sendMessage(from, {
            document: { url: videoData.video.url },
            mimetype: "video/mp4",
            fileName: `${yts.title}.mp4`,
            caption: `*${yts.title}*\n> *© Powered by 𝙽𝙸𝙼𝙴𝚂𝙷𝙺𝙰 𝙼𝙸𝙷𝙸𝚁𝙰𝙽 🎐*`
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply("An error occurred while processing your request.");
    }
});

//==================== YTA (MP3) ====================//
cmd({
    pattern: "mp3",
    alias: ["yta", "play"],
    react: "🎶",
    desc: "Download YouTube song",
    category: "main",
    use: '.song < Yt url or Name >',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("*Please provide a YouTube URL or Song Name.*");

        const yt = await ytsearch(q);
        if (!yt.results.length) return reply("No results found!");

        const yts = yt.results[0];
        const audioData = await ytmp3(yts.url); // Directly get MP3 data

        if (!audioData || !audioData.audio || !audioData.audio.url) {
            return reply("Failed to fetch the audio. Try again later.");
        }

        let ytmsg = `╔═══〔 *𓆩𝐍𝐄𝐎𝐍 𝐗𝐌𝐃𓆪* 〕═══❒
║ *❍ AUDIO DOWNLOADER*
╚══════════════════❒
⿻ *Title:* ${yts.title}
⿻ *Duration:* ${yts.timestamp}
⿻ *Views:* ${yts.views}
⿻ *Author:* ${yts.author.name}
⿻ *Link:* ${yts.url}
> *Powered by 𝙽𝙸𝙼𝙴𝚂𝙷𝙺𝙰 𝙼𝙸𝙷𝙸𝚁𝙰𝙽 🍉*`;

        // Send thumbnail & details
        await conn.sendMessage(from, { image: { url: yts.image }, caption: ytmsg }, { quoted: mek });

        // Send audio
        await conn.sendMessage(from, { audio: { url: audioData.audio.url }, mimetype: "audio/mpeg" }, { quoted: mek });

        // Send as document
        await conn.sendMessage(from, {
            document: { url: audioData.audio.url },
            mimetype: "audio/mpeg",
            fileName: `${yts.title}.mp3`,
            caption: `> *© Powered by 𝙽𝙸𝙼𝙴𝚂𝙷𝙺𝙰 𝙼𝙸𝙷𝙸𝚁𝙰𝙽 🎐*`
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply("An error occurred while processing your request.");
    }
});
