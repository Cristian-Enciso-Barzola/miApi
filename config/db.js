
const { Sequelize } = require('sequelize');
require('dotenv').config({ override: true });

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: 3306,
        dialect: 'mysql',
        logging: false
    }
);

module.exports = sequelize;
