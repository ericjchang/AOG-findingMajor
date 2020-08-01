const routes = require('express').Router();

routes.get('/', (req, res, next) => {
  res.status(200).json({
    message: `Server Running!`,
  });
});
module.exports = routes;
