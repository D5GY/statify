const express = require('express');
const { Logger } = require('../Logger');
const { WEBSITE } = require('../config').Config;
const app = express();

app.listen(WEBSITE.PORT, ()=> {
  Logger.GREEN('website', 'online');
});