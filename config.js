const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}

module.exports = {
  SESSION_ID: process.env.SESSION_ID || "5rl11RpI#lpRuJz5RwAx0TivsMpoMzcTSt9hxLMqCJrTCbtmL0wM",
  OWNER_NUM: process.env.OWNER_NUM || "94721584279",
  PREFIX: process.env.PREFIX || ".",
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
  AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || "true",
  MENU_IMG: process.env.MENU_IMG || "https://files.catbox.moe/43e40k.jpg",
  MODE : process.env.MODE || "public", 
  AUTO_STATUS_LIKE: process.env.AUTO_STATUS_LIKE || "true", 
  AUTO_RECORDING: convertToBool(process.env.AUTO_RECORDING || "true"), 
  AUTO_CHAT: true,
  ANTI_DELETE: convertToBool(process.env.ANTI_DELETE || "true"),
  ANTI_BAD: process.env.ANTI_BAD || "true",
};
