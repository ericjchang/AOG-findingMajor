const routes = require('express').Router();
const userRouter = require('./user');
const participantRouter = require('./participant');
const emailRouter = require('./email');

routes.get('/', (req, res, next) => {
  res.status(200).json({
    message: `Server Running!`,
  });
});
routes.use('/users', userRouter);
routes.use('/participants', participantRouter);
routes.use('/email', emailRouter);
module.exports = routes;
