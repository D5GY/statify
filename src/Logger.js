const {green, blue, red, yellow, cyan, magenta} = require('chalk');

exports.Logger = {
  GREEN: (type, ...string) => {
    console.log(green(`[statify ${type.toLowerCase()}] [${new Date().toDateString()}] - ${string}`));
  },
  BLUE: (type, ...string) => {
    console.log(blue(`[statify ${type.toLowerCase()}] [${new Date().toDateString()}] - ${string}`));
  },
  RED: (type, ...string) => {
    console.log(red(`[statify ${type.toLowerCase()}] [${new Date().toDateString()}] - ${string}`));
  },
  YELLOW: (type, ...string) => {
    console.log(yellow(`[statify ${type.toLowerCase()}] [${new Date().toDateString()}] - ${string}`));
  },
  CYAN: (type, ...string) => {
    console.log(cyan(`[statify ${type.toLowerCase()}] [${new Date().toDateString()}] - ${string}`));
  },
  MAGENTA: (type, ...string) => {
    console.log(magenta(`[statify ${type.toLowerCase()}] [${new Date().toDateString()}] - ${string}`));
  },
}