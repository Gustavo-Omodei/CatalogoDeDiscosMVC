'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('faixas', {
      idFaixa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idGenero: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'genero',
          key: 'idGenero',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      idDisco: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'discos',
          key: 'idDisco',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('faixas');
  },
};
