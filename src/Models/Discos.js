const Artistas = require('./Artistas'); // Certifique-se de que a importação está correta
const Faixas = require('./Faixas'); // Certifique-se de que a importação está correta
const sequelize = require('../../config/database'); // Volta duas pastas para acessar config
const { Model, DataTypes } = require('sequelize');
const Genero = require('./Genero'); // Certifique-se de que a importação está correta

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
        capaImagem: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'capaImagem',
        },
        idgenero: {
            type: DataTypes.INTEGER,
            allowNull: false, // Defina como obrigatório ou não, dependendo da sua lógica
            references: {
                model: Genero,
                key: 'idgenero',
            },
        },
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
    otherKey: 'idArtista', // Chave estrangeira para Artistas
    as: 'Artistas',
});

Artistas.belongsToMany(Discos, {
    through: 'artistas_discos', // Tabela intermediária
    foreignKey: 'idArtista', // Chave estrangeira para Artistas
    otherKey: 'idDisco' // Chave estrangeira para Discos
});

Discos.hasMany(Faixas, {
    foreignKey: 'idDisco',
    as: 'faixas'
});

Faixas.belongsTo(Discos, {
    foreignKey: 'idDisco',  // Chave estrangeira no modelo Faixas
    as: 'disco',  // Alias para o relacionamento
});

Discos.belongsTo(Genero, {
    foreignKey: 'idgenero',
    as: 'genero',
});

Genero.hasMany(Discos, {
    foreignKey: 'idgenero',
    as: 'discos',
});

module.exports = Discos;

