// plugins/imageurl.js
const { cmd } = require("../command");
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const axios = require("axios");
const FormData = require("form-data"); // මේක අනිවාර්යයි

cmd(
  {
    pattern: "imageurl",
    desc: "Upload image to get its URL",
    category: "tools",
    react: "📸",
    filename: __filename,
    fromMe: false,
  },
  async (malvin, mek, m, { quoted }) => {
    // malvin = bot instance
    // mek = message info
    // m = current message
    // quoted = replied message

    // Define a helper to reply using malvin.sendMessage
    const reply = async (text) => {
      await malvin.sendMessage(m.key.remoteJid, { text }, { quoted: m });
    };

    try {
      if (!quoted || !quoted.message.imageMessage) {
        return await reply("❌ කරුණාකර පින්තූරයකට පිළිතුරු දී මේ command එක භාවිතා කරන්න.");
      }

      // Download image buffer
      const stream = await downloadContentFromMessage(quoted.message.imageMessage, "image");
      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }

      // Prepare form-data to upload
      const form = new FormData();
      form.append("image", buffer, { filename: "image.jpg", contentType: "image/jpeg" });

      // Upload to imgbb
      const apiKey = "87aec8ffa13473e9eb6cbfd0ffd309ba"; // ඔයාගේ API key
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        form,
        { headers: form.getHeaders() }
      );

      if (response.data && response.data.data && response.data.data.url) {
        await reply(`ඔබගේ පින්තූර URL එක මෙන්න:\n${response.data.data.url}`);
      } else {
        await reply("❌ පින්තූරය upload කිරීම අසාර්ථකයි.");
      }
    } catch (e) {
      console.error("Image upload error:", e);
      await reply("❌ පින්තූරය process කිරීමේදී දෝෂයක් සිදුවිය.");
    }
  }
);
