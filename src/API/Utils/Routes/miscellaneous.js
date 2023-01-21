const { Config } = require('../../../config');
const { Logger } = require('../../../Logger');
const Database = require('../database');
const mysql = new Database(Config.API.DATABASE, Logger);
const utils = require('../index');
exports.postSuggest = async (req, res) => {
  let api = req.headers['statify-api-key'];
  if (!api) {
    return res.json({ status: utils.HttpStatusCodes.FORBIDDEN, message: 'No API Key provided' });
  } else if (api !== Config.API.KEY) {
    return res.json({ status: utils.HttpStatusCodes.FORBIDDEN, message: 'Invalid API Key provided' });
  } else if (Object.keys(req.body).length !==  5) {
    return res.json({ status: utils.HttpStatusCodes.BAD_REQUEST, message: 'No valid JSON body was found' });
  }
  const body = JSON.parse(JSON.stringify(req.body));
  if (!mysql.connected) mysql.connect();
  let query = undefined;
  try {
    query = await mysql.query(
      'INSERT INTO suggestions (userID, serverID, suggestion, time, platform, webhookID) VALUES (?, ?, ?, ?, ?, ?)',
      body.userID,
      body.serverID,
      body.suggestion,
      new Date(),
      body.platform,
      body.webhookID
    );

    res.json({ status: utils.HttpStatusCodes.CREATED, response: query });
  } catch (error) {
    Logger.RED('api', `STAFF POST MYSQL: ${error}`);
    res.json({ status: utils.HttpStatusCodes.INTERNAL_SERVER_ERROR, error: error });
  }
}