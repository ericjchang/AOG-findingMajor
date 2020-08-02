'use strict';

const { hash } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class User extends Model {}

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Email is required`,
          },
          notNull: {
            msg: `Email is required`,
          },
          isEmail: {
            args: true,
            msg: `Please enter a valid email format`,
          },
        },
        unique: {
          args: true,
          msg: `Email already exist`,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Password is required`,
          },
          notNull: {
            msg: `Password is required`,
          },
          len: {
            args: [8, 9999],
            msg: `Password length must be more than 8 characters`,
          },
        },
      },
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (user, options) => {
          user.password = hash(user.password);
        },
      },
    }
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
