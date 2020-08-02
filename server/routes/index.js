const routes = require('express').Router();
const userRouter = require('./user');
const participantRouter = require('./participant');

routes.get('/', (req, res, next) => {
  res.status(200).json({
    message: `Server Running!`,
  });
});
routes.use('/users', userRouter);
routes.use('/participants', participantRouter);
module.exports = routes;
