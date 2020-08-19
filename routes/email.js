const routes = require('express').Router();
const Controller = require('../controllers/email');

routes.post('/materi', Controller.sendEmailMateri);
routes.post('/resend', Controller.sendRegistrationEmail);
module.exports = routes;
