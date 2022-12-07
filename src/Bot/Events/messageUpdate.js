const { MessageType, Message } = require('discord.js');
/**
  * @param { Message } oldMessage
  * @param { Message } newMessage
  * @param { statify } statify
*/
module.exports = (oldMessage, newMessage) => {
  const statify = oldMessage.client || newMessage.client;
  if (oldMessage.guild.id !== statify.config.BOT.STATIFY_GUILD_ID || oldMessage.type !== MessageType.Default) return;

  statify.webhooks.messageUpdate.send({
    embeds: [statify.response.embed.MESSAGE_UPDATE(oldMessage, newMessage, statify)]
  });
};