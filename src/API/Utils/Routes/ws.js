const udp = require('dgram');
const { Config } = require('../../../config');
const { Logger } = require('../../../Logger');
const client = udp.createSocket('udp4');
const utils = require('../index');

exports.get_guild = (req, res) => {
  let api = req.headers['statify-api-key'];
  if (!api) {
    return res.json({ status: utils.HttpStatusCodes.FORBIDDEN, message: 'No API Key provided' });
  } else if (api !== Config.API.KEY) {
    return res.json({ status: utils.HttpStatusCodes.FORBIDDEN, message: 'Invalid API Key provided' });
  } else if (Object.keys(req.body).length !== 1) {
    return res.json({ status: utils.HttpStatusCodes.BAD_REQUEST, message: 'No valid JSON body was found' });
  }
  client.send(Buffer.from(`get_guild_${req.body.discordID}`), Config.SOCKET.PORT, 'localhost', (error, bytes) => {
    if (error) {
      console.log(error);
      client.close();
    }
  });

  client.once('message', (message, info) => {
    res.json({ status: utils.HttpStatusCodes.OK, response: message.toString() });
  });
  client.once('error', (err) => {
    res.json({ status: utils.HttpStatusCodes.INTERNAL_SERVER_ERROR, response: err });
    client.close();
  });
}