const { ModalSubmitInteraction } = require('discord.js');
const statify = require('../../Core/statify');

module.exports = {
  data: {
    name: 'bugreport'
  },
  /**
   * @param { ModalSubmitInteraction } interaction 
   * @param { statify } statify 
   */
  async execute(interaction, statify) {
    const platform = interaction.fields.getTextInputValue('bugPlatform');
    const bug = interaction.fields.getTextInputValue('bug');
    statify.webhooks.bugreport.send({
      embeds: [statify.response.embed.BUG_SUBMIT(platform, bug, interaction.user, statify)]
    });
    await interaction.reply({
      content: statify.response.content.MODAL_SUBMITTED('bug report', statify)
    });
  }
}