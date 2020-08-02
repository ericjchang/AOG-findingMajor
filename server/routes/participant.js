const routes = require('express').Router();
const Controller = require('../controllers/participant');
const { authentication } = require('../middlewares/auth');

routes.post('/', Controller.create);

routes.use(authentication);
routes.get('/', Controller.findAll);
routes.put('/:id', Controller.update);
routes.delete('/:id', Controller.delete);

module.exports = routes;
