const sequelize = require('../../config/database');

const {Discos, Artistas, Faixas,Genero} = require('./Discos', './Artistas', './Faixas', './Genero')

// const Discos = require('./Discos');
// const Artistas = require('./Artistas');
// const Faixas = require('./Faixas');
// const Genero = require('./Genero');

module.exports = {
    sequelize,
    Discos,
    Artistas,
    Faixas,
    Genero,
};
