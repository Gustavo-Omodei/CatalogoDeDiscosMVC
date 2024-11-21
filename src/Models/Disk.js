const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/database');

class Disk extends Model {}

Disk.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        releaseYear: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        coverImage: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'Disk',
        tableName: 'disks', // Nome da tabela no banco de dados
    }
);

module.exports = Disk;
