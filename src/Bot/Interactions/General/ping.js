const { SlashCommandBuilder, CommandInteraction } = require("discord.js");
const statify = require('../../Core/statify');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Shows statify ping'),
  /**
   * @param { CommandInteraction } interaction 
   * @param { statify } statify 
   */
  async execute(interaction, statify) {
    await interaction.deferReply({
      ephemeral: true
    });
    await interaction.editReply({
      content: statify.ws.ping.toString()
    });
  }
}