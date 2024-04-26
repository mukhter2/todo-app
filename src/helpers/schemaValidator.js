const _ = require('lodash');
const { sendJSONresponse } = require('./jsonResponse');

module.exports = (_schema, useJoiError = true) => {
  const _useJoiError = _.isBoolean(useJoiError) && useJoiError;

  return (req, res, next) => {
    _schema
      .validate(req, {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
      })
      .then((validatedChanges) => {
        req.body = validatedChanges.body;
        next();
        return null;
      })
      .catch((validationError) => {
        const errors = validationError.details.map((d) => {
          let message = d.message.replace(/['"]/g, '');
          const fieldName = d.path[1];
          return {
            message,
            fieldName,
          };
        });
        const JoiError = {
          type: 'ValidationError',
          status: 400,
          errors,
        };
        const customError = {
          error: 'Invalid request data. Please review request and try again.',
        };
        return sendJSONresponse(
          res,
          400,
          _useJoiError ? JoiError : customError,
        );
      });
  };
};
