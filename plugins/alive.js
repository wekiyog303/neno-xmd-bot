const { cmd } = require("../command");

cmd(
  {
    pattern: "alive",
    react: "🩵",
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
            url: "https://files.catbox.moe/qt0fcl.jpg",
          },
          caption: `❤️𝙽𝙴𝙽𝙾 𝚇𝙼𝙳 𝚈𝙾𝚄𝚁 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿 𝙱𝙾𝚃 𝙰𝙻𝙸𝚅𝙴 𝙽𝙾𝚆🤍
  
𝗼𝗳𝗳𝗶𝗰𝗶𝗮𝗹 𝘄𝗵𝗮𝘁𝘀𝗮𝗽𝗽 𝗰𝗵𝗮𝗻𝗲𝗹 -: https://whatsapp.com/channel/0029Vb6BQQmFnSz7bmxefu40

𝗚𝗶𝘁 𝗛𝘂𝗯 𝗥𝗲𝗽𝗼 -: https://github.com/Nimeshkamihiran/neno-xmd-bot

𝗢𝘄𝗻𝗲𝗿 -: https://wa.me/94721584279?text=𝐇𝐈_𝐍𝐄𝐎𝐍_𝐗𝐌𝐃_𝐍𝐄𝐖_𝐔𝐒𝐄𝐑_𝐈_𝐍𝐄𝐄𝐃_𝐇𝐄𝐋𝐏🫡
          
*𝙸 𝙻𝙾𝚅𝙴 𝙰𝙻𝙻 𝚄𝚂𝙴𝚁𝚂 ❤️💪*  
*SHERE THIS ALIVE MSG AND SUP OURE DEVLOPERS*  
*PLZ JOIN OUR WHATSAPP GROUP*  
*🄽🄴🄽🄾 🅇🄼🄳 🅄🅂🄴🅁 🄵🅁🄴🄽🄳🄻🅈 `,
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
            url: "https://files.catbox.moe/ohzu6j.mp3",
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
