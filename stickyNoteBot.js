/*
Bot Name: Custom stickynote 
Description: Discord.js bot that manages a sticky note in a specific channel, allowing authorized users to update its content and toggle its visibility.
Version: 1.0
Author: Michael John Pieruszka (MJP)
Author URI: https://github.com/MJPieruszka
*/

const { Client, Intents, MessageEmbed } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const token = 'YOUR TOKEN HERE';
const channelId = 'CHANNEL ID HERE'; // ADD THE CHANNEL ID HERE 
const prefix = '!sticky';
const allowedRoleIds = ['ROLE ID HERE', 'ROLE ID HERE'];
const togglePrefix = '!togglesticky';
let stickyMessageId;
let stickyBotActive = true;
const triggerRoleId = 'ROLE ID HERE'; // The role id that triggers the sticky message delete and report function. recommending using a verication role ID

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);
  const channel = await client.channels.fetch(channelId);

  const messages = await channel.messages.fetch({ limit: 100 });
  const stickyMessage = messages.find(msg => msg.author.id === client.user.id && msg.embeds.length > 0 && msg.embeds[0].title === 'Sticky Note');

  if (stickyMessage) {
    stickyMessageId = stickyMessage.id;
  } else {
    const embed = new MessageEmbed()
      .setTitle('Sticky Note')
      .setDescription('No sticky note set.')
      .setColor('BLUE'); 
    const newStickyMessage = await channel.send({ embeds: [embed] });
    stickyMessageId = newStickyMessage.id;
  }
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || message.channel.id !== channelId) return;

  const member = await message.guild.members.fetch(message.author.id);

  if (message.content.startsWith(togglePrefix) || message.content.startsWith(prefix)) {
    if (!member.roles.cache.some(role => allowedRoleIds.includes(role.id))) return;

    if (message.content.startsWith(togglePrefix)) {
      stickyBotActive = !stickyBotActive;
      const status = stickyBotActive ? 'on' : 'off';
      return message.reply(`Sticky bot has been turned ${status}.`);
    }

    if (!stickyBotActive) return;

    if (message.content.startsWith(prefix)) {
      const stickyContent = message.content.slice(prefix.length).trim();
      if (!stickyContent) return message.reply('Please provide content for the sticky note.');

      const channel = await client.channels.fetch(channelId);
      const stickyMessage = await channel.messages.fetch(stickyMessageId);

      if (stickyMessage) {
        await stickyMessage.delete();
      }

      const embed = new MessageEmbed()
        .setTitle('Sticky Note')
        .setDescription(stickyContent)
        .setColor('BLUE');
      const newStickyMessage = await channel.send({ embeds: [embed] });
      stickyMessageId = newStickyMessage.id;

      await message.delete();
      const replyMessage = await message.channel.send('Sticky note updated.');
      setTimeout(() => replyMessage.delete(), 3000);
      return;
    }
  }

  if (member.roles.cache.has(triggerRoleId) && stickyBotActive) {
    const channel = await client.channels.fetch(channelId);
    const stickyMessage = await channel.messages.fetch(stickyMessageId);

    if (stickyMessage) {
      await stickyMessage.delete();
      const newStickyMessage = await channel.send({ embeds: [stickyMessage.embeds[0]]
      });
  
      stickyMessageId = newStickyMessage.id;
      }
    }
  });
  
  client.login(token);
  
