const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Track = sequelize.define('Track', {
    title: DataTypes.STRING,
    duration: DataTypes.STRING,
});

module.exports = Track;
