import DataTypes from 'sequelize';
import sequelize from '../data-access/user.connection.mjs';
import config from '../config/properties.config.mjs';

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
                        console.log(val);
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

export default groupModel;
