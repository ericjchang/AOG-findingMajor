const bcrypt = require('bcrypt');

module.exports = {
  hash: (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },

  compare: (password, hashed) => {
    return bcrypt.compareSync(password, hashed);
  },
};
