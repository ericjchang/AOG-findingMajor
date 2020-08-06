'use strict';
const participants = require('../data.json');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Participants', participants, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Participants', null, {});
  },
};
