module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('artistas_discos', {
      idArtista: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'artistas', // Nome da tabela 'artistas'
          key: 'idArtista'
        },
        onDelete: 'CASCADE'
      },
      idDisco: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field:'idDisco',
        references: {
          model: 'discos', // Nome da tabela 'discos'
          key: 'idDisco'
        },
        onDelete: 'CASCADE'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('artistas_discos');
  }
};
