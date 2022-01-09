const Sequelize = require('sequelize');
const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();
pg.defaults.ssl = true;

const sequelize = new Sequelize(process.env.DB_URL);

sequelize
    .sync()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
