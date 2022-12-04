const { SlashCommandBuilder, CommandInteraction, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js");
const statify = require('../../../Core/statify');

const modal = new ModalBuilder()
  .setCustomId('suggest')
  .setTitle('statify suggestion');

const platform = new ActionRowBuilder().addComponents(
  new TextInputBuilder()
    .setCustomId('suggestionPlatform')
    .setLabel('Platform')
    .setPlaceholder('bot | website')
    .setStyle(TextInputStyle.Short)
    .setRequired(true)
)
const suggestion = new ActionRowBuilder().addComponents(
  new TextInputBuilder()
  .setCustomId('suggestion')
  .setLabel('Suggestion')
  .setPlaceholder('Suggestion')
  .setStyle(TextInputStyle.Paragraph)
  .setRequired(true)
)

module.exports = {
  data: new SlashCommandBuilder()
    .setName('suggest')
    .setDescription('suggest a feature to the statify developers'),
  /**
   * @param { CommandInteraction } interaction 
   * @param { statify } statify 
   */
  async execute(interaction, statify) {
    modal.addComponents(platform, suggestion);
    await interaction.showModal(modal);
  }
}