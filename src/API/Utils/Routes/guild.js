const { Config } = require('../../../config');
const { Logger } = require('../../../Logger');
const Database = require('../database');
const mysql = new Database(Config.API.DATABASE, Logger);
const utils = require('../index');

exports.create = async (req, res) => {
  let api = req.headers['statify-api-key'];
  if (!api) {
    return res.json({ status: utils.HttpStatusCodes.FORBIDDEN, message: 'No API Key provided' });
  } else if (api !== Config.API.KEY) {
    return res.json({ status: utils.HttpStatusCodes.FORBIDDEN, message: 'Invalid API Key provided' });
  } else if (Object.keys(req.body).length !== 1) {
    return res.json({ status: utils.HttpStatusCodes.BAD_REQUEST, message: 'No valid JSON body was found' });
  }
  const body = JSON.parse(JSON.stringify(req.body));
  if (!mysql.connected) mysql.connect();
  let query = undefined;
  try {
    query = await mysql.query(
      'INSERT INTO guild (id) VALUES (?)',
      body.discordID
    );

    res.json({ status: utils.HttpStatusCodes.CREATED, response: query });
  } catch (error) {
    Logger.RED('api', `GUILD CREATE MYSQL: ${error}`);
    res.json({ status: utils.HttpStatusCodes.INTERNAL_SERVER_ERROR, error: error });
  }
}
exports.get_guild = async (req, res) => {
  let api = req.headers['statify-api-key'];
  if (!api) {
    return res.json({ status: utils.HttpStatusCodes.FORBIDDEN, message: 'No API Key provided' });
  } else if (api !== Config.API.KEY) {
    return res.json({ status: utils.HttpStatusCodes.FORBIDDEN, message: 'Invalid API Key provided' });
  } else if (Object.keys(req.body).length !== 1) {
    return res.json({ status: utils.HttpStatusCodes.BAD_REQUEST, message: 'No valid JSON body was found' });
  }
  const body = JSON.parse(JSON.stringify(req.body));
  if (!mysql.connected) mysql.connect();
  let query = undefined;
  try {
    query = await mysql.query(
      'SELECT * FROM guild WHERE id = ?',
      body.discordID
    );
    res.json({ status: utils.HttpStatusCodes.OK, response: query });
  } catch (error) {
    Logger.RED('api', `GUILD GET MYSQL: ${error}`);
    res.json({ status: utils.HttpStatusCodes.INTERNAL_SERVER_ERROR, error: error });
  }
}

exports.get_all = async (req, res) => {
  let api = req.headers['statify-api-key'];
  if (!api) {
    return res.json({ status: utils.HttpStatusCodes.FORBIDDEN, message: 'No API Key provided' });
  } else if (api !== Config.API.KEY) {
    return res.json({ status: utils.HttpStatusCodes.FORBIDDEN, message: 'Invalid API Key provided' });
  } else if (Object.keys(req.body).length !== 1) {
    return res.json({ status: utils.HttpStatusCodes.BAD_REQUEST, message: 'No valid JSON body was found' });
  }
  const body = JSON.parse(JSON.stringify(req.body));
  if (!mysql.connected) mysql.connect();
  let query = undefined;
  try {
    query = await mysql.query(
      'SELECT * FROM guild',
      body.discordID
    );
    res.json({ status: utils.HttpStatusCodes.OK, response: query });
  } catch (error) {
    Logger.RED('api', `GUILD GET MYSQL: ${error}`);
    res.json({ status: utils.HttpStatusCodes.INTERNAL_SERVER_ERROR, error: error });
  }
}

exports.increase_cmd_count = async (req, res) => {
  let api = req.headers['statify-api-key'];
  if (!api) {
    return res.json({ status: utils.HttpStatusCodes.FORBIDDEN, message: 'No API Key provided' });
  } else if (api !== Config.API.KEY) {
    return res.json({ status: utils.HttpStatusCodes.FORBIDDEN, message: 'Invalid API Key provided' });
  } else if (Object.keys(req.body).length !== 1) {
    return res.json({ status: utils.HttpStatusCodes.BAD_REQUEST, message: 'No valid JSON body was found' });
  }
  const body = JSON.parse(JSON.stringify(req.body));
  if (!mysql.connected) mysql.connect();
  let query = undefined;
  try {
    query = await mysql.query(
      'UPDATE guild SET commands_count = commands_count + 1 WHERE id = ?',
      body.discordID
    );

    res.json({ status: utils.HttpStatusCodes.OK, response: query });
  } catch (error) {
    Logger.RED('api', `GUILD CMD INCREASE MYSQL: ${error}`);
    res.json({ status: utils.HttpStatusCodes.INTERNAL_SERVER_ERROR, error: error });
  }
}

exports.delete = async (req, res) => {
  let api = req.headers['statify-api-key'];
  if (!api) {
    return res.json({ status: utils.HttpStatusCodes.FORBIDDEN, message: 'No API Key provided' });
  } else if (api !== Config.API.KEY) {
    return res.json({ status: utils.HttpStatusCodes.FORBIDDEN, message: 'Invalid API Key provided' });
  } else if (Object.keys(req.body).length !== 1) {
    return res.json({ status: utils.HttpStatusCodes.BAD_REQUEST, message: 'No valid JSON body was found' });
  }
  const body = JSON.parse(JSON.stringify(req.body));
  if (!mysql.connected) mysql.connect();
  let query = undefined;
  try {
    query = await mysql.query(
      'DELETE FROM guild WHERE id = ?',
      body.discordID
    );

    res.json({ status: utils.HttpStatusCodes.OK, response: query });
  } catch (error) {
    Logger.RED('api', `GUILD DELETE MYSQL: ${error}`);
    res.json({ status: utils.HttpStatusCodes.INTERNAL_SERVER_ERROR, error: error });
  }
}