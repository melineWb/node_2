const DataTypes = require('sequelize');
const sequelize = require('../data-access/user.connection.js');
const config = require('../config/properties.config.js');

const groupModel = sequelize.define(
    'groups',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            validate: {
                permossionsValidator(values) {
                    const isAllowedValues = values.every((val) => {
                        return config.allowedPropertiesPermissions.includes(val);
                    });

                    if (!isAllowedValues) {
                        throw new Error('Wrong permissions types');
                    }
                }
            }
        }
    },
    {
        timestamps: false
    },
);

module.exports = groupModel;
