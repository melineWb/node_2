import Sequelize from 'sequelize';
import pg from 'pg';
import dotenv from 'dotenv';

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

export default sequelize;
