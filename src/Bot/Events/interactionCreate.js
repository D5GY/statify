const { BaseInteraction, InteractionType } = require('discord.js');
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
        content: `${statify.Emojis.ICON_RED} statify error: could not get interaction.`
      });
    }
    try {
      await interactionExecuted.execute(interaction, statify);
    } catch (error) {
      statify.logger.RED('bot', `INTERACTION: failed to execute ${interactionExecuted}\n${error}`);
      if (interaction.deferred || interaction.replied) {
        interaction.editReply({
          content: statify.response.content.DEFAULT_ERROR('interaction', statify)
        });
      } else {
        interaction.reply({
          ephemeral: true,
          content: statify.response.content.DEFAULT_ERROR('interaction', statify)
        });
      }
    }
  } else if (interaction.isStringSelectMenu()) {
    const menu = statify.selectMenus.get(interaction.customId);
    if (!menu) {
      await interaction.reply({
        ephemeral: true,
        content: statify.response.content.DEFAULT_ERROR('select menu', statify),
        components: [],
        embeds: []
      });
      return statify.logger.RED('bot', menu);
    }
    try {
      await menu.execute(interaction, statify);
    } catch (error) {
      await interaction.editReply({
        ephemeral: true,
        content: statify.response.content.DEFAULT_ERROR('select menu', statify),
        components: [],
        embeds: []
      });
      return statify.logger.RED('bot', error);
    }
  } else if (interaction.type == InteractionType.ModalSubmit) {
    const modal = statify.modals.get(interaction.customId);
    if (!modal) {
      await interaction.reply({
        ephemeral: true,
        content: statify.response.content.DEFAULT_ERROR('modal', statify),
        components: [],
        embeds: []
      });
      return statify.logger.RED('bot', modal);
    }
    try {
      await modal.execute(interaction, statify);
    } catch (error) {
      await interaction.reply({
        ephemeral: true,
        content: statify.response.content.DEFAULT_ERROR('modal', statify),
        components: [],
        embeds: []
      });
      return statify.logger.RED('bot', error);
    }
  }
};