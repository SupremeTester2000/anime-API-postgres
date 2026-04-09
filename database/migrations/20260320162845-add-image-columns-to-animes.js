'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Animes', 'image_url', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('Animes', 'image_public_id', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Animes', 'image_url');
    await queryInterface.removeColumn('Animes', 'image_public_id');
  }
};
