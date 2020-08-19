'use strict';
const registrationEmail = require('../helpers/queueSendEmail');

class emailController {
  static sendRegistrationEmail(req, res, next) {
    const { email } = req.body;
    registrationEmail(email);
    res.status(200).json({ message: 'done' });
  }
}

module.exports = emailController;
