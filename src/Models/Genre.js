const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Genre = sequelize.define('Genre', {
    name: DataTypes.STRING,
});

module.exports = Genre;
