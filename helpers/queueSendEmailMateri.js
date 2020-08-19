const { sendEmailMateri } = require('./nodemailerMateri');
const Bull = require('bull');
let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const queueSendEmail = new Bull('send-email', REDIS_URL);

function registrationEmail(email, id_group) {
  queueSendEmail.add({ email, id_group });
}

queueSendEmail.process((job, done) => {
  const { email, id_group } = job.data;
  sendEmailMateri(email, id_group);
  done(null, `email materi send to ${email}`);
});

queueSendEmail.on('completed', (job, result) => {
  console.log(result);
});

module.exports = registrationEmail;
