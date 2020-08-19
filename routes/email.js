const routes = require('express').Router();
const Controller = require('../controllers/email');

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'email endpoints' });
});
routes.post('/resend', Controller.sendRegistrationEmail);
module.exports = routes;
