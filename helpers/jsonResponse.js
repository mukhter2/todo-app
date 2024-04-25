const chalk = require('chalk');
const logger = require('../config/logger');

const sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

const sendErrorResponse = function (res, status, type, content) {
  const errorBody = {
    status: status,
    type: type || 'CustomError',
    errors: [content],
  };
  if (content && content.message) {
    logger.error(chalk.redBright(content.message));
  }
  res.status(status);
  res.json(errorBody);
};

module.exports = {
  sendJSONresponse,
  sendErrorResponse,
};
