const { EmbedBuilder } = require('discord.js');
const statify = require('../../statify');
module.exports = {
  /**
   * @param { statify } statify
   */
  ping: (statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.BLUE)
      .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
      .setDescription(`${statify.Emojis.ICON_GREEN} My API ping is ${statify.ws.ping}`);
  },
  /**
   * @param { R6_General } data 
   * @param { statify } statify 
   */
  rainbow_six_siege_general: (data, statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.BLUE)
      .setAuthor({ name: `stats for ${data.name}`, iconURL: data.header ?? statify.user.avatarURL(), url: 'https://statify.cc/' })
      .setFields(
        { name: 'Player Information', value: `> Level: ${data.level}\n> Total XP: ${data.total_xp}\n> Wins: ${data.wins}\n> Losses: ${data.losses}\n> W/L: ${data.win_}\n> Time Played: ${data.time_played}\n> Total Games: ${data.matches_played}`, inline: true },
        { name: 'Kills & Deaths', value: `> Kills: ${data.kills}\n> Deaths: ${data.deaths}\n> K/D: ${data.kd}\n> Headshots: ${data.headshots}\n> Blind Kills: ${data.blind_kills}\n> Knife Kills: ${data.melee_kills}`, inline: true }
      )
      .setFooter({ text: 'stats lookup based on general' })
      .setTimestamp();
    },
    rainbow_six_siege_ranked: (data, statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setAuthor({ name: `stats for ${data.name}`, iconURL: data.header ?? statify.user.avatarURL(), url: 'https://statify.cc/' })
        .addFields(
          { name: 'Kills & Deaths', value: `> Kills: ${data.kills}\n> Deaths: ${data.deaths}\n> K/D: ${data.kd}\n> Kills per game: ${data.kills_match}`, inline: true },
          { name: 'Ranked Stats', value: `> Wins: ${data.wins}\n> Losses: ${data.losses}\n> W/L: ${data.win_}\n> MMR: ${data.mmr}\n> Rank: ${data.rank}`, inline: true }
        )
        .setThumbnail(data.rank_img)
        .setFooter({ text: 'stats lookup based on ranked' })
        .setTimestamp();
      }
}