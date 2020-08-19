'use strict';
const { Participant, sequelize } = require('../models');
const registrationEmail = require('../helpers/queueSendEmail');
const materiEmail = require('../helpers/queueSendEmailMateri');

class emailController {
  static sendRegistrationEmail(req, res, next) {
    const { email } = req.body;
    registrationEmail(email);
    res.status(200).json({ message: 'done' });
  }

  static sendEmailMateri(req, res, next) {
    Participant.findAll()
      .then((result) => {
        let count = 0;
        result.forEach((el) => {
          count++;
          // console.log(el.email, el.group);
          materiEmail(el.email, el.group);
        });
        res.status(200).json({ message: 'success', totalEmail: count });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = emailController;
