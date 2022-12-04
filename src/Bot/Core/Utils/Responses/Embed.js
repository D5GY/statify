const { EmbedBuilder } = require('discord.js');
const statify = require('../../statify');
module.exports = {
  /**
   * @param { statify } statify
   */
  ping: (statify, ClientPing) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.BLUE)
      .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
      .setDescription(`${statify.Emojis.ICON_GREEN} My API ping is ${statify.ws.ping}\n${statify.Emojis.ICON_GREEN} My Client ping is ${ClientPing}`);
  },
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
  },
  HELP: {
    rainbow_six_siege: (statify) => {
      return new EmbedBuilder()
      .setColor(statify.Colors.BLUE)
      .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
      .setFields(
        { name: 'Useage', value: '/rainbow-six-siege `username:` `platform:`' },
        { name: 'Example', value: '/rainbow-six-siege `username: csgo` `platform: xbox`' }
      )
    }
  },
  SUGGESTION_SUBMIT: (platform, suggestion, user, statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.BLUE)
      .setAuthor({ name: `new suggestion`, url: 'https://statify.cc/', iconURL: user.avatarURL() ?? statify.user.avatarURL() })
      .setFields(
        { name: 'platform', value: `${platform}`, inline: true },
        { name: 'User', value: `Tag: ${user.tag}\nID: ${user.id}\nUser: ${user}`, inline: true },
        { name: 'Time', value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true },
        { name: 'suggestion', value: `${suggestion}` }
      );
  },
  BUG_SUBMIT: (platform, bug, user, statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.RED)
      .setAuthor({ name: `new bug found`, url: 'https://statify.cc/', iconURL: user.avatarURL() ?? statify.user.avatarURL() })
      .setFields(
        { name: 'platform', value: `${platform}`, inline: true },
        { name: 'User', value: `Tag: ${user.tag}\nID: ${user.id}\nUser: ${user}`, inline: true },
        { name: 'Time', value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true },
        { name: 'Bug', value: `${bug}` }
      );
  }
}