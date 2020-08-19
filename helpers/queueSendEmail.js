const { sendEmailRegistration } = require('./nodemailer');
const Bull = require('bull');
let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const queueSendEmail = new Bull('send-email', REDIS_URL);

function materiEmail(email) {
  queueSendEmail.add({ email });
}

queueSendEmail.process((job, done) => {
  const { email } = job.data;
  sendEmailRegistration(email);
  done(null, `email send to ${email}`);
});

queueSendEmail.on('completed', (job, result) => {
  console.log(result);
});

module.exports = materiEmail;
