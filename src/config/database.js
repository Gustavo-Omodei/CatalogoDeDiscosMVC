const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('CatalogoDiscos', 'postgres', 'senha', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: true, 
    underscored: true
  }
});

module.exports = sequelize;