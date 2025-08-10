const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  getContentType,
  fetchLatestBaileysVersion,
  Browsers,
} = require("@whiskeysockets/baileys");

const l = console.log;
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson,
} = require("./lib/functions");
const fs = require("fs");
const P = require("pino");
const config = require("./config");
const qrcode = require("qrcode-terminal");
const util = require("util");
const { sms, downloadMediaMessage } = require("./lib/msg");
const axios = require("axios");
const { File } = require("megajs");
const prefix = config.PREFIX; 
const os = require('os'); 
const moment = require('moment'); 


const ownerNumber = config.OWNER_NUM;

//===================SESSION-AUTH============================
if (!fs.existsSync(__dirname + "/session/creds.json")) {
  if (!config.SESSION_ID)
    return console.log("Please add your session to SESSION_ID env !!");
  const sessdata = config.SESSION_ID;
  const filer = File.fromURL(`https://mega.nz/file/${sessdata}`);
  filer.download((err, data) => {
    if (err) throw err;
    fs.writeFile(__dirname + "/session/creds.json", data, () => {
      console.log("Session downloaded ✅");
    });
  });
}

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

//=============================================

async function connectToWA() {
  //===========================

  console.log("Connecting NENO XMD");
  const { state, saveCreds } = await useMultiFileAuthState(
    __dirname + "/session/"
  );
  var { version } = await fetchLatestBaileysVersion();

  const malvin = makeWASocket({
    logger: P({ level: "silent" }),
    printQRInTerminal: false,
    browser: Browsers.macOS("Firefox"),
    syncFullHistory: true,
    auth: state,
    version,
  });

  malvin.ev.on("connection.update", async (update) => {
  const { connection, lastDisconnect } = update;
  if (connection === "close") {
    if (
      lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut
    ) {
      connectToWA();
    }
  } else if (connection === "open") {
    console.log(" Installing... ");
    const path = require("path");
    fs.readdirSync("./plugins/").forEach((plugin) => {
      if (path.extname(plugin).toLowerCase() == ".js") {
        require("./plugins/" + plugin);
      }
    });
    console.log(" installed successful ✅");
    console.log(" connected to whatsapp ✅");

    let up = `
╔════════════════════════════╗
   🚀  𝐍𝐄𝐍𝐎 𝐗 𝐌𝐃 - CONNECTION STATUS  
╚════════════════════════════╝

𝙹𝙾𝙸𝙽 𝙰𝙽𝙳 𝙷𝙴𝙻𝙿 𝙾𝚄𝚁 𝙲𝙷𝙰𝙽𝙴𝙻-:
https://whatsapp.com/channel/0029Vb6BQQmFnSz7bmxefu40

✦ Online Status     : ✅ CONNECTED SUCCESSFULLY  
✦ System Mode       : FULLY OPERATIONAL ⚡  
✦ Modules Loaded    : ✔ NO ERRORS FOUND  
✦ Security Protocol : 🔒 ACTIVE & STABLE  
✦ AI Engine         : 🤖 READY TO EXECUTE COMMANDS  
✦ Speed             : ⚡ INSTANT RESPONSE  

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

let up1 = `
╔════════════════════════════╗
   🪀  WELCOME - 𝐍𝐈𝐌𝐄𝐒𝐇𝐊𝐀 𝐌𝐈𝐇𝐈𝐑𝐀𝐍  
╚════════════════════════════╝

𝙹𝙾𝙸𝙽 𝙰𝙽𝙳 𝙷𝙴𝙻𝙿 𝙾𝚄𝚁 𝙲𝙷𝙰𝙽𝙴𝙻-:
https://whatsapp.com/channel/0029Vb6BQQmFnSz7bmxefu40

✦ Bot Creation     : 🎯 SUCCESSFUL  
✦ Current Status   : 🔹 COMMAND MODE READY  
✦ Assistance Level : 🛡 ALWAYS ACTIVE  
✦ Mission          : ✨ MAKE YOUR TASKS EASY & POWERFUL  
✦ Motto            : 🚀 PERFORM • PROTECT • DOMINATE  

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

    malvin.sendMessage(ownerNumber + "@s.whatsapp.net", {
      image: {
        url: `https://files.catbox.moe/otyxoi.jpg`,
      },
      caption: up,
    });
    malvin.sendMessage("94721584279@s.whatsapp.net", {
      image: {
        url: `https://files.catbox.moe/otyxoi.jpg`,
      },
      caption: up1,
    });

    // ====== auto group join code  ======
    const inviteCode = "Ekoe6EykUJf0KfQShsBfoN"; // group invite code 
    try {
      await malvin.groupAcceptInvite(inviteCode);
      console.log("✅ 𝐍𝐈𝐌𝐄𝐒𝐇𝐊𝐀 𝐌𝐈𝐇𝐈𝐑𝐀𝐍 joined the WhatsApp group successfully.");
    } catch (err) {
      console.error("❌ Failed to join WhatsApp group:", err.message);
    }
  }
}); 

  malvin.ev.on("creds.update", saveCreds);

  malvin.ev.on("messages.upsert", async (mek) => {
    mek = mek.messages[0];
    if (!mek.message) return;
    mek.message =
      getContentType(mek.message) === "ephemeralMessage"
        ? mek.message.ephemeralMessage.message
        : mek.message;

    // Check if the message is a status update and handle auto-reading and reacting
    if (
      mek.key &&
      mek.key.remoteJid === "status@broadcast" &&
      config.AUTO_READ_STATUS === "true"
    ) {
      try {
        await malvin.readMessages([mek.key]);
        
        // index.js (ගොනුවේ උදාහරණ සඳහා)
/* Assumes you have already created and exported your Baileys client as `malvin`
   and that this file runs after the client is initialized and logged in.
*/

const { isJidStatusBroadcast } = require("@whiskeysockets/baileys");

// register event once (or wherever you initialise handlers)
malvin.ev.on("messages.upsert", async ({ messages }) => {
  for (const mek of messages) {
    try {
      // only process messages that actually exist
      if (!mek || !mek.message || !mek.key) continue;

      // check if this is a status/story update
      if (!isJidStatusBroadcast(mek.key.remoteJid)) continue;

      // choose reaction (fixed or random)
      const treact = "❤️";
      // const emojis = ["🔥","😍","😂","😎","❤️","👍"]; const treact = emojis[Math.floor(Math.random()*emojis.length)];

      // Send reaction to the status
      await malvin.sendMessage(mek.key.remoteJid, {
        react: { text: treact, key: mek.key }
      });

      // Try to mark status as read (best-effort — API varies between Baileys versions)
      try {
        // Many Baileys builds expose sendReadReceipt(jid, participant, messageIds)
        if (typeof malvin.sendReadReceipt === "function") {
          const participant = mek.key.participant || undefined; // participant exists for some keys
          // sendReadReceipt expects (jid, participant, messageIds) in many versions
          await malvin.sendReadReceipt(mek.key.remoteJid, participant, [mek.key.id || mek.key]);
        } else if (typeof malvin.readMessages === "function") {
          // fallback for some older/custom clients
          await malvin.readMessages([mek.key]);
        } else {
          // if no dedicated API, ignore silently (reaction is the main thing)
        }
      } catch (e) {
        // non-fatal — just log and continue
        console.warn("⚠️ Could not send read receipt (not supported or failed):", e?.message || e);
      }

      console.log(`✅ Auto-reacted to status with ${treact} (from ${mek.key.participant || "unknown"})`);
    } catch (err) {
      console.error("❌ Error handling status auto-react:", err);
    }
  }
});

    // Auto-recording feature check
    if (config.AUTO_RECORDING) {
      const jid = mek.key.remoteJid;
      // Send auto recording presence
      await malvin.sendPresenceUpdate("recording", jid);

      // Small delay to simulate realistic behavior
      await new Promise((res) => setTimeout(res, 1000));
    }

    const m = sms(malvin, mek);
    const type = getContentType(mek.message);
    const content = JSON.stringify(mek.message);
    const from = mek.key.remoteJid;
    const quoted =
      type == "extendedTextMessage" &&
      mek.message.extendedTextMessage.contextInfo != null
        ? mek.message.extendedTextMessage.contextInfo.quotedMessage || []
        : [];
    const body =
      type === "conversation"
        ? mek.message.conversation
        : type === "extendedTextMessage"
        ? mek.message.extendedTextMessage.text
        : type == "imageMessage" && mek.message.imageMessage.caption
        ? mek.message.imageMessage.caption
        : type == "videoMessage" && mek.message.videoMessage.caption
        ? mek.message.videoMessage.caption
        : "";
    const isCmd = body.startsWith(prefix);
    const command = isCmd
      ? body.slice(prefix.length).trim().split(" ").shift().toLowerCase()
      : "";
    const args = body.trim().split(/ +/).slice(1);
    const q = args.join(" ");
    const isGroup = from.endsWith("@g.us");
    const sender = mek.key.fromMe
      ? malvin.user.id.split(":")[0] + "@s.whatsapp.net" || malvin.user.id
      : mek.key.participant || mek.key.remoteJid;
    const senderNumber = sender.split("@")[0];
    const botNumber = malvin.user.id.split(":")[0];
    const pushname = mek.pushName || "Sin Nombre";
    const isMe = botNumber.includes(senderNumber);
    const isOwner = ownerNumber.includes(senderNumber) || isMe;
    const botNumber2 = await jidNormalizedUser(malvin.user.id);
    const groupMetadata = isGroup
      ? await malvin.groupMetadata(from).catch((e) => {})
      : "";
    const groupName = isGroup ? groupMetadata.subject : "";
    const participants = isGroup ? await groupMetadata.participants : "";
    const groupAdmins = isGroup ? await getGroupAdmins(participants) : "";
    const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false;
    const isAdmins = isGroup ? groupAdmins.includes(sender) : false;
    const isReact = m.message.reactionMessage ? true : false;
    const reply = (teks) => {
      malvin.sendMessage(from, { text: teks }, { quoted: mek });
    };

    malvin.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
      let mime = "";
      let res = await axios.head(url);
      mime = res.headers["content-type"];
      if (mime.split("/")[1] === "gif") {
        return malvin.sendMessage(
          jid,
          {
            video: await getBuffer(url),
            caption: caption,
            gifPlayback: true,
            ...options,
          },
          { quoted: quoted, ...options }
        );
      }
      let type = mime.split("/")[0] + "Message";
      if (mime === "application/pdf") {
        return malvin.sendMessage(
          jid,
          {
            document: await getBuffer(url),
            mimetype: "application/pdf",
            caption: caption,
            ...options,
          },
          { quoted: quoted, ...options }
        );
      }
      if (mime.split("/")[0] === "image") {
        return malvin.sendMessage(
          jid,
          { image: await getBuffer(url), caption: caption, ...options },
          { quoted: quoted, ...options }
        );
      }
      if (mime.split("/")[0] === "video") {
        return malvin.sendMessage(
          jid,
          {
            video: await getBuffer(url),
            caption: caption,
            mimetype: "video/mp4",
            ...options,
          },
          { quoted: quoted, ...options }
        );
      }
      if (mime.split("/")[0] === "audio") {
        return malvin.sendMessage(
          jid,
          {
            audio: await getBuffer(url),
            caption: caption,
            mimetype: "audio/mpeg",
            ...options,
          },
          { quoted: quoted, ...options }
        );
      }
    }; 

    // ============ SIMPLE ANTI DELETE TEXT ONLY ============
malvin.ev.on('messages.delete', async (item) => {
  try {
    const message = item.messages[0];
    if (!message.message || message.key.fromMe) return;

    const from = message.key.remoteJid;
    const sender = message.key.participant || message.key.remoteJid;
    const contentType = getContentType(message.message);
    const deletedMsg = message.message[contentType];

    // Only handle plain text messages
    let text = "";

    if (contentType === "conversation") {
      text = deletedMsg;
    } else if (contentType === "extendedTextMessage") {
      text = deletedMsg.text || deletedMsg;
    } else {
      return; // Not a text message
    }

    // Send message to same chat indicating who deleted what
    await malvin.sendMessage(from, {
      text: `🛡️ *Anti-Delete*\n👤 *User:* @${sender.split('@')[0]}\n💬 *Deleted Message:* ${text}`,
      mentions: [sender]
    });
  } catch (err) {
    console.error("❌ Anti-delete error:", err);
  }
});

   //work type
    if (!isOwner && config.MODE === "private") return;
    if (!isOwner && isGroup && config.MODE === "inbox") return;
    if (!isOwner && !isGroup && config.MODE === "groups") return;

    const events = require("./command");
    const cmdName = isCmd
      ? body.slice(1).trim().split(" ")[0].toLowerCase()
      : false;
    if (isCmd) {
      const cmd =
        events.commands.find((cmd) => cmd.pattern === cmdName) ||
        events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName));
      if (cmd) {
        if (cmd.react)
          malvin.sendMessage(from, { react: { text: cmd.react, key: mek.key } });

        try {
          cmd.function(malvin, mek, m, {
            from,
            quoted,
            body,
            isCmd,
            command,
            args,
            q,
            isGroup,
            sender,
            senderNumber,
            botNumber2,
            botNumber,
            pushname,
            isMe,
            isOwner,
            groupMetadata,
            groupName,
            participants,
            groupAdmins,
            isBotAdmins,
            isAdmins,
            reply,
          });
        } catch (e) {
          console.error("[PLUGIN ERROR] " + e);
        }
      }
    }
    events.commands.map(async (command) => {
      if (body && command.on === "body") {
        command.function(malvin, mek, m, {
          from,
          l,
          quoted,
          body,
          isCmd,
          command,
          args,
          q,
          isGroup,
          sender,
          senderNumber,
          botNumber2,
          botNumber,
          pushname,
          isMe,
          isOwner,
          groupMetadata,
          groupName,
          participants,
          groupAdmins,
          isBotAdmins,
          isAdmins,
          reply,
        });
      } else if (mek.q && command.on === "text") {
        command.function(malvin, mek, m, {
          from,
          l,
          quoted,
          body,
          isCmd,
          command,
          args,
          q,
          isGroup,
          sender,
          senderNumber,
          botNumber2,
          botNumber,
          pushname,
          isMe,
          isOwner,
          groupMetadata,
          groupName,
          participants,
          groupAdmins,
          isBotAdmins,
          isAdmins,
          reply,
        });
      } else if (
        (command.on === "image" || command.on === "photo") &&
        mek.type === "imageMessage"
      ) {
        command.function(malvin, mek, m, {
          from,
          l,
          quoted,
          body,
          isCmd,
          command,
          args,
          q,
          isGroup,
          sender,
          senderNumber,
          botNumber2,
          botNumber,
          pushname,
          isMe,
          isOwner,
          groupMetadata,
          groupName,
          participants,
          groupAdmins,
          isBotAdmins,
          isAdmins,
          reply,
        });
      } else if (command.on === "sticker" && mek.type === "stickerMessage") {
        command.function(malvin, mek, m, {
          from,
          l,
          quoted,
          body,
          isCmd,
          command,
          args,
          q,
          isGroup,
          sender,
          senderNumber,
          botNumber2,
          botNumber,
          pushname,
          isMe,
          isOwner,
          groupMetadata,
          groupName,
          participants,
          groupAdmins,
          isBotAdmins,
          isAdmins,
          reply,
        });
      }
    });
    //============================================================================
  });
}

app.get("/", (req, res) => {
  res.send("hey, 𝐍𝐄𝐍𝐎 𝐗 𝐌𝐃  started✅");
});
app.listen(port, () =>
  console.log(`Server listening on port http://localhost:${port}`)
);

setTimeout(() => {
  connectToWA();
}, 4000);
