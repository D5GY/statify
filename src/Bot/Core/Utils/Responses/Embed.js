const { EmbedBuilder, Embed } = require('discord.js');
const moment = require('moment');
const statify = require('../../statify');
module.exports = {
  /**
   * @param { statify } statify
  */
  ERROR: (error, statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.BLUE)
      .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
      .setDescription(error)
      .setTimestamp();
  },
  /**
   * @param { statify } statify
  */
  BOT_ONLINE: (statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.BLUE)
      .setAuthor({ name: 'statify Bot' })
      .setTitle(`Online in ${statify.guilds.cache.size} ${statify.guilds.cache.size == 1 ? 'Guild' : 'Guilds'}`)
      .setDescription(`Bot: ${statify.user.tag}\nClient Ping: ${statify.ws.ping}\nInteraction Commands: ${statify.commandsCount}\nInteraction Modals: ${statify.modalsCount}\nInteraction Menus: ${statify.selectMenusCount}\nEvents: ${statify.eventsCount}\nTime: <t:${Math.floor(Date.now() / 1000)}:R>`)
  },
  ping: (statify, ClientPing) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.BLUE)
      .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
      .setDescription(`${statify.Emojis.ICON_GREEN} My API ping is ${statify.ws.ping}\n${statify.Emojis.ICON_GREEN} My Client ping is ${ClientPing}`);
  },
  GUILD_MEMBER_ADD: (member, statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.GREEN)
      .setTitle('New Member')
      .setFields(
        { name: 'Member', value: `User: ${member.user} (${member.user.tag}) \n ID: ${member.user.id} \n isBot: ${member.user.bot}`, inline: false },
        { name: 'Account Creation Date', value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:F> (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>)`, inline: false }
      )
      .setThumbnail(member.user.avatarURL() ?? statify.user.avatarURL())
      .setTimestamp()
  },
  GUILD_MEMBER_REMOVE: (member, statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.RED)
      .setTitle('Member Left')
      .setFields(
        { name: 'Member', value: `User: ${member.user} (${member.user.tag}) \n ID: ${member.user.id} \n isBot: ${member.user.bot}`, inline: false },
        { name: 'Join Date', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F> (<t:${Math.floor(member.joinedTimestamp / 1000)}:R>)`, inline: false }
      )
      .setThumbnail(member.user.avatarURL() ?? statify.user.avatarURL())
      .setTimestamp()
  },
  GUILD_CREATE: (guild, statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.GREEN)
      .setTitle('statify Joined A Server')
      .setFields(
        { name: 'Server', value: `Guild Name: ${guild.name} \n Guild ID: ${guild.id} \n Guild Members: ${guild.memberCount}` },
        { name: 'Guild Creation Date', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F> (<t:${Math.floor(guild.createdTimestamp / 1000)}:R>)`, inline: false }
      )
      .setThumbnail(guild.iconURL() ?? statify.user.avatarURL())
      .setTimestamp()
      .setFooter({ text: `Guild Count: ${statify.guilds.cache.size}` });
  },
  GUILD_DELETE: (guild, statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.RED)
      .setTitle('statify Was Removed From A Server')
      .setFields(
        { name: 'Server', value: `Guild Name: ${guild.name} \n Guild ID: ${guild.id} \n Guild Members: ${guild.memberCount}` },
        { name: 'Guild Join Date', value: `<t:${Math.floor(guild.joinedTimestamp / 1000)}:F> (<t:${Math.floor(guild.joinedTimestamp / 1000)}:R>)`, inline: false }
      )
      .setThumbnail(guild.iconURL() ?? statify.user.avatarURL())
      .setTimestamp()
      .setFooter({ text: `Guild Count: ${statify.guilds.cache.size}` });
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
          { name: 'Usage', value: '/rainbow-six-siege `username:` `platform:`' },
          { name: 'Example', value: '/rainbow-six-siege `username: csgo` `platform: xbox`' }
        )
    },
    the_division_2: (statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setFields(
          { name: 'Usage', value: '/division-2 `username:` `platform:`' },
          { name: 'Example', value: '/division-2 `username: RoGuETXXRXCk` `platform: xbox`' }
        )
    },
    splitgate: (statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setFields(
          { name: 'Usage', value: '/splitgate `username:` `platform:`' },
          { name: 'Example', value: '/splitgate `username: LyK1Nw0Lf` `platform: xbox`' }
        )
    },
    apex_legends: (statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setFields(
          { name: 'Usage', value: '/apex-legends `username:` `platform:`' },
          { name: 'Example', value: '/apex-legends `username: maujeh` `platform: xbox`' }
        )
    },
    csgo: (statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setFields(
          { name: 'Usage', value: '/csgo `username:`' },
          { name: 'Example', value: '/csgo `username: iriaisa`' }
        )
    },
    clash_of_clans: (statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setFields(
          { name: 'Usage', value: '/clash-of-clans `player-tag:`' },
          { name: 'Example', value: '/clash-of-clans `player-tag: #8J9RQGLUC`' }
        )
    },
    minecraft: (statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setFields(
          { name: 'Usage', value: '/minecraft `server:`' },
          { name: 'Example', value: '/minecraft `server: mc.hypixel.net`' }
        )
    },
    fortnite: (statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setFields(
          { name: 'Usage', value: '/fortnite `username:` `platform`' },
          { name: 'Example', value: '/fortnite `username: Ninja` `platform: epic`' }
        )
    }
  },
  SUGGESTION_SUBMIT: (platform, suggestion, user, statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.BLUE)
      .setAuthor({ name: `New Suggestion`, url: 'https://statify.cc/', iconURL: user.avatarURL() ?? statify.user.avatarURL() })
      .setFields(
        { name: 'User Information', value: `Tag: ${user.tag}\nID: ${user.id}\nUser: ${user}`, inline: false },
        { name: 'Suggestion', value: `${suggestion}`, inline: false },
        { name: 'Platform', value: `${platform}`, inline: true },
        { name: 'Time Submitted', value: `<t:${Math.floor(Date.now() / 1000)}:F> (<t:${Math.floor(Date.now() / 1000)}:R>)`, inline: true },
      );
  },
  BUG_SUBMIT: (platform, bug, user, statify) => {
    return new EmbedBuilder()
      .setColor(statify.Colors.RED)
      .setAuthor({ name: `Bug Reported`, url: 'https://statify.cc/', iconURL: user.avatarURL() ?? statify.user.avatarURL() })
      .setFields(
        { name: 'User Information', value: `Tag: ${user.tag}\nID: ${user.id}\nUser: ${user}`, inline: false },
        { name: 'Bug', value: `${bug}`, inline: false },
        { name: 'Platform', value: `${platform}`, inline: true },
        { name: 'Time Submitted', value: `<t:${Math.floor(Date.now() / 1000)}:F> (<t:${Math.floor(Date.now() / 1000)}:R>)`, inline: true },
      );
  },
  CLASH_OF_CLANS: {
    NOT_FOUND: (username, statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.RED)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setDescription(`${statify.Emojis.ICON_RED} Player **${username}** not found!`);
    },
    HOME_BASE: (data, statify) => {
      const embed = new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setTitle(`Lookup for ${data.name}`)
        .setFields(
          { name: 'Level', value: `> ${data.expLevel}`, inline: true },
          { name: 'Town Hall', value: `> ${data.townHallLevel}`, inline: true },
          { name: 'trophies', value: `> Current: ${data.trophies}\n> Best: ${data.bestTrophies}`, inline: true }
        )
        .setThumbnail(`attachment://${data.townHallLevel}.png`)
        .setFooter({ text: 'page 1 - Player Information' });
      if (data.league) embed.addFields({ name: 'League', value: `> ${data.league.name}`, inline: true });
      return embed;
    },
    BUILDER_BASE: (data, statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setAuthor({ name: `Lookup for ${data.name}`, iconURL: statify.user.avatarURL(), url: 'https://statify.cc/' })
        .setFields(
          { name: 'Builder Hall', value: `> ${data.builderHallLevel}`, inline: true },
          { name: 'Trophies', value: `> ${data.versusTrophies}`, inline: true },
          { name: 'Best Trophies', value: `> ${data.bestVersusTrophies}`, inline: true },
          { name: 'Total Battle Wins', value: `> ${data.versusBattleWins}`, inline: true }
        )
        .setThumbnail(`attachment://${data.builderHallLevel}.png`)
        .setFooter({ text: 'Page 2 - Builder Base' });
    },
    CLAN_INFO: (data, statify) => {
      if (!data.clan) return this.ERROR(`${statify.Emojis.ICON_WHITE} ${data.name} is not in a clan.`);
      return new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setAuthor({ name: `Lookup for ${data.name}`, iconURL: statify.user.avatarURL(), url: 'https://statify.cc/' })
        .setFields(
          { name: 'Clan Name', value: `> ${data.clan.name}`, inline: true },
          { name: 'Clan Tag', value: `> ${data.clan.tag}`, inline: true },
          { name: 'Clan Level', value: `> ${data.clan.clanLevel}`, inline: true },
          { name: 'Clan Role', value: `> ${data.role}`, inline: true },
          { name: 'Clan War Stars', value: `> ${data.warStars}`, inline: true },
          { name: 'Troops Donated', value: `> ${data.donations}`, inline: true },
          { name: 'Troops Received', value: `> ${data.donationsReceived}`, inline: true }
        )
        .setThumbnail(data.clan.badgeUrls.small)
        .setFooter({ text: 'Page 3 - Clan Stats' });
    }
  },
  APEX_LEGENDS: {
    NOT_FOUND: (username, platform, statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.RED)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setDescription(`${statify.Emojis.ICON_RED} ${username} not found on ${platform}`);
    },
    STATS: (data, statify) => {
      const apexStats = new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setTitle(`Lookup for ${data.data.platformInfo.platformUserHandle}`)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: data.data.platformInfo.avatarUrl ?? statify.user.avatarURL });

      const segment = data.data.segments[0];

      if (segment) {
        if (segment.stats.level) apexStats.addFields({ name: 'Level', value: `${segment.stats.level.displayValue}`, inline: true });
        if (segment.stats.kills) apexStats.addFields({ name: 'Kills', value: `${segment.stats.kills.displayValue}`, inline: true });
        if (segment.stats.killsPerMatch) apexStats.addFields({ name: 'Kills Per Match', value: `${segment.stats.killsPerMatch.displayValue}`, inline: true });
        if (segment.stats.winningKills) apexStats.addFields({ name: 'Winning Kills', value: `${segment.stats.winningKills.displayValue}`, inline: true });
        if (segment.stats.killsAsKillLeader) apexStats.addFields({ name: 'Kills As Kill Leader', value: `${segment.stats.killsAsKillLeader.displayValue}`, inline: true });
        if (segment.stats.damage) apexStats.addFields({ name: 'Total Damage', value: `${segment.stats.damage.displayValue}`, inline: true });
        if (segment.stats.points) apexStats.addFields({ name: 'Points', value: `${segment.stats.points.displayValue}`, inline: true });
        if (segment.stats.assists) apexStats.addFields({ name: 'Assists', value: `${segment.stats.assists.displayValue}`, inline: true });
        if (segment.stats.finishers) apexStats.addFields({ name: 'Finishers', value: `${segment.stats.finishers.displayValue}`, inline: true });
        if (segment.stats.deaths) apexStats.addFields({ name: 'Deaths', value: `${segment.stats.deaths.displayValue}`, inline: true });
        if (segment.stats.damageDealt) apexStats.addFields({ name: 'Damage Dealt', value: `${segment.stats.damageDealt.displayValue}`, inline: true });
        if (segment.stats.matchesPlayed) apexStats.addFields({ name: 'Matches Played', value: `${segment.stats.matchesPlayed.displayValue}`, inline: true });
        if (segment.stats.timePlayed) apexStats.addFields({ name: 'Time Played', value: `${segment.stats.timePlayed.displayValue}`, inline: true });
      } else if (!segment) {
        apexStats.setDescription(`${statify.Emojis.ICON_WHITE} I could not find any stats this player.`);
      }

      return apexStats;
    }
  },
  CSGO: {
    NOT_FOUND: (username, statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.RED)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setDescription(`${statify.Emojis.ICON_RED} ${username} not found on steam`);
    },
    STATS: (data, statify) => {
      const csgoStats = new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setTitle(`Lookup for ${data.data.platformInfo.platformUserHandle}`)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: data.data.platformInfo.avatarUrl ?? statify.user.avatarURL() });

      const segment = data.data.segments[0];

      if (segment) {
        if (segment.stats.kills) csgoStats.addFields({ name: 'Kills', value: `${segment.stats.kills.displayValue}`, inline: true });
        if (segment.stats.deaths) csgoStats.addFields({ name: 'Deaths', value: `${segment.stats.deaths.displayValue}`, inline: true });
        if (segment.stats.kd) csgoStats.addFields({ name: 'K/D', value: `${segment.stats.kd.displayValue}`, inline: true });
        if (segment.stats.score) csgoStats.addFields({ name: 'Score', value: `${segment.stats.score.displayValue}`, inline: true });
        if (segment.stats.damage) csgoStats.addFields({ name: 'Damage', value: `${segment.stats.damage.displayValue}`, inline: true });
        if (segment.stats.headshots) csgoStats.addFields({ name: 'Headshots', value: `${segment.stats.headshots.displayValue}`, inline: true });
        if (segment.stats.shotsFired) csgoStats.addFields({ name: 'Shots Fired', value: `${segment.stats.shotsFired.displayValue}`, inline: true });
        if (segment.stats.shotsHit) csgoStats.addFields({ name: 'Shots Hit', value: `${segment.stats.shotsHit.displayValue}`, inline: true });
        if (segment.stats.shotsAccuracy) csgoStats.addFields({ name: 'Accuracy', value: `${segment.stats.shotsAccuracy.displayValue}`, inline: true });
        if (segment.stats.bombsPlanted) csgoStats.addFields({ name: 'Bombs Planted', value: `${segment.stats.bombsPlanted.displayValue}`, inline: true });
        if (segment.stats.bombsDefused) csgoStats.addFields({ name: 'Bombs Defused', value: `${segment.stats.bombsDefused.displayValue}`, inline: true });
        if (segment.stats.matchesPlayed) csgoStats.addFields({ name: 'Matches Played', value: `${segment.stats.matchesPlayed.displayValue}`, inline: true });
        if (segment.stats.wins) csgoStats.addFields({ name: 'Wins', value: `${segment.stats.wins.displayValue}`, inline: true });
        if (segment.stats.losses) csgoStats.addFields({ name: 'Losses', value: `${segment.stats.losses.displayValue}`, inline: true });
        if (segment.stats.ties) csgoStats.addFields({ name: 'Ties', value: `${segment.stats.ties.displayValue}`, inline: true });
        if (segment.stats.wlPercentage) csgoStats.addFields({ name: 'W/L', value: `${segment.stats.wlPercentage.displayValue}`, inline: true });
        if (segment.stats.mvp) csgoStats.addFields({ name: 'MVP', value: `${segment.stats.mvp.displayValue}`, inline: true });
        if (segment.stats.timePlayed) csgoStats.addFields({ name: 'Time Played', value: `${segment.stats.timePlayed.displayValue}`, inline: true });
      } else if (!segment) {
        csgoStats.setDescription(`${statify.Emojis.ICON_WHITE} I could not find any stats this player.`);
      }

      return csgoStats;
    },
    STEAM_ID: (statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.RED)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setDescription(`${statify.Emojis.ICON_RED} please provide a steam user-id to lookup.`);
    },
    PRIVATE: (statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.YELLOW)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setDescription(`${statify.Emojis.ICON_WHITE} The player either hasn't played CSGO or their profile is private.`);
    }
  },
  DIVISION_2: {
    NOT_FOUND: (username, platform, statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.RED)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setDescription(`${statify.Emojis.ICON_RED} ${username} not found on ${platform}`);
    },
    STATS: (data, statify) => {
      const divisionStats = new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setTitle(`Lookup for ${data.data.platformInfo.platformUserHandle}`)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: data.data.platformInfo.avatarUrl ?? statify.user.avatarURL() });

      const segment = data.data.segments[0];

      if (segment) {
        if (segment.stats.killsPvP) divisionStats.addFields({ name: 'Player Kills', value: `${segment.stats.killsPvP.displayValue}`, inline: true });
        if (segment.stats.killsNpc) divisionStats.addFields({ name: 'NPC Kills', value: `${segment.stats.killsNpc.displayValue}`, inline: true });
        if (segment.stats.headshots) divisionStats.addFields({ name: 'Headshots', value: `${segment.stats.headshots.displayValue}`, inline: true });
        if (segment.stats.itemsLooted) divisionStats.addFields({ name: 'Items Looted', value: `${segment.stats.itemsLooted.displayValue}`, inline: true });
        if (segment.stats.highestPlayerLevel) divisionStats.addFields({ name: 'Level', value: `${segment.stats.highestPlayerLevel.displayValue}`, inline: true });
        if (segment.stats.specialization) divisionStats.addFields({ name: 'Specialization', value: `${segment.stats.specialization.displayValue}`, inline: true });
        if (segment.stats.xPTotal) divisionStats.addFields({ name: 'Total XP', value: `${segment.stats.xPTotal.displayValue}`, inline: true });
        if (segment.stats.timePlayed) divisionStats.addFields({ name: 'Time Played', value: `${segment.stats.timePlayed.displayValue}`, inline: true });
      } else if (!segment) {
        divisionStats.setDescription(`${statify.Emojis.ICON_WHITE} I could not find any stats this player.`);
      }

      return divisionStats;
    }
  },
  SPLITGATE: {
    STEAM_ID: (statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.RED)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setDescription(`${statify.Emojis.ICON_RED} please provide a steam user-id to lookup.`);
    },
    NOT_FOUND: (username, platform, statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.RED)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setDescription(`${statify.Emojis.ICON_RED} ${username} not found on ${platform}`);
    },
    STATS: (data, statify) => {
      const splitgateStats = new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setTitle(`Lookup for ${data.data.platformInfo.platformUserHandle}`)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: data.data.platformInfo.avatarUrl ?? statify.user.avatarURL() });

      const segment = data.data.segments[0];

      if (segment) {
        if (segment.stats.kills) splitgateStats.addFields({ name: 'Kills', value: `${segment.stats.kills.displayValue}`, inline: true });
        if (segment.stats.deaths) splitgateStats.addFields({ name: 'Deaths', value: `${segment.stats.deaths.displayValue}`, inline: true });
        if (segment.stats.assists) splitgateStats.addFields({ name: 'Assists', value: `${segment.stats.assists.displayValue}`, inline: true });
        if (segment.stats.points) splitgateStats.addFields({ name: 'Points', value: `${segment.stats.points.displayValue}`, inline: true });
        if (segment.stats.damageDealt) splitgateStats.addFields({ name: 'Damage Dealt', value: `${segment.stats.damageDealt.displayValue}`, inline: true });
        if (segment.stats.wins) splitgateStats.addFields({ name: 'Wins', value: `${segment.stats.wins.displayValue}`, inline: true });
        if (segment.stats.losses) splitgateStats.addFields({ name: 'Losses', value: `${segment.stats.losses.displayValue}`, inline: true });
        if (segment.stats.matchesPlayed) splitgateStats.addFields({ name: 'Matches Played', value: `${segment.stats.matchesPlayed.displayValue}`, inline: true });
        if (segment.stats.timePlayed) splitgateStats.addFields({ name: 'Time Played', value: `${segment.stats.timePlayed.displayValue}`, inline: true });
      } else if (!segment) {
        splitgateStats.setDescription(`${statify.Emojis.ICON_WHITE} I could not find any stats this player.`);
      }
      return splitgateStats;
    }
  },
  MINECRAFT: (data, ip, statify) => {
    let description = undefined;
    if (typeof data.description == 'string') {
      description = data.description;
    } else if (typeof data.description == 'object') {
      description = data.description.text;
    } else description = 'Unknown';
    return new EmbedBuilder()
      .setColor(statify.Colors.BLUE)
      .setTitle(`Lookup for ${ip}`)
      .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
      .setThumbnail(data.favicon)
      .setFields(
        { name: 'Online', value: `${data.online}`, inline: true },
        { name: 'Source', value: `${data.source}`, inline: true },
        { name: 'Response Time', value: `${data.took}`, inline: true },
        { name: 'Players', value: `Online: ${data.players.online}\nMax: ${data.players.max}`, inline: true },
        { name: 'Version', value: `${data.version.name}`, inline: true },
        { name: 'Description', value: `${description}` }
      );
  },
  FORTNITE: {
    NOT_FOUND: (username, platform, statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.RED)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setDescription(`${statify.Emojis.ICON_RED} ${username} not found on ${platform}`);
    },
    STATS_PRIVATE: (username, statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.RED)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setDescription(`${statify.Emojis.ICON_RED} stats for ${username} could not be fetched due to their account settings being to private!`);
    },
    STATS: (data, statify) => {
      const overall = data.stats.all.overall
      return new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setTitle(`Lookup for ${data.account.name}`)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: data.image ?? statify.user.avatarURL() })
        .setFields(
          { name: 'Wins', value: `${overall.wins}`, inline: true },
          { name: 'TOP 3', value: `${overall.top3}`, inline: true },
          { name: 'TOP 10', value: `${overall.top10}`, inline: true },
          { name: 'Kills', value: `${overall.kills}`, inline: true },
          { name: 'Deaths', value: `${overall.deaths}`, inline: true },
          { name: 'K/D', value: `${overall.kd}`, inline: true },
          { name: 'Score', value: `${overall.score}`, inline: true },
          { name: 'Players Outlived', value: `${overall.playersOutlived}`, inline: true },
          { name: 'Time Played', value: `${parseFloat(moment.duration(overall.minutesPlayed, 'minutes').asHours()).toFixed(2)} Hours`, inline: true }
        )
    }
  },
  BRAWL_STARS: {
    NOT_FOUND: (username, statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.RED)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setDescription(`${statify.Emojis.ICON_RED} Player **${username}** not found!`);
    },
    STATS: (data, statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setTitle(`Lookup for ${data.name}`)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setFields(
          { name: 'Level', value: `${data.expLevel}`, inline: true },
          { name: 'Trophies', value: `${data.trophies}`, inline: true },
          { name: 'Highest Trophies', value: `${data.highestTrophies}`, inline: true },
          { name: 'Solo Victories', value: `${data.soloVictories}`, inline: true },
          { name: 'Duo Victories', value: `${data.duoVictories}`, inline: true },
          { name: '3vs3 Victories', value: `${data["3vs3Victories"]}`, inline: true },
          { name: 'Highest Power Play Points', value: `${data.highestPowerPlayPoints}` },
        )
    }
  },
  CLASH_ROYALE: {
    NOT_FOUND: (username, statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.RED)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setDescription(`${statify.Emojis.ICON_RED} Player **${username}** not found!`);
    },
    STATS: (data, statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.BLUE)
        .setTitle(`Lookup for ${data.name}`)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setFields(
          { name: 'Level', value: `${data.expLevel}`, inline: true },
          { name: 'Trophies', value: `${data.trophies}`, inline: true },
          { name: 'Highest Trophies', value: `${data.bestTrophies}`, inline: true },
          { name: 'Wins', value: `${data.wins}`, inline: true },
          { name: 'Losses', value: `${data.losses}`, inline: true },
          { name: 'Battle Count', value: `${data.battleCount}`, inline: true },
          { name: 'Three Crown Wins', value: `${data.threeCrownWins}` },
        )
    }
  },
  CALL_OF_DUTY: {
    NOT_FOUND: (username, platform, statify) => {
      return new EmbedBuilder()
        .setColor(statify.Colors.RED)
        .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
        .setDescription(`${statify.Emojis.ICON_RED} Player **${username}** not found on **${platform}**!`);
    },
    WARZONE: {
      STATS: (data, username, statify) => {
        const WZ = new EmbedBuilder()
          .setColor(statify.Colors.BLUE)
          .setTitle(`Lookup for ${username}`)
          .setAuthor({ name: 'statify.cc', url: 'https://statify.cc/', iconURL: statify.user.avatarURL() })
          .setFooter({ text: 'All stats based of lifetime' });
  
        const stats = data.lifetime.all.properties;
  
        if (stats) {
          if (stats.kills) WZ.addFields({ name: 'Kills', value: `${stats.kills}`, inline: true });
          if (stats.deaths) WZ.addFields({ name: 'Deaths', value: `${stats.deaths}`, inline: true });
          if (stats.kdRatio) WZ.addFields({ name: 'KD', value: `${parseFloat(`${stats.kdRatio}`).toFixed(2)}`, inline: true });
          if (stats.bestKills) WZ.addFields({ name: 'Highest Kills', value: `${stats.bestKills}`, inline: true });
          if (stats.headshots) WZ.addFields({ name: 'Headshots', value: `${stats.headshots}`, inline: true });
          if (stats.assists) WZ.addFields({ name: 'Assists', value: `${stats.assists}`, inline: true });
          if (stats.scorePerGame) WZ.addFields({ name: 'Score Per Game', value: `${parseFloat(`${stats.scorePerGame}`).toFixed(2)}`, inline: true });
          if (stats.bestSPM) WZ.addFields({ name: 'Best Score Per Min', value: `${stats.bestSPM}`, inline: true });
          if (stats.bestScore) WZ.addFields({ name: 'Best Score', value: `${stats.bestScore}`, inline: true });
          if (stats.gamesPlayed) WZ.addFields({ name: 'Games Played', value: `${stats.gamesPlayed}`, inline: true });
          if (stats.recordLongestWinStreak) WZ.addFields({ name: 'Best Win Streak', value: `${stats.recordLongestWinStreak}`, inline: true });
          if (stats.recordXpInAMatch) WZ.addFields({ name: 'Best XP Match', value: `${stats.recordXpInAMatch}`, inline: true });
        } else if (!segment) {
          WZ.setDescription(`${statify.Emojis.ICON_WHITE} I could not find any stats this player.`);
        }
  
        return WZ;
      }
    }
  }
}