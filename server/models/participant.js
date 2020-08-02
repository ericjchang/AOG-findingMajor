'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class Participant extends Model {}

  Participant.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Name can't be empty`,
          },
          notNull: {
            msg: `Name can't be empty`,
          },
          len: {
            args: [5, 999],
            msg: `Name length must be more then 5 characters`,
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Email can't be empty`,
          },
          notNull: {
            msg: `Email can't be empty`,
          },
          isEmail: {
            args: true,
            msg: `Please enter a valid email format`,
          },
        },
        unique: {
          args: true,
          msg: `Email alredy exist`,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Phone number can't be empty`,
          },
          notNull: {
            msg: `Phone number can't be empty`,
          },
          len: {
            args: [5, 999],
            msg: `Phone number length must be more then 5 characters`,
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Address can't be empty`,
          },
          notNull: {
            msg: `Address can't be empty`,
          },
          len: {
            args: [8, 999],
            msg: `Address length must be more then 8 characters`,
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Status can't be empty`,
          },
          notNull: {
            msg: `Status can't be empty`,
          },
        },
      },
      major: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Major can't be empty`,
          },
          notNull: {
            msg: `Major can't be empty`,
          },
          len: {
            args: [5, 999],
            msg: `Major length must be more then 5 characters`,
          },
        },
      },
      institution: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Institution can't be empty`,
          },
          notNull: {
            msg: `Institution can't be empty`,
          },
          len: {
            args: [5, 999],
            msg: `Institution length must be more then 5 characters`,
          },
        },
      },
      region: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Region can't be empty`,
          },
          notNull: {
            msg: `Region can't be empty`,
          },
          len: {
            args: [5, 999],
            msg: `Region length must be more then 5 characters`,
          },
        },
      },
    },
    { sequelize }
  );
  Participant.associate = function (models) {
    // associations can be defined here
  };
  return Participant;
};
