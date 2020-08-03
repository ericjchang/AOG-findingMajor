'use strict';
const nodemailer = require('nodemailer');
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
    }
  },
};
