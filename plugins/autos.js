
const fs = require('fs');
const path = require('path');
const config = require('../config');

// Nice captions for statuses
const captions = [
    "📢 Weekly Vibes – Stay Updated!",
    "🔥 New week, new energy!",
    "💡 Here’s your weekly boost!",
    "🚀 Let’s make this week amazing!",
    "⚡ Keep the good vibes rolling!",
    "🎯 Aim high, achieve more!",
    "✨ Small steps, big impact!"
];

// Function to send statuses one by one
async function sendStatuses(conn) {
    if (config.AUTO_STUTES !== "true") {
        console.log("[AUTO STATUS] Disabled in config.js");
        return;
    }

    const filePath = path.join(__dirname, '../my_data/autos.json');
    if (!fs.existsSync(filePath)) {
        console.log("[AUTO STATUS] autos.json not found!");
        return;
    }

    const images = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!Array.isArray(images) || images.length === 0) {
        console.log("[AUTO STATUS] No images found in autos.json");
        return;
    }

    let index = 0;

    async function sendNext() {
        if (index >= images.length) {
            console.log("[AUTO STATUS] All statuses sent!");
            return;
        }

        try {
            const imageUrl = images[index];
            const caption = captions[index % captions.length]; // Rotate captions
            await conn.sendMessage('status@broadcast', {
                image: { url: imageUrl },
                caption: caption
            });
            console.log(`[AUTO STATUS] Sent: ${imageUrl} (${caption})`);
        } catch (err) {
            console.error("[AUTO STATUS] Failed to send status:", err);
        }

        index++;
        if (index < images.length) {
            setTimeout(sendNext, 20 * 60 * 60 * 1000); // 20 hours
        }
    }

    // Send first status immediately
    sendNext();
}

// Run when bot starts
module.exports = async (conn) => {
    sendStatuses(conn);
};
