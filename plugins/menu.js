const { cmd, commands } = require("../command");
const config = require('../config');
const os = require('os'); 
const moment = require('moment'); 

// ============ MENU COMMAND ============
cmd(
  {
    pattern: "menu",
    alias: ["getmenu"],
    react: "😏",
    desc: "Get bot command list",
    category: "main",
    filename: __filename,
  },
  async (malvin, mek, m, { from, pushname, sender, reply }) => {
    try {
      const uptime = moment.duration(process.uptime() * 1000).humanize();
      const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + " GB";
      const usedRam = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + " MB";
      const owner = config.OWNER_NUMBER || "Unknown";
      const user = pushname || sender.split("@")[0];

      let menu = {
        main: "",
        download: "",
        group: "",
        owner: "",
        convert: "",
        search: "",
      };

      for (let i = 0; i < commands.length; i++) {
        const oneCmd = commands[i];
        if (oneCmd.pattern && !oneCmd.dontAddCommandList) {
          const line = `┃   ▪️ ${config.PREFIX}${oneCmd.pattern}\n`;
          if (menu[oneCmd.category]) {
            menu[oneCmd.category] += line;
          }
        }
      }

      const madeMenu = `𝐘𝐨𝐨  ${user}
*⟦✦⟧  Wᴇʟᴄᴏᴍᴇ Tᴏ 𝗡𝗘𝗢𝗡 𝗫𝗠𝗗  ⟦✦⟧

╔═══《 🛠 STATUS DETAILS 》═══╗
║ ⚡  *Bot*     : 𝗡𝗘𝗢𝗡 𝗫𝗠𝗗
║ 👤  *User*    : ${user}
║ 📱  *Owner*   : NIMESHKA
║ ⏳  *Uptime*  : ${uptime}
║ 💽  *RAM*     : ${usedRam} / ${totalRam}
║ 🔹  *Prefix*  : ${config.PREFIX}
╚════════════════════════════╝


╔═══《 📜 MENU OPTIONS 》═══╗
║ ⚙️  *MAIN COMMANDS*
║    ✧ .alive
║    ✧ .menu
║    ✧ .ai <text>
║    ✧ .dev
║    ► .about
║
║ 📥  *DOWNLOAD COMMANDS*
║    ✧ .song <text>
║    ✧ .video <text>
║    ✧ .fb <link>
║    ✧ .tiktok <link>
║    ◈ .ytdl <url>
║
║ 👑  *OWNER COMMANDS*
║    ✧ .block
║    ✧ .join
║    ✧ .add
║    ✧ .kick
║    ✧ .left
║    ✧ .mute
║    ✧ .unmute
║    ✧ .demote
║    ✧ .promote
║    ◈ .shutdown
║    ◈ .gjid
║    ◈ .jid
║    ◈ .broadcast
║    ◈ .clearchats
║    ◆ .getdp
║    ◈ .update
║    ◈ .settings
║    ◈ .groupinfo
║    ◈ .gmdp
║
║ 🤣  *FUN COMMANDS*
║    ✧ .joke
║    ✧ .fact
║    ✧ .flirt
║    ✧ .truth
║    ✧ .dare
║    ✧ .pickupline
║    ✧ .char
║    ✧ .spam
║    ✧ .rm
║
║ 🩵 *ANIME COMMANDS*
║    ◈ .loli
║    ◈ .anime
║    ◈ .animegirl
║
║ ❤️‍🔥 *OUTHER COMMANDS*
║    ◈ .play2
║    ◈ .drama
║    ◈ .movie 
║    ◈ .dog
║    ◆ .save 
║
║ 🔁  *CONVERT COMMANDS*
║    ✧ .sticker <reply img>
║    ✧ .img <reply sticker>
║    ✧ .tr <lang> <text>
║    ✧ .tts <text>
║
║ 💖 *IMAGE COMMAND*
║    ◈ .fluxai <prompt>
║ 
║ ☠️  *STATUS SAVE COMMAND*
║     [reply status with save text]
║
║ 🆔  *CHANNEL JID TOOLS*
║    ◈ .channeljid <link>
║
╚════════════════════════════╝    

⟦⚡⟧  *POWERED BY 𝗡𝗜𝗠𝗘𝗦𝗛𝗞𝗔 𝗠𝗜𝗛𝗜𝗥𝗔𝗡*  ⟦⚡⟧*
`;

      await malvin.sendMessage(
        from,
        {
          image: {
            url: "https://files.catbox.moe/43e40k.jpg",
          },
          caption: madeMenu,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("❌ Menu error:\n" + e.message);
    }
  }
);

// ============ CHANNEL JID EXTRACT ============
cmd(
  {
    pattern: "channeljid",
    desc: "Extract JID from WhatsApp channel link",
    category: "tools",
    filename: __filename,
  },
  async (malvin, mek, m, { args, reply }) => {
    try {
      if (!args[0]) return reply("❌ Please give me a channel link.\n\nExample: .channeljid https://whatsapp.com/channel/0029Vb6BQQmFnSz7bmxefu40");

      const link = args[0];
      if (!link.includes("whatsapp.com/channel/")) return reply("❌ Invalid link, please provide a valid WhatsApp channel link.");

      // extract part after /channel/
      const id = link.split("/channel/")[1];
      const jid = `${id}@newsletter`;

      reply(`🆔 Extracted ID:\n\`\`\`${jid}\`\`\``);
    } catch (e) {
      console.error(e);
      reply("❌ Channel JID extract error:\n" + e.message);
    }
  }
);
