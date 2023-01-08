const { SlashCommandBuilder, CommandInteraction } = require("discord.js");
const statify = require('../../../Core/statify');
const { platforms, login, Warzone } = require('call-of-duty-api');
login(statify.config.BOT.API_KEYS.COD_SSO);
module.exports = {
  data: new SlashCommandBuilder()
    .setName('call-of-duty')
    .setDescription('Lookup statistics for a player on a Call Of Duty game.')
    .addSubcommand(sub =>
      sub
        .setName('warzone')
        .setDescription('Get statistics for a Warzone player.')
        .addStringOption(option =>
          option
            .setName('player-tag')
            .setDescription('Players user tag')
            .setRequired(true)
        )
        .addStringOption(option =>
          option
            .setName('platform')
            .setDescription('platform of the player.')
            .addChoices(
              { name: 'Battle Net', value: platforms.Battlenet },
              { name: 'Activision', value: platforms.Activision }
            )
            .setRequired(true)
        )
    ),
  /**
   * 
   * @param { CommandInteraction } interaction 
   * @param { statify } statify 
   */
  async execute(interaction, statify) {
    await interaction.deferReply({
      ephemeral: false
    });
    if (interaction.options.getSubcommand() === 'warzone') {
      let username = interaction.options.getString('player-tag');
      let platform = interaction.options.getString('platform');
      try {
        let { status, data } = await Warzone.fullData(username, platform);
        if (status == 'error') {
          if (data.message.includes('user not found')) {
            return await interaction.editReply({
              embeds: [statify.response.embed.CALL_OF_DUTY.NOT_FOUND(username, platform, statify)]
            });
          } else {
            await interaction.editReply({
              content: statify.response.content.DEFAULT_ERROR('warzone lookup', statify)
            });
            statify.webhooks.errorLogs.send({
              embeds: [statify.response.embed.ERROR(`[CALL OF DUTY::WARZONE]: ${data.message}`)]
            });
            return statify.logger.YELLOW('bot', `[CALL OF DUTY::WARZONE]: ${data.message}`);
          }
        }
        interaction.editReply({
          embeds: [statify.response.embed.CALL_OF_DUTY.WARZONE.STATS(data, username, statify)]
        });
      } catch (error) {
        await interaction.editReply({
          content: statify.response.content.DEFAULT_ERROR('warzone lookup', statify)
        });
        statify.webhooks.errorLogs.send({
          embeds: [statify.response.embed.ERROR(`[CALL OF DUTY::WARZONE]: ${data.message}`)]
        });
        return statify.logger.RED('bot', `[CALL OF DUTY::WARZONE]: ${data.message}`);
      }
    } else {
      await interaction.editReply({
        content: statify.response.content.DEFAULT_ERROR('subcommand', statify)
      });
    }
  }
}