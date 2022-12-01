const { Config } = require('../../../config');
const discordStrategy = require('passport-discord').Strategy;

module.exports = (passport) => {
  passport.use(new discordStrategy({
    clientID: Config.DEVELOPMENT_MODE ? Config.WEBSITE.AUTH.DEVELOPMENT.CLIENT_ID : Config.WEBSITE.AUTH.PRODUCTION.CLIENT_ID,
    clientSecret: Config.DEVELOPMENT_MODE ? Config.WEBSITE.AUTH.DEVELOPMENT.CLIENT_SECRET : Config.WEBSITE.AUTH.PRODUCTION.CLIENT_SECRET,
    callbackURL: '/api/login',
    scope: Config.WEBSITE.AUTH.SCOPES
  }, (accessToken, refreshToken, profile, callback) => {
    return callback(null, profile);
  }));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
}