const express = require('express');
const { Config } = require('../config');
const { Logger } = require('../Logger');
const app = express();
const staff = require('./Utils/Routes/staff');
const misc = require('./Utils/Routes/miscellaneous');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/staff', staff.get);
app.delete('/api/staff/:discordID', staff.delete)
app.post('/api/staff', staff.post);

app.post('/api/suggest', misc.postSuggest);

app.listen(Config.API.PORT, () => {
  Logger.GREEN('API', 'Online');
});