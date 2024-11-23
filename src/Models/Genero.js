const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database'); // Volta duas pastas para acessar config

class Genero extends Model {}

Genero.init(
    {
        idGenero: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,  
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Genero',
        tableName: 'genero',
        timestamps: false,
    }
);

module.exports = Genero;
