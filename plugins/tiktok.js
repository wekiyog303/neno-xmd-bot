const { cmd } = require("../command");
const fetch = require("node-fetch");

// TikTok Video Downloader
cmd(
  {
    pattern: "tiktok",
    react: "🎵",
    desc: "Download TikTok video",
    category: "download",
    filename: __filename,
  },
  async (malvin, mek, m, { from, args, reply }) => {
    const url = args[0];
    if (!url || !url.includes("tiktok.com"))
      return reply("❌ *Please provide a valid TikTok video link.*");

    try {
      reply("🔎 Fetching TikTok video...");

      // Example API (you can change if needed)
      const api = `https://api.radiaa.repl.co/api/tiktok?url=${encodeURIComponent(url)}`;
      const response = await fetch(api);
      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      const { video, title } = data.result || {};

      if (!video) return reply("❌ Video not found or removed.");

      await malvin.sendMessage(
        from,
        {
          video: { url: video },
          caption: `🎵 *${title || "TikTok Video"}*\n\n_*𝐍𝐄𝐎𝐍 𝐗𝐌𝐃 𝐓𝐈𝐊𝐓𝐎𝐊 𝐃𝐖𝐎𝐍𝐋𝐎𝐃𝐄𝐑🔥🎶*_`,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error(e);
      reply(`❌ *Failed to download:* ${e.message}`);
    }
  }
);
