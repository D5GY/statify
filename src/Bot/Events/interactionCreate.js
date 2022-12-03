const { BaseInteraction } = require('discord.js');
/**
 * 
 * @param { BaseInteraction } interaction
 */
module.exports = async (interaction) => {
  const statify = interaction.client;
  if (statify.config.DEVELOPMENT_MODE && !statify.config.STATIFY_DEVELOPERS_ID.includes(interaction.user.id)) return await interaction.reply({
    ephemeral: true,
    content: 'This bot is in developer only mode!'
  });

  if (interaction.isChatInputCommand()) {
    const interactionExecuted = await statify.commands.get(interaction.commandName);
    if (!interactionExecuted) {
      statify.logger.YELLOW('bot', `INTERACTION: could not get ${interaction.commandName}\n${interaction}`);
      return await interaction.reply({
        ephemeral: true,
        content: 'statify error: could not get interaction.'
      });
    }
    try {
      await interactionExecuted.execute(interaction, statify);
    } catch (error) {
      statify.logger.RED('bot', `INTERACTION: failed to execute ${interactionExecuted}\n${error}`);
      if (interaction.deferred || interaction.replied) {
        interaction.editReply({
          content: statify.response.content.DEFAULT_ERROR('interaction')
        });
      } else {
        interaction.reply({
          ephemeral: true,
          content: statify.response.content.DEFAULT_ERROR('interaction')
        });
      }
    }
  }
}