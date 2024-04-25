const chalk = require('chalk');
const logger = require('../config/logger');

const loggerInfo = (str) => {
  logger.info(chalk.blueBright(str));
};

const infoLog = loggerInfo;

const loggerError = (error) => {
  logger.error(chalk.redBright(error));
};

const errorLog = loggerError;

module.exports = {
  loggerInfo,
  loggerError,

  infoLog,
  errorLog,
};
