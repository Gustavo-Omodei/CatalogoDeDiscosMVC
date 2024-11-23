'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('artistas', {
      idArtista: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      generoMusical: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('artistas');
  },
};
