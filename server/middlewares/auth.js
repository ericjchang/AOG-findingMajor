'use strict';

const { verify } = require('../helpers/jwt');
const { User } = require('../models');

const authentication = (req, res, next) => {
  const { access_token } = req.headers;
  if (!access_token) return next({ name: 'ACCESS_TOKEN_ERR', message: 'access_token is required' });

  try {
    const data_decoded = verify(access_token, process.env.SECRET);

    User.findByPk(data_decoded.id)
      .then((result) => {
        if (result) {
          req.userData = data_decoded;
          return next();
        } else {
          return next({ name: 'NOT_FOUND_ERR', messsage: 'User not found' });
        }
      })
      .catch((err) => {
        return next(err);
      });
  } catch (error) {
    return next({ name: 'ACCESS_TOKEN_ERR' });
  }
};

const authorization = (req, res, next) => {
  const id = +req.params.id;

  User.findByPk(id)
    .then((result) => {
      if (result) {
        return next();
      } else {
        return next({ name: 'NOT_FOUND_ERR', message: 'User not found' });
      }
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = { authentication, authorization };
