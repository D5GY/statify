const {green, blue, red, yellow, cyan, magenta} = require('chalk');

exports.Logger = {
  GREEN: (type, ...string) => {
    console.log(green(`[ statify ] [ Type: ${type.toLowerCase()} ] [ Date/Time: ${new Date().toLocaleString()} ] - ${string}`));
  },
  BLUE: (type, ...string) => {
    console.log(blue(`[ statify ] [ Type: ${type.toLowerCase()} ] [  Date/Time: ${new Date().toLocaleString()} ] - ${string}`));
  },
  RED: (type, ...string) => {
    console.log(red(`[ statify ] [ Type: ${type.toLowerCase()} ] [  Date/Time: ${new Date().toLocaleString()} ] - ${string}`));
  },
  YELLOW: (type, ...string) => {
    console.log(yellow(`[ statify ] [ Type: ${type.toLowerCase()} ] [  Date/Time: ${new Date().toLocaleString()} ] - ${string}`));
  },
  CYAN: (type, ...string) => {
    console.log(cyan(`[ statify ] [ Type: ${type.toLowerCase()} ] [  Date/Time: ${new Date().toLocaleString()} ] - ${string}`));
  },
  MAGENTA: (type, ...string) => {
    console.log(magenta(`[ statify ] [ Type: ${type.toLowerCase()} ] [  Date/Time: ${new Date().toLocaleString()} ] - ${string}`));
  },
}