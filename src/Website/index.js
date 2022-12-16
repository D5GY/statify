const express = require('express');
const { Logger } = require('../Logger');
const { WEBSITE, WEBHOOKS, DEVELOPMENT_MODE } = require('../config').Config;
const app = express();
const ejs = require('ejs');
const { join } = require('path');
const passport = require('passport');
const session = require('express-session');
const crypto = require('crypto');
const { WebhookClient } = require('discord.js');
const WebsiteWebhook = new WebhookClient({ id: WEBHOOKS.WEBSITE_LOGS.ID, token: WEBHOOKS.WEBSITE_LOGS.TOKEN });


app.use('html', ejs.renderFile);
app.set('views', join(__dirname, 'Pages'));
app.set('view engine', 'ejs');
app.use(express.static(join(__dirname, 'Public')));

// Discord Auth
require('./Utils/Auth/passport')(passport);
app.use(session({ secret: crypto.randomBytes(20).toString('hex'), resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Login & Logout
app.get('/auth/login', require('./Utils/Auth/Login'));
app.get('/logout', require('./Utils/Auth/Logout'));

// Routes
app.get('/', require('./Utils/Routes/home'));
app.get('/commands', require('./Utils/Routes/commands'));

// Dashboard Routes
app.get('/login', require('./Utils/Routes/login'));
app.get('/dashboard/index', require('./Utils/Routes/Dashboard/'));

// Redirects
app.get('/discord', (req, res) => { res.redirect(WEBSITE.URLs.DISCORD_INVITE) });
app.get('/invite', (req, res) => { res.redirect(WEBSITE.URLs.BOT_INVITE) });
app.get('/vote', (req, res) => { res.redirect(WEBSITE.URLs.TOP_GG) });
app.get('/github', (req, res) => { res.redirect(WEBSITE.URLs.GITHUB) });

// Error
app.get('*', require('./Utils/Routes/error'));

// Start Website
app.listen(WEBSITE.PORT, () => {
  Logger.GREEN('website', `online on port ${WEBSITE.PORT}`);
  if (!DEVELOPMENT_MODE) {
    WebsiteWebhook.send({
      embeds: [{
        color: 0x417bd2,
        author: { name: 'statify Website' },
        description: `Website online using proxy port ${WEBSITE.PORT}\nTime: <t:${Math.floor(Date.now() / 1000)}:R>`
      }]
    });
  }
});