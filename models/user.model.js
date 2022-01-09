const DataTypes = require('sequelize');
const sequelize = require('../data-access/user.connection.js');

console.log('sequelize !!!!!');
const userModel = sequelize.define(
    'users',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        is_deleted: {
            type: DataTypes.BOOLEAN
        }
    },
    {
        timestamps: false
    },
);

module.exports = userModel;
