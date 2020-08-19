'use strict';
const nodemailer = require('nodemailer');
const axios = require('axios');
let { template } = require('./templateMateri');

module.exports = {
  sendEmailMateri: async (userEmail, userGroup) => {
    try {
      let link;
      switch (userGroup) {
        case 1:
          link = 'https://chat.whatsapp.com/IFLwIg6Zdhz794WTv4OmEm';
          break;
        case 2:
          link = 'https://chat.whatsapp.com/BvhgrnXl9VOA4rnk8JzujV';
          break;
        case 3:
          link = 'https://chat.whatsapp.com/LbA5SvXe7QK4lIglQiDw8U';
          break;
        case 4:
          link = 'https://chat.whatsapp.com/Ei53qu6hH2SA41d9luhJrN';
          break;
        case 5:
          link = 'https://chat.whatsapp.com/F0XHPgwMwLKKe1ZRUvJqFh';
          break;
      }

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
        subject: 'Finding Major Subjects',
        html: template(link),
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
