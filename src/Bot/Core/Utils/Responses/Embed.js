const { EmbedBuilder } = require('discord.js');
const statify = require('../../statify');
module.exports = {
  /**
   * @param { statify } statify
   */
  ping: (statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.BLUE)
      .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/' })
      .setDescription(`${statify.Emojis.ICON_GREEN} My API ping is ${statify.ws.ping}`);
  }
}