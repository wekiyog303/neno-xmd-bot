// plugins/autochat.js
const config = require("../config");

let autoChatCount = 0; // Reply limit

const autoReplies = {
  hello: [
    "✨ Hey there! I am *Neno XMD* 😎🤖\nHow can I help you today? 🚀",
    "💫 Hello friend! Your vibe is amazing today 🌟",
    "🌈 Hi there! Sending you good energy & happy vibes 💖",
    "🌻 Hey hey! Hope your day is as awesome as you are!",
    "🎉 Hello! Let's make something amazing happen today!",
    "🤩 Hey! You just made my day brighter!",
    "🌟 Hello superstar! Ready to shine?",
    "🦄 Hey! Believe in magic and good things will come!",
    "💥 Hello! Let's rock and roll!",
    "🎈 Hiya! Sending you balloons of happiness!",
  ],
  hi: [
    "🔥 What's up champ? Keep rocking like a star ⭐",
    "💎 Hi buddy! You shine brighter than diamonds 💍",
    "😎 Sup! Cool people like you make life fun 🕶️",
    "👋 Hi there! Ready to conquer the day?",
    "🎈 Hey! Sending you a virtual high-five!",
    "🌠 Hi! May your day be as awesome as you!",
    "💡 Hey! Keep lighting up the world!",
    "🌞 Hi friend! Shine on and keep smiling!",
    "🍀 Hi! Lucky to have you here!",
    "🤗 Hi! Hugs coming your way!",
  ],
  gm: [
    "🌞 Good morning! Wishing you a day full of success 💪",
    "☀️ Morning! Time to rise & shine like the sun 🌟",
    "🍵 Good morning! Let’s make today legendary 🚀",
    "🌅 Rise and shine! The world awaits your greatness.",
    "🌻 Good morning! Smile and let the day be wonderful!",
    "🌤️ Morning! Sending you sunshine and smiles.",
    "🕊️ Good morning! Peace and joy to your day.",
    "🌈 Morning! Bright day, bright future!",
    "🌟 Wake up and sparkle!",
    "💐 Good morning! You’re a blooming flower!",
  ],
  gn: [
    "🌙 Good night! Dream big and rest well 💤",
    "✨ Sleep tight! Tomorrow is a new adventure 🌟",
    "😴 Nighty night! Recharge those amazing batteries.",
    "🌌 Sweet dreams! See you on the bright side tomorrow.",
    "🌠 Rest well, star! Tomorrow needs your shine!",
    "🛌 Good night! May your dreams be magical.",
    "🌟 Sleep well and wake up glowing!",
    "🌙 Night! Let the stars guard your dreams.",
    "💤 Sweet dreams and peaceful night.",
    "🌃 Good night! Rest and reset.",
  ],
  bye: [
    "👋 Bye! Come back soon, the fun never ends here!",
    "✌️ See you later! Stay awesome until next time.",
    "🚀 Goodbye! Keep being amazing out there.",
    "🌟 Bye-bye! The adventure continues, see ya!",
    "😊 Farewell for now! Catch you on the flip side.",
    "👋 See ya! Don’t forget to smile.",
    "🌈 Bye! Spread joy wherever you go.",
    "✌️ Peace out! Catch you later!",
    "💫 Bye! Shine bright always.",
    "🤗 Take care! Come back soon.",
  ],
  thanks: [
    "🙏 You're welcome! Always happy to help 😊",
    "💖 No problem! Your happiness is my priority.",
    "✨ Anytime! Glad to be here for you.",
    "🤗 Thanks for being awesome!",
    "🌟 You rock! Happy to assist.",
    "💬 My pleasure! Here whenever you need.",
    "🙌 Thanks! You made my day too.",
    "💫 Grateful for you!",
    "🌈 Thanks a ton! Keep shining.",
    "😊 You're amazing! Glad to help.",
  ],
  love: [
    "❤️ Love you too! Spread the love everywhere.",
    "💞 Sending you lots of good vibes and hugs!",
    "🌹 Love is all around! Feel it and share it.",
    "💕 You’re loved and appreciated always.",
    "😍 Keep shining with love and kindness!",
    "💖 Love and light your way!",
    "🌟 You’re a star loved by many.",
    "🌈 Love wins always!",
    "💘 Keep loving, keep smiling!",
    "🌷 Sending love and positivity your way.",
  ],
  hey: [
    "💌 Hey! Just here to make your day brighter ☀️",
    "⚡ Yo! Neno XMD is online and ready ⚙️",
    "🌟 Hey superstar! Ready to take on the world? 🌍",
    "🎯 Hey! Let’s hit our goals today!",
    "✨ Hey hey! Glad to see you here!",
    "🎉 Hey! Party time, let’s go!",
    "🌻 Hey! Keep blossoming every day!",
    "🥳 Hey! Sending you good vibes only!",
    "🤩 Hey! You’re the star of this chat!",
    "💥 Hey! Boom! Here I am!",
  ],
  fuck: [
    "😂 Chill bro, no need for bad words 🙏",
    "🤣 Language detected! Deploying peace mode 🕊️",
    "😏 Haha, that’s spicy! But let’s keep it cool 😎",
    "🤪 Whoa, watch those words! Let’s keep it friendly.",
    "🙈 Oops! Let’s turn that energy into positive vibes!",
    "😅 Easy there! Let’s spread love, not rage.",
    "😇 Bless you! Watch your words next time.",
    "😜 That’s some fiery talk! Stay cool, friend.",
    "🧘‍♂️ Keep calm and smile on!",
    "💬 Let’s chat nicely, yeah?",
  ],
};

module.exports = async (malvin, mek, m, text) => {
  try {
    if (!config.AUTO_CHAT) return; // If auto chat is disabled in config
    if (autoChatCount >= 30) return;  // Limit 30 replies per session

    const lowerText = text.toLowerCase().trim();

    if (autoReplies[lowerText]) {
      autoChatCount++;
      const messages = autoReplies[lowerText];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      await malvin.sendMessage(mek.key.remoteJid, { text: randomMsg }, { quoted: mek });
    }
  } catch (err) {
    console.error("Auto Chat Error:", err);
  }
};
