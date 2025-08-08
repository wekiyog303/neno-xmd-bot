const { cmd } = require("../command");

cmd(
  {
    pattern: "alive",
    react: "🤖",
    desc: "Show bot status",
    category: "main",
    filename: __filename,
    fromMe: false,
  },
  async (malvin, mek, m, { reply }) => {
    try {
      const from = mek.key.remoteJid;

      await malvin.sendPresenceUpdate("recording", from);

      // Alive Image & Caption
      await malvin.sendMessage(
        from,
        {
          image: {
            url: "https://files.catbox.moe/en1jzg.jpg",
          },
          caption: `I♥A♥M♥ 𝐀𝐋𝐈𝐕𝐄 𝐍𝐎𝐖 🫡  
  
𝗼𝗳𝗳𝗶𝗰𝗶𝗮𝗹 𝘄𝗵𝗮𝘁𝘀𝗮𝗽𝗽 𝗰𝗵𝗮𝗻𝗲𝗹 -: https://whatsapp.com/channel/0029Vb6BQQmFnSz7bmxefu40

𝗚𝗶𝘁 𝗛𝘂𝗯 𝗥𝗲𝗽𝗼 -: 𝐂𝐎𝐌𝐈𝐍𝐆 𝐒𝐎𝐎𝐍 !!😉

𝗢𝘄𝗻𝗲𝗿 -: https://wa.me/94721584279?text=𝐇𝐈_𝐍𝐄𝐎𝐍_𝐗𝐌𝐃_𝐍𝐄𝐖_𝐔𝐒𝐄𝐑_𝐈_𝐍𝐄𝐄𝐃_𝐇𝐄𝐋𝐏🫡
          
*We are not responsible for any*  
*WhatsApp bans that may occur due to*  
*the usage of this bot. Use it wisely*  
*and at your own risk* ⚠️`,
        },
        { quoted: mek }
      );

      // Delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Voice Message
      await malvin.sendMessage(
        from,
        {
          audio: {
            url: "https://files.catbox.moe/wz8rh7.mp3",
          },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.error("❌ Error in .alive command:", e);
      reply("❌ Error while sending alive message!");
    }
          })
