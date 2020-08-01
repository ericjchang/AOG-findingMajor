'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class User extends Model {}

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
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
        validate: {
          notEmpty: {
            args: true,
            msg: `Password is required`,
          },
          len: {
            args: [8, 9999],
            msg: `Password length must be more than 8 characters`,
          },
        },
      },
    },
    { sequelize }
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
