const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('CatalogoDiscos', 'postgres', 'senha', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false, 
    underscored: false,
  }
});

module.exports = sequelize;