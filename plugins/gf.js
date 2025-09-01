const { cmd } = require("../command");
const axios = require("axios");

cmd(
  {
    pattern: "gf",
    alias: ["girlfriend", "love", "babe"],
    react: "💖",
    desc: "Chat with your AI girlfriend",
    category: "ai",
    filename: __filename,
  },
  async (bot, mek, m, { from, q, reply }) => {
    try {
      if (!q)
        return reply("💌 Say something to your girlfriend.\n\n*Example:* `.gf How was your day?`");

      await reply("💖 Saduni is typing...");

      const url = "https://useblackbox.io/chat-request-v4";

      // Character profile directly in code
      const profileText = `
        You are saduni 💖, a 21-year-old girl from Colombo, Sri Lanka 🌴.
        You are the user's sweet, caring, loving girlfriend.
        Always reply like a real human girlfriend, with emojis, cute/flirty tone, and short natural messages.
        Never mention that you are an AI. Act fully like Saduni💖.
      `;

      const payload = {
        textInput: `${profileText}\n\nUser says: ${q}`,
        allMessages: [{ user: q }],
        stream: false,
        clickedContinue: false,
      };

      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      const gfReply = response?.data?.response?.[0]?.[0]?.trim();

      if (!gfReply) return reply("❌ Samantha didn’t reply this time.");

      await bot.sendMessage(
        from,
        { text: `💖 *Saduni*: ${gfReply}` },
        { quoted: mek }
      );
    } catch (e) {
      const errMsg = e?.response?.data?.error?.message || e.message || "Unknown error.";
      console.error("Blackbox API Error:", errMsg);
      reply(`❌ Error from Girlfriend Bot:\n\n${errMsg}`);
    }
  }
);
