const upd = require('dgram');
const { Config } = require('../../config');

exports.WS = (statify, logger) => {
  const server = upd.createSocket('udp4');
  server.bind(Config.SOCKET.PORT);
  server.on('error', (error) => {
    logger.RED('socket', error);
    server.close();
  });
  server.on('listening', () => {
    const addr = server.address();
    logger.GREEN('socket', `Server started: ${addr.address}:${addr.port} (${addr.family})`);
  });

  server.on('message', async (msg, info) => {
    const message = msg.toString();
    if (message.includes('get_guild_')) {
      const ID = message.split('_')[2];
      await statify.guilds.fetch(ID).then(res => {
        server.send([Buffer.from(JSON.stringify(res))], info.port, 'localhost', (error, bytes) => {
          if (error) {
            console.log(error);
          }
        });
      }).catch(error => {
        server.send([Buffer.from(JSON.stringify(error.rawError))], info.port, 'localhost', (error, bytes) => {
          if (error) {
            console.log(error);
          }
        });
      });
    } else {
      server.send(Buffer.from('ERROR: unknown else if'), info.port, 'localhost');
    }
  });
}