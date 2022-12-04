const { ModalSubmitInteraction } = require('discord.js');
const statify = require('../../Core/statify');

module.exports = {
  data: {
    name: 'suggest'
  },
  /**
   * @param { ModalSubmitInteraction } interaction 
   * @param { statify } statify 
   */
  async execute(interaction, statify) {
    const platform = interaction.fields.getTextInputValue('suggestionPlatform');
    const suggestion = interaction.fields.getTextInputValue('suggestion');
    statify.webhooks.suggest.send({
      embeds: [statify.response.embed.SUGGESTION_SUBMIT(platform, suggestion, interaction.user, statify)]
    });
    await interaction.reply({
      content: statify.response.content.MODAL_SUBMITTED('suggestion', statify)
    });
  }
}