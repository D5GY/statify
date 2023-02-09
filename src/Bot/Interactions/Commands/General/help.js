const { SlashCommandBuilder, CommandInteraction, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const statify = require('../../../Core/statify');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Redirects to the statify features/commands page on the statify website.'),
  /**
   * @param { CommandInteraction } interaction 
   * @param { statify } statify 
   */
  async execute(interaction, statify) {
    await interaction.deferReply({
      ephemeral: true
    });
    await interaction.editReply({
      content: statify.response.content.HELP_COMMAND
    });
  }
};