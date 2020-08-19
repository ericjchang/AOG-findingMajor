const routes = require('express').Router();
const Controller = require('../controllers/participant');
const { authentication } = require('../middlewares/auth');

routes.post('/', Controller.create);
routes.post('/email', Controller.findEmail);

routes.get('/', Controller.findAll);
routes.get('/count', Controller.groupAndCount);
routes.get('/parse', Controller.parseGroup);
routes.get('/download', Controller.download);
routes.put('/:id', Controller.update);
routes.delete('/:id', Controller.delete);

module.exports = routes;
