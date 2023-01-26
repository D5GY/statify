const { Config } = require('../../../config');
const discordStrategy = require('passport-discord').Strategy;
const { WebhookClient } = require('discord.js');
const { discordImageURL } = require('..');
const loginWebhook = new WebhookClient({ id: Config.WEBHOOKS.LOGIN_LOGS.ID, token: Config.WEBHOOKS.LOGIN_LOGS.TOKEN });

module.exports = (passport) => {
  passport.use(new discordStrategy({
    clientID: Config.DEVELOPMENT_MODE ? Config.WEBSITE.AUTH.DEVELOPMENT.CLIENT_ID : Config.WEBSITE.AUTH.PRODUCTION.CLIENT_ID,
    clientSecret: Config.DEVELOPMENT_MODE ? Config.WEBSITE.AUTH.DEVELOPMENT.CLIENT_SECRET : Config.WEBSITE.AUTH.PRODUCTION.CLIENT_SECRET,
    callbackURL: '/auth/login',
    scope: Config.WEBSITE.AUTH.SCOPES
  }, (accessToken, refreshToken, profile, callback) => {
    loginWebhook.send({
      embeds: [{
        color: 0x417bd2,
        author: { name: 'statify login' },
        thumbnail: { url: discordImageURL('avatars', profile.id, profile.avatar) },
        description: `User: <@${profile.id}>\nUser Tag: ${profile.username}#${profile.discriminator}\nID: ${profile.id}\nGuild Count: ${profile.guilds.length}\nTime: <t:${Math.floor(Date.now() / 1000)}:R>`
      }]
    });
    return callback(null, profile);
  }));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
}