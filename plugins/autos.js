const fs = require("fs");
const path = require("path");
const schedule = require("node-schedule");
const axios = require("axios");

let autoStatusJob = null;
let autoStatusEnabled = false;

// 7 Days Config
const weeklyStatus = [
    { img: "https://files.catbox.moe/6ypgeq.jpg", caption: "🌞 Good Morning - Day 1-: 𝚆𝙸𝚃𝙷 𝙽𝙴𝙽𝙾 𝚇𝙼𝙳" },
    { img: "https://files.catbox.moe/v8wwbb.jpg", caption: "🔥 Keep Going Strong - Day 2-: 𝚆𝙸𝚃𝙷 𝙽𝙴𝙽𝙾 𝚇𝙼𝙳" },
    { img: "https://files.catbox.moe/4b3lfz.jpg", caption: "💡 New Ideas Everyday - Day 3-: 𝚆𝙸𝚃𝙷 𝙽𝙴𝙽𝙾 𝚇𝙼𝙳" },
    { img: "https://files.catbox.moe/3hmb56.jpg", caption: "💪 Stay Motivated - Day 4-: 𝚆𝙸𝚃𝙷 𝙽𝙴𝙽𝙾 𝚇𝙼𝙳" },
    { img: "https://files.catbox.moe/u9d0qw.jpg", caption: "🎯 Focus & Win - Day 5-: 𝚆𝙸𝚃𝙷 𝙽𝙴𝙽𝙾 𝚇𝙼𝙳" },
    { img: "https://files.catbox.moe/8czv6j.jpg", caption: "🌈 Spread Positivity - Day 6-: 𝚆𝙸𝚃𝙷 𝙽𝙴𝙽𝙾 𝚇𝙼𝙳" },
    { img: "https://files.catbox.moe/5elx7r.jpg", caption: "🚀 Ready for Next Week - Day 7-: 𝚆𝙸𝚃𝙷 𝙽𝙴𝙽𝙾 𝚇𝙼𝙳" }
];

module.exports = async (malvin, mek, text, isOwner) => {
    const command = text?.trim().toLowerCase();

    if (isOwner && command === ".autos on") {
        if (autoStatusEnabled) return malvin.sendMessage(mek.key.remoteJid, { text: "✅ Auto Status දැන්ම ON තියෙනවා" });
        
        autoStatusEnabled = true;
        if (autoStatusJob) autoStatusJob.cancel(); // prevent duplicates
        startAutoStatus(malvin);

        // ගමන්ම පළවෙනි status යවන්න
        await sendTodayStatus(malvin);

        return malvin.sendMessage(mek.key.remoteJid, { text: "✅ Auto Status දැන් ON කළා" });
    }

    if (isOwner && command === ".autos off") {
        if (!autoStatusEnabled) return malvin.sendMessage(mek.key.remoteJid, { text: "✅ Auto Status දැන්ම OFF තියෙනවා" });
        
        autoStatusEnabled = false;
        if (autoStatusJob) autoStatusJob.cancel();
        return malvin.sendMessage(mek.key.remoteJid, { text: "❌ Auto Status නවත්තලා" });
    }
};

// Scheduler start
function startAutoStatus(malvin) {
    autoStatusJob = schedule.scheduleJob("0 9 * * *", async () => {
        if (!autoStatusEnabled) return;
        await sendTodayStatus(malvin);
    });
    console.log("✅ Auto Status Scheduler Start කළා");
}

// අද දවස් status යවන්න
async function sendTodayStatus(malvin) {
    const today = new Date();
    const dayIndex = (today.getDay() + 6) % 7; // Monday=0
    const { img, caption } = weeklyStatus[dayIndex];

    try {
        let buffer;
        if (img.startsWith("http")) {
            const res = await axios.get(img, { responseType: "arraybuffer" });
            buffer = res.data;
        } else {
            const filePath = path.resolve(__dirname, img);
            if (!fs.existsSync(filePath)) throw new Error(`File not found: ${filePath}`);
            buffer = fs.readFileSync(filePath);
        }

        await malvin.sendMessage("status@broadcast", { image: buffer, caption });
        console.log(`✅ Status sent for Day ${dayIndex + 1}`);
    } catch (err) {
        console.error("❌ Status යවන්න fail:", err.message);
    }
}