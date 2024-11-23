const Artistas = require('./Artistas'); // Certifique-se de que a importação está correta
const sequelize = require('../../config/database'); // Volta duas pastas para acessar config
const { Model, DataTypes } = require('sequelize');

class Discos extends Model {}

Discos.init(
    {
        idDisco: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            field:'idDisco'
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        anoLancamento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field:'anoLancamento',
        },
        capa: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'capaImagem',
        }
    },
    {
        sequelize,
        modelName: 'Discos',
        tableName: 'discos',
        timestamps: false // Se você não estiver usando `createdAt` e `updatedAt`
    }
);

// Associação entre Discos e Artistas (Muitos para Muitos)
Discos.belongsToMany(Artistas, {
    through: 'artistas_discos', // Tabela intermediária
    foreignKey: 'idDisco', // Chave estrangeira para Discos
    otherKey: 'idArtista' // Chave estrangeira para Artistas
});

Artistas.belongsToMany(Discos, {
    through: 'artistas_discos', // Tabela intermediária
    foreignKey: 'idArtista', // Chave estrangeira para Artistas
    otherKey: 'idDisco' // Chave estrangeira para Discos
});

module.exports = Discos;

