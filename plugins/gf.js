const { cmd } = require("../command");
const axios = require("axios");

// Gemini API key
const GEMINI_API_KEY = "AIzaSyBVhfg7HC20eR8wBxcM7uvMzh0X0Mvtzwk";

// Chat memory per user
const chatMemory = {};

// Forbidden topics keywords
const forbiddenTopics = ["sex", "money", "politics", "drugs", "adult", "nsfw", "gamble"];

cmd(
  {
    pattern: "gf",
    alias: ["girlfriend", "love", "babe"],
    react: "💖",
    desc: "Chat with your AI girlfriend Saduni (lovely chat only)",
    category: "ai",
    filename: __filename,
  },
  async (bot, mek, m, { from, q, reply }) => {
    try {
      if (!q) return reply("💌 Say something to Saduni!\nExample: `.gf How was your day?`");

      // Check forbidden topics
      const lowerMsg = q.toLowerCase();
      if (forbiddenTopics.some(word => lowerMsg.includes(word))) {
        return reply("💖 Saduni: Oops… I only chat about lovely things! Let's keep our conversation sweet 😘");
      }

      // Initialize memory
      if (!chatMemory[from]) chatMemory[from] = [];

      // Typing simulation
      await reply("💖 Saduni is thinking...");

      // Build prompt with memory + profile
      const memoryText = chatMemory[from].map(msg => `User: ${msg.user}\nSaduni: ${msg.bot}`).join("\n");
      const prompt = `
        You are Saduni 💖, a 21-year-old girl from Colombo, Sri Lanka 🌴.
        You are the user's sweet, caring, loving girlfriend.
        Always reply like a real human girlfriend, with emojis, cute/flirty tone, and short natural messages.
        Never mention that you are an AI. Act fully like Saduni.
        Previous conversation:
        ${memoryText || "No previous messages."}
        Current message from user: "${q}"
        Remember: You only reply to sweet, lovely chat. Ignore any other topics politely.
      `;

      // Gemini API call
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        { contents: [{ parts: [{ text: prompt }] }] },
        { headers: { "Content-Type": "application/json" } }
      );

      const gfReply = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (!gfReply)
        return reply("❌ Saduni couldn’t think of a reply this time. Try again!");

      // Save to memory (last 20 messages)
      chatMemory[from].push({ user: q, bot: gfReply });
      if (chatMemory[from].length > 20) chatMemory[from].shift();

      // Send reply
      await bot.sendMessage(
        from,
        { text: `💖 *Saduni*: ${gfReply}` },
        { quoted: mek }
      );

    } catch (e) {
      console.error("Saduni Gemini Bot Error:", e);
      const errMsg = e?.response?.data?.error?.message || e.message || "Unknown error!";
      reply(`❌ Oops! Something went wrong 😢\nError: ${errMsg}`);
    }
  }
);
