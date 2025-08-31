const fs = require("fs");
const path = require("path");
const { cmd } = require("../command");
const axios = require("axios");
const { spawn } = require("child_process");

// GitHub plugins folder API
const repoPluginsBase = "https://api.github.com/repos/Nimeshkamihiran/neno-xmd-bot/contents/plugins";

cmd({
  pattern: "update",
  react: "🔄",
  desc: "Full update plugins from GitHub repo step-by-step",
  category: "system",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    const localFolder = path.join(__dirname, "../plugins");

    await reply("⚠️ Deleting local plugins folder...");

    // Delete plugins folder
    if (fs.existsSync(localFolder)) {
      fs.rmSync(localFolder, { recursive: true, force: true });
    }

    fs.mkdirSync(localFolder);
    await reply("✅ Local plugins folder cleared.");

    await reply("🔄 Fetching plugins from GitHub...");

    // Fetch plugins folder from GitHub API
    let res = await axios.get(repoPluginsBase);
    let files = res.data.filter(f => f.name.endsWith(".js"));

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let fileName = file.name;
      let repoFileUrl = file.download_url;
      let localFilePath = path.join(localFolder, fileName);

      await reply(`⬇️ Downloading ${fileName} (${i + 1}/${files.length})...`);

      let repoData = (await axios.get(repoFileUrl)).data;
      fs.writeFileSync(localFilePath, repoData, "utf8");

      await reply(`✅ ${fileName} downloaded successfully`);
    }

    await reply("🎉 All plugins downloaded successfully. Bot is restarting...");

    // Auto restart bot
    spawn("node", ["index.js"], {
      detached: true,
      stdio: "inherit"
    });
    process.exit();

  } catch (e) {
    console.log(e);
    reply("❌ Error updating plugins: " + e.message);
  }
});
