const config = require('../config');
const fs = require('fs');
const { exec } = require('child_process');
const { cmd } = require('../command');

cmd({
    pattern: "update",
    react: "🔄",
    desc: "Update folder from GitHub",
    category: "system",
    use: '.update',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const repoUrl = 'https://github.com/Nimeshkamihiran/neno-xmd-bot.git'; // New repo
        const targetFolder = 'plugins';

        // Delete existing folder if exists
        if (fs.existsSync(targetFolder)) {
            fs.rmSync(targetFolder, { recursive: true, force: true });
        }

        // Clone repo
        const gitCommand = `git clone ${repoUrl} ${targetFolder}`;

        const result = await new Promise((resolve, reject) => {
            exec(gitCommand, (err, stdout, stderr) => {
                if (err) return reject(stderr || err.message || err);
                resolve(stdout);
            });
        });

        let messageText = `╭─═━⌬━═─⊹⊱✦⊰⊹─═━⌬━═─\n` +
                          `┊ ⚡ *BOT UPDATE*\n` +
                          `┊ ✅ Update completed *successfully!* ✨\n` +
                          `╰─═━⌬━═─⊹⊱✦⊰⊹─═━⌬━═─`;

        await conn.sendMessage(from, { text: messageText }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply(`*❌ Error during update:* ${error}`);
    }
});
