const getFiles = new Date();
const { WebhookClient } = require('discord.js');
const { Logger } = require('../Logger');
const { WEBSITE, DEVELOPMENT_MODE, WEBHOOKS } = require('../config').Config;
const { join } = require('path');
const express = require('express');
const app = express();
const ejs = require('ejs');
const passport = require('passport');
const session = require('express-session');
const crypto = require('crypto');
const WebsiteOnline = new WebhookClient({ id: WEBHOOKS.WEBSITE_LOGS.ID, token: WEBHOOKS.WEBSITE_LOGS.TOKEN });

app.use('html', ejs.renderFile);
app.set('views', join(__dirname, 'Pages'));
app.set('view engine', 'ejs');
app.use(express.static(join(__dirname, 'Public')));

require('./Utils/Auth/passport')(passport);
app.use(session({ secret: crypto.randomBytes(20).toString('hex'), resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/login', require('./Utils/Auth/Login'));
app.get('/logout', require('./Utils/Auth/Logout'));
app.get('/login', require('./Utils/Routes/login'));

app.get('/', require('./Utils/Routes/home'));
app.get('/commands', require('./Utils/Routes/commands'));
app.get('/status', require('./Utils/Routes/status'));
app.get('/about', require('./Utils/Routes/about'));

app.get('/dashboard', require('./Utils/Routes/Dashboard/index'));
app.get('/dashboard/:id/information', require('./Utils/Routes/Dashboard/information'));
app.get('/dashboard/:id/customize', require('./Utils/Routes/Dashboard/customize'));
app.get('/dashboard/:id/settings', require('./Utils/Routes/Dashboard/settings'));
app.get('/dashboard/:id/remove', (req, res) => {
  
});

app.get('/discord', (req, res) => { res.redirect(WEBSITE.URLs.DISCORD_INVITE) });
app.get('/invite', (req, res) => { res.redirect(WEBSITE.URLs.BOT_INVITE) });
app.get('/vote', (req, res) => { res.redirect(WEBSITE.URLs.TOP_GG) });
app.get('/github', (req, res) => { res.redirect(WEBSITE.URLs.GITHUB) });

app.get('*', require('./Utils/Routes/error'));

const gotFiles = new Date();

app.listen(WEBSITE.PORT, () => { 
  Logger.BLUE('website', 'Building wesbite');
  Logger.BLUE('website', 'Website built');
  Logger.BLUE('website', `Time to build: ${gotFiles - getFiles} milliseconds`)
  Logger.BLUE('website', `Online on port ${WEBSITE.PORT}`);
  if (!DEVELOPMENT_MODE) {
    WebsiteOnline.send({
      embeds: [{ color: '', author: { name: 'statify' }, description: `Website is now online using proxy port ${WEBSITE.PORT}`, timestamp: new Date().toLocaleString() }]
    }).catch((error) => { Logger.RED('website', `Seems a problem was encountered sending website online webhook. \n Error: ${error}`) });
  }
});