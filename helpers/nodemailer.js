'use strict';
const nodemailer = require('nodemailer');
const axios = require('axios');
let template = require('./templateEmail');

module.exports = {
  sendEmailRegistration: async (userEmail) => {
    try {
      let transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.co.id',
        port: 587,
        secure: false,
        auth: {
          user: 'no-reply@gmssidoarjo.com',
          pass: 'Adminsidoarjo000',
        },
      });

      let info = await transporter.sendMail({
        from: 'no-reply@gmssidoarjo.com',
        to: `${userEmail}`,
        subject: 'Finding Major Registration',
        html: template,
      });

      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.log(error);
      axios
        .post(
          `https://api.telegram.org/bot619693189:AAEoIZSh3L-CT2OE_AKmO2rYThKDu_s0yLo/sendMessage?parse_mode=markdown&chat_id=534595367&text=${encodeURI(
            `send email to ${userEmail} failed, with error => ${error}`
          )}`
        )
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
