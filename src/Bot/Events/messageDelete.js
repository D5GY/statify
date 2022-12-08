const { MessageType, Message } = require('discord.js');
const messageTypes = [ MessageType.Default, MessageType.ContextMenuCommand, MessageType.ChatInputCommand ];
/**
  * @param { Message } message
  * * @param { statify } statify
  */
module.exports = (message) => {
  const statify = message.client;
  if (message.guild.id !== statify.config.BOT.STATIFY_GUILD_ID || message.type !== messageTypes) return;

  statify.webhooks.messageDelete.send({
    embeds: [statify.response.embed.MESSAGE_DELETE(message, statify)]
  }).catch((error) => {
    statify.emit('error', error);
  });
};