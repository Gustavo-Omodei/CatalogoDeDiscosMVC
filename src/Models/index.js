const sequelize = require('../config/database'); // Importa a instância do Sequelize
const { DataTypes } = require('sequelize');

// Importa os modelos
const Disk = require('./Disk');
const Artist = require('./Artist');
const Genre = require('./Genre');

// Relacionamentos (exemplo)
Disk.belongsTo(Artist);
Artist.hasMany(Disk);

Genre.hasMany(Disk);
Disk.belongsTo(Genre);

// Exporta o sequelize e os modelos
module.exports = {
  sequelize,
  Disk,
  Artist,
  Genre,
};
