const Discos = require('./Discos'); 
const sequelize = require('../../config/database'); // Volta duas pastas para acessar config
const { Model, DataTypes } = require('sequelize');

class Artistas extends Model {}

Artistas.init(
    {
        idArtista: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            field: 'idArtista'
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idGenero: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'generoMusical'
        }
    },
    {
        sequelize,
        modelName: 'Artistas',
        tableName: 'artistas',
        timestamps: false,
    }
);

module.exports = Artistas;
