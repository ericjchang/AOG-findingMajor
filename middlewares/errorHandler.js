'use strict';

function errorHandler(err, req, res, next) {
  let statusCode;
  let errorMessage;
  let errorCode;
  const validationErr = [];

  console.log(err);
  switch (err.name) {
    case 'SequelizeValidationError':
      statusCode = 400;
      errorCode = 'VALIDATION_ERR';

      err.errors.forEach((el) => {
        validationErr.push(el.message);
      });

      errorMessage = validationErr;
      break;

    case 'SequelizeUniqueConstraintError':
      statusCode = 400;
      errorCode = 'VALIDATION_ERR';

      err.errors.forEach((el) => {
        validationErr.push(el.message);
      });

      errorMessage = validationErr;
      break;

    case 'BAD_REQUEST_ERR':
      statusCode = 400;
      errorMessage = err.message || 'Bad Request';
      errorCode = err.name;
      break;

    case 'ACCESS_TOKEN_ERR':
      statusCode = 401;
      errorMessage = err.message || 'access_token is invalid';
      errorCode = err.name;
      break;

    case 'AUTHORIZATION_ERR':
      statusCode = 403;
      errorMessage = err.message || 'Unauthorize';
      errorCode = err.name;
      break;

    case 'NOT_FOUND_ERR':
      statusCode = 404;
      errorMessage = err.message || 'Not Found';
      errorCode = err.name;
      break;

    default:
      statusCode = 500;
      errorMessage = 'Internal Server Error';
      errorCode = 'INTERNAL_SERVER_ERR';
      break;
  }

  res.status(statusCode).json({
    status: statusCode,
    message: errorMessage,
    errorCode,
  });
}

module.exports = errorHandler;
