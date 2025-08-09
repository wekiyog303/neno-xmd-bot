// plugins/autochat.js
const config = require("../config");

let autoChatCount = 0; // Limit replies to 30 messages

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
    // New additions:
    "🌞 Bright day to you! Let's get things rolling.",
    "🌸 Hello! May your day bloom with joy.",
    "💌 Just saying hi with a big smile!",
    "🎶 Hey! Let's make life a happy tune.",
    "🧡 Hey there! You make this chat shine.",
    "🌺 Hello! Keep spreading the positive vibes.",
    "🎊 Hi! Ready for some epic conversations?",
    "🌼 Greetings! Hope your day is full of smiles.",
    "🌟 Hey! You’re the reason this chat glows.",
    "🌍 Hello! Sending you sunshine from afar."
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
    // New additions:
    "🌈 Hi! Life’s better with you here.",
    "✨ Hi there! Sparkle wherever you go.",
    "🌻 Hi! Your smile is contagious today.",
    "🎉 Hi! Let’s make today unforgettable.",
    "💬 Hey! Your words light up this chat.",
    "🌟 Hi! Keep being your awesome self.",
    "🎤 Yo! Ready to share some stories?",
    "🌙 Hi! Sending you peaceful vibes tonight.",
    "💫 Hey! You’re the star of this chatroom.",
    "🎯 Hi! Let’s hit our goals together!"
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
    // New additions:
    "☕ Morning! Here’s to coffee and success.",
    "🌺 Good morning! Breathe in positivity today.",
    "🎶 Rise up! Let’s make beautiful memories.",
    "🌻 Morning! Today’s gonna be amazing.",
    "💫 Good morning! Shine bright like the sun.",
    "🌸 Morning! Your smile makes the day better.",
    "🌞 Wake up! The world is yours today.",
    "🍩 Morning! Don’t forget to treat yourself.",
    "🌿 Good morning! Embrace the new opportunities.",
    "🎈 Morning! Let’s lift each other up today."
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
    // New additions:
    "🕊️ Peace, my friend! Words have power.",
    "🔥 Wow, that’s intense! Let’s cool down.",
    "😉 Let’s keep this chat classy, shall we?",
    "✌️ No worries, just good vibes here.",
    "😎 Stay cool and keep it kind.",
    "🌈 Words shape the world, choose wisely.",
    "🤗 Hugs instead of harsh words!",
    "🙏 Let’s keep this space friendly and fun.",
    "💖 Spread love, not heat!",
    "🦋 Gentle words bloom beautiful chats."
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
    // New additions:
    "🚀 Hey! Ready to launch into a great chat?",
    "🌈 Hey! You bring colors to this room.",
    "🎵 Hey! Let’s make this chat sing.",
    "🌻 Hey! Your energy is contagious.",
    "💫 Hey there! You make everything brighter.",
    "⚡ Hey! Charged and ready to chat!",
    "🌞 Hey! Sun’s out, fun’s out.",
    "🎉 Hey! Every chat’s better with you here.",
    "🌟 Hey! You light up this space.",
    "🔥 Hey! Let’s spark some fun!"
  ],
  "good night": [
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
    // New additions:
    "🌌 Good night! May your dreams be filled with stars.",
    "🌙 Night! Let peace wrap you up tight.",
    "😴 Sleep well! You earned it.",
    "🦉 Night owl says: Rest up!",
    "🌜 Moonlight kisses for sweet dreams.",
    "🌠 Dream of wonders and magic.",
    "🛏️ Cozy night! Wake refreshed.",
    "🌟 Let the night heal your soul.",
    "🌙 Rest easy, champion!",
    "💤 Good night! Recharge for tomorrow’s fun."
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
    // New additions:
    "🌻 Bye! Keep growing and glowing!",
    "💥 See you soon! Keep that energy high.",
    "🌟 Farewell! Until our next chat.",
    "🎈 Bye! Don’t forget to sparkle.",
    "🚀 Catch you later, alligator!",
    "🦋 Bye! Fly high and be free.",
    "🎉 Later! Keep the party going.",
    "🌞 Bye! Sending sunshine your way.",
    "✌️ See ya! Keep shining bright.",
    "💫 Goodbye! Till next time, star."
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
    // New additions:
    "🌹 Much appreciated! You’re a gem.",
    "💞 Thank you! You brighten my day.",
    "💐 Grateful to know you.",
    "🎁 Thanks! Sending good vibes your way.",
    "🌟 You’re the best! Thanks a lot.",
    "💖 Thanks a bunch! You’re awesome.",
    "🙏 Forever thankful for you.",
    "✨ Thanks! Your kindness means a lot.",
    "🌈 Thanks for being you!",
    "🤝 Appreciate it! Let’s keep shining."
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
    // New additions:
    "💌 Love is the answer to everything.",
    "🌸 Your love brightens the world.",
    "💫 Let love guide your path.",
    "🌺 Love you lots! Spread it freely.",
    "❤️ Love is a beautiful journey.",
    "🌞 Shine with love every day.",
    "💖 Love yourself first and always.",
    "🌟 Love makes life magical.",
    "💞 Love conquers all fears.",
    "🌹 Love grows stronger with you."
  ],
};

module.exports = async (malvin, mek, m, text) => {
  try {
    if (!config.AUTO_CHAT) return; // Only if enabled in config.js
    if (autoChatCount >= 30) return; // Stop after 30 replies

    const lowerText = text.toLowerCase().trim();

    if (autoReplies[lowerText]) {
      autoChatCount++;
      const messages = autoReplies[lowerText];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];

      await malvin.sendMessage(
        mek.key.remoteJid,
        { text: randomMsg },
        { quoted: mek }
      );
    }
  } catch (err) {
    console.error("Auto Chat Error:", err);
  }
};
