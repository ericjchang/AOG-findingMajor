const jwt = require('jsonwebtoken');

module.exports = {
  generateToken: (dataUser) => {
    return jwt.sign(
      {
        id: dataUser.id,
        email: dataUser.email,
      },
      process.env.SECRET
    );
  },

  verify: (access_token) => {
    return jwt.verify(access_token, process.env.SECRET);
  },
};
