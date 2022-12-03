const express = require('express');
const { Logger } = require('../Logger');
const { WEBSITE } = require('../config').Config;
const app = express();
const ejs = require('ejs');
const { join } = require('path');
const passport = require('passport');
const session = require('express-session');
const crypto = require('crypto');

app.use('html', ejs.renderFile);
app.set('views', join(__dirname, 'pages'));
app.set('view engine', 'ejs');
app.use(express.static(join(__dirname, 'public')));

//Discord Auth

require('./Utils/Auth/passport')(passport);

app.use(session({
  secret: crypto.randomBytes(20).toString('hex'),
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/api/login', require('./Utils/Auth/Login'));
app.get('/logout', require('./Utils/Auth/Logout'));

// Routes
app.get('/', require('./Utils/Routes/home'));
app.get('/login', require('./Utils/Routes/login'));
app.get('/dashboard/index', require('./Utils/Routes/Dashboard/'));


// redirects

app.get('/discord', (req, res) => {
  res.redirect(WEBSITE.URLs.DISCORD_INVITE);
});

app.get('/invite', (req, res) => {
  res.redirect(WEBSITE.URLs.BOT_INVITE);
});

app.get('/vote', (req, res) => {
  res.redirect(WEBSITE.URLs.TOP_GG);
});

app.get('/github', (req, res) => {
  res.redirect(WEBSITE.URLs.GITHUB);
});

// Start Website
app.listen(WEBSITE.PORT, ()=> {
  Logger.GREEN('website', `online on port ${WEBSITE.PORT}`);
});