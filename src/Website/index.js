const express = require('express');
const { Logger } = require('../Logger');
const { WEBSITE } = require('../config').Config;
const Utils = require('./Utils');
const app = express();
const router = express.Router();
const ejs = require('ejs');
const { join } = require('path');

app.use('html', ejs.renderFile);
app.set('views', join(__dirname, 'pages'));
app.set('view engine', 'ejs');
app.use(express.static(join(__dirname, 'public')));
app.use('/', router);
app.listen(WEBSITE.PORT, ()=> {
  Logger.GREEN('website', `online on port ${WEBSITE.PORT}`);
});

router.get('/', (req, res) => {
  Utils.renderPage(req, res, 'index.ejs', {
    title: 'statify - Home',
    user: null
  });
});
router.get('/discord', (req, res) => {
  res.redirect(WEBSITE.URLs.DISCORD_INVITE)
});
router.get('/invite', (req, res) => {
  res.redirect(WEBSITE.URLs.BOT_INVITE)
});
router.get('/vote', (req, res) => {
  res.redirect(WEBSITE.URLs.TOP_GG)
});