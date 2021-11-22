import Sequelize from 'sequelize';
import pg from 'pg';
import config from '../config/properties.config.mjs';

pg.defaults.ssl = true;

const sequelize = new Sequelize(config.url);

sequelize
    .sync()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelize;
