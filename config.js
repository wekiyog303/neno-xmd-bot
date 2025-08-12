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
  
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",      // Status seen karanna ona da
  AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || "true",    // Status walata react karanna ona da
  AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "true",    // Status walata reply karanna ona da
  AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "Thanks for sharing your status!",  // Status reply message
  
  MODE : process.env.MODE || "public", 
  
  AUTO_STATUS_LIKE: process.env.AUTO_STATUS_LIKE || "true", 
  AUTO_RECORDING: convertToBool(process.env.AUTO_RECORDING || "true"), 
  ANTI_DELETE: convertToBool(process.env.ANTI_DELETE || "true"),
  ANTI_BAD: process.env.ANTI_BAD || "true",
};
