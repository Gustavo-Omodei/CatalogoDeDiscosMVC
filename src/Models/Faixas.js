const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Volta duas pastas para acessar config
const Discos = require('./Discos');
const Genero = require('./Genero'); // Importação do modelo Genero

class Faixas extends Model {}

Faixas.init(
    {
        idFaixa: {
            type: DataTypes.INTEGER,
            primaryKey: true,  // Chave primária
            autoIncrement: true,  // Auto incremento
            allowNull: false,
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,  // O título da faixa é obrigatório
        },
        idGenero: {
            type: DataTypes.INTEGER,
            allowNull: false,  // O idGenero é obrigatório
            references: {
                model: Genero,  // Nome da tabela de generos
                key: 'idGenero',  // Chave primária de generos
            },
        },
        idDisco: {
            type: DataTypes.INTEGER,
            allowNull: false,  // O disco é obrigatório
            references: {
                model: Discos,
                key: 'idDisco',  // Chave primária de discos
            },
        },
    },
    {
        sequelize,
        modelName: 'Faixas',
        tableName: 'faixas',
        timestamps: false,
    }
);

// Relacionamento com Discos (muitas faixas pertencem a um disco)
Faixas.belongsTo(Discos, {
    foreignKey: 'idDisco',  // Chave estrangeira no modelo Faixas
    as: 'disco',  // Alias para o relacionamento
});

// Relacionamento com Genero (faixas pertencem a um genero)
Faixas.belongsTo(Genero, {
    foreignKey: 'idGenero',  // Chave estrangeira no modelo Faixas
    as: 'genero',  // Alias para o relacionamento
});

module.exports = Faixas;
