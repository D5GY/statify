const { SlashCommandBuilder, CommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const statify = require('../../Core/statify');
const r6 = require('r6s-stats-api');

const buttons = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId('r6_page1')
    .setEmoji(statify.Emojis.ICON_BLUE)
    .setStyle(ButtonStyle.Secondary)
    .setLabel('General Stats'),
  new ButtonBuilder()
    .setCustomId('r6_page2')
    .setEmoji(statify.Emojis.ICON_BLUE)
    .setStyle(ButtonStyle.Secondary)
    .setLabel('Ranked Stats')
)

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rainbow-six-siege')
    .setDescription('Get statistics for a Rainbow Six Siege player.')
    .addStringOption(option =>
      option.setName('username')
        .setDescription('Provide the players username.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('platform')
        .setDescription('platform of the player.')
        .setChoices(
          { name: 'xbox', value: 'xbox' },
          { name: 'playstation', value: 'psn' },
          { name: 'pc', value: 'pc' }
        )
        .setRequired(true)
    ),
  /**
   * @param { CommandInteraction } interaction 
   * @param { statify } statify 
   */
  async execute(interaction, statify) {
    await interaction.deferReply({
      ephemeral: false
    });
    const username = interaction.options.getString('username');
    const platform = interaction.options.getString('platform');
    const generalData = await r6.general(platform, username);
    const rankedData = await r6.rank(platform, username);

    if (!generalData || generalData == 'TIME_OUT') return await interaction.editReply({
      content: `${statify.Emojis.ICON_YELLOW} unable to find General stats for ${username} on ${platform}.`
    });
    if (!rankedData || rankedData == 'TIME_OUT') return await interaction.editReply({
      content: `${statify.Emojis.ICON_YELLOW} unable to find Ranked stats for ${username} on ${platform}.`
    });

    await interaction.editReply({
      embeds: [statify.response.embed.rainbow_six_siege_general(generalData, statify)],
      components: [buttons]
    });

    const filter = i => i.user == interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter });
    collector.on('collect', async i => {
      if (i.customId == 'r6_page1') {
        await i.deferUpdate();
        await i.editReply({
          embeds: [statify.response.embed.rainbow_six_siege_general(generalData, statify)],
          components: [buttons]
        });
      } else if (i.customId == 'r6_page2') {
        await i.deferUpdate();
        await i.editReply({
          embeds: [statify.response.embed.rainbow_six_siege_ranked(rankedData, statify)],
          components: [buttons]
        });
      } else {
        await i.deferUpdate();
        await i.editReply({
          components: [],
          embeds: [],
          content: statify.response.content.DEFAULT_ERROR('button', statify)
        });
      }
    });
  }
}