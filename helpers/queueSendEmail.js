const { sendEmailRegistration } = require('./nodemailer');
const Bull = require('bull');
const queueSendEmail = new Bull('send-email');

function registrationEmail(email) {
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

module.exports = registrationEmail;
