'use strict';
const { hash, compare } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { User } = require('../models');

class userController {
  static register(req, res, next) {
    const { email, password } = req.body;

    User.create({ email, password })
      .then((result) => {
        res.status(201).json({ data: { id: result.id, email: result.email } });
      })
      .catch((err) => {
        next(err);
      });
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email,
      },
    })
      .then((result) => {
        if (result) {
          if (compare(password, result.password)) {
            const access_token = generateToken({ id: result.id, email: result.email });
            res.status(200).json({ access_token });
          } else {
            next({ name: 'BAD_REQUEST_ERR', message: 'Invalid email/password' });
          }
        } else {
          next({ name: 'BAD_REQUEST_ERR', message: 'Invalid email/password' });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static updatePassword(req, res, next) {
    const { id, email } = req.userData;
    const { password, newPassword } = req.body;

    User.findOne({
      where: {
        email,
      },
    })
      .then((result) => {
        if (result) {
          if (compare(password, result.password)) {
            return User.update(
              { password: hash(newPassword) },
              {
                where: { id },
              }
            );
          } else {
            next({ name: 'BAD_REQUEST_ERR', message: 'Invalid email/password' });
          }
        } else {
          next({ name: 'BAD_REQUEST_ERR', message: 'Invalid email/password' });
        }
      })
      .then((result) => {
        if (result == 1) res.status(200).json({ message: 'Password updated successfully' });
        if (result == 0) next({ name: 'NOT_FOUND_ERR' });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = userController;
