const { SlashCommandBuilder, CommandInteraction, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js");
const statify = require('../../../Core/statify');

const modal = new ModalBuilder()
  .setCustomId('bugreport')
  .setTitle('statify bug');

const platform = new ActionRowBuilder().addComponents(
  new TextInputBuilder()
    .setCustomId('bugPlatform')
    .setLabel('Platform')
    .setPlaceholder('bot | website')
    .setStyle(TextInputStyle.Short)
    .setRequired(true)
)
const bug = new ActionRowBuilder().addComponents(
  new TextInputBuilder()
  .setCustomId('bug')
  .setLabel('bug')
  .setPlaceholder('bug')
  .setStyle(TextInputStyle.Paragraph)
  .setRequired(true)
)

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bug-report')
    .setDescription('report a bug to the statify developers'),
  /**
   * @param { CommandInteraction } interaction 
   * @param { statify } statify 
   */
  async execute(interaction, statify) {
    modal.addComponents(platform, bug);
    await interaction.showModal(modal);
  }
}