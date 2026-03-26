const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildMembers
  ] 
});

// ===== CONFIG =====
const BOT_TOKEN = 'MTQ4NjU2NzcxMDE3ODQxMDYyOQ.GxDjL0.7edEus5q-PMyXR47Ss_VtarxZu5sldDCBXa4WA';
const CHANNEL_NAME = 'verification'; // your verification channel
const ROLE_NAME = 'Verified'; // role name to give
// ==================

client.on('messageCreate', async message => {
  if (message.author.bot) return; // ignore bots
  if (message.channel.name !== CHANNEL_NAME) return; // only verification channel

  // find role by name
  const role = message.guild.roles.cache.find(r => r.name === ROLE_NAME);
  if (!role) return;

  // already verified
  if (message.member.roles.cache.has(role.id)) {
    message.channel.send(`${message.author} ✅ You are already verified!`);
    return;
  }

  // count images
  const images = message.attachments.filter(a => 
    ['png','jpg','jpeg','gif'].some(ext => a.name.toLowerCase().endsWith(ext))
  );

  if (images.size === 4) {
    await message.member.roles.add(role);
    message.channel.send(`${message.author} ✅ You have been verified!`);
  } else {
    message.channel.send(`${message.author} ❌ Please upload exactly 4 photos.`);
  }
});

client.login(BOT_TOKEN);
