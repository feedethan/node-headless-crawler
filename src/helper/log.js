/**
 * 打印不同颜色的log
 */
const chalk = require("chalk");

const log = console.log;
const error = chalk.bold.red;
const warning = chalk.keyword("orange");
const suc = chalk.bold.greenBright;

module.exports = {
  logError: txt => {
    log(error(txt));
  },
  logWarn: txt => {
    log(warning(txt));
  },
  logSuc: txt => {
    log(suc(txt));
  }
};
