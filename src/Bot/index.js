const statify = require('./Core/statify');
statify.start();

// Log all errors and warnings.

statify.on('error', (error) => {
  statify.logger.RED(bot, error);
  statify.webhooks.errorLogs.send({
    content: '<@&1037116954416255007>',
    embeds: [{
      color: statify.Colors.RED,
      author: { name: `statify client error: ${error.name}` },
      description: error.message
    }]
  });
});

statify.on('warn', (message) => {
  statify.logger.YELLOW('bot', message);
  statify.webhooks.errorLogs.send({
    content: '<@&1037116954416255007>',
    embeds: [{
      color: statify.Colors.YELLOW,
      author: { name: `statify client warning` },
      description: message
    }]
  });
});

if (statify.config.DEVELOPMENT_MODE) {
  statify.on('debug', (message) => {
    statify.logger.YELLOW('bot', message)
  });
}

process.on('uncaughtException', (error) => {
  statify.logger.RED(bot, error);
  statify.webhooks.errorLogs.send({
    content: '<@&1037116954416255007>',
    embeds: [{
      color: statify.Colors.RED,
      author: { name: `statify uncaughtException: ${error.name}` },
      description: error.message
    }]
  });
});

process.on('unhandledRejection', (error) => {
  statify.logger.RED(bot, error);
  statify.webhooks.errorLogs.send({
    content: '<@&1037116954416255007>',
    embeds: [{
      color: statify.Colors.RED,
      description: 'statify unhandledRejection, check VPS logs!'
    }]
  });
});