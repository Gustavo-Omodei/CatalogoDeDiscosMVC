const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artist = sequelize.define('Artist', {
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
});

module.exports = Artist;
