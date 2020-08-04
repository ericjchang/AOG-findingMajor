const CronJob = require('cron').CronJob;
const moment = require('moment');
const { Participant } = require('../models');
const Op = require('sequelize').Op;
const axios = require('axios');

let job = new CronJob(
  '0 0 6 * * *',
  () => {
    Participant.findAndCountAll({
      where: {
        createdAt: {
          [Op.lte]: moment().subtract(0, 'days').toDate(),
        },
      },
    })
      .then((result) => {
        return axios.post(
          `https://api.telegram.org/bot619693189:AAEoIZSh3L-CT2OE_AKmO2rYThKDu_s0yLo/sendMessage?chat_id=-1001225487468&text=${encodeURI(
            `Total registered user : ${result.count} user - ${moment().subtract(0, 'days').toDate()}`
          )}`
        );
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  null,
  true,
  'Asia/Jakarta'
);

module.exports = job;
