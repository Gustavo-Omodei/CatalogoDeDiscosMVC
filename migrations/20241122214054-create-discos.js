'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('discos', {
      idDisco: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      anoLancamento: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      capaImagem: {
        type: Sequelize.STRING,
      },
      idArtista: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'artistas',
          key: 'idArtista',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('discos');
  },
};
