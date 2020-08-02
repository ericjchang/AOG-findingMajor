const routes = require('express').Router();
const Controller = require('../controllers/user');
const { authentication } = require('../middlewares/auth');

routes.post('/login', Controller.login);
routes.post('/register', Controller.register);
routes.post('/update-password', authentication, Controller.updatePassword);

module.exports = routes;
