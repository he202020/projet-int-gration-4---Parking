const postgres = require('postgres');
require('dotenv').config();

const sql = postgres({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DBNAME,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWD,
    ssl: {
        'rejectUnauthorized': false,
        'ca': process.env.SERVER_CA,
        'key': process.env.CLIENT_KEY,
        'cert': process.env.CLIENT_CERT
    }
});

module.exports = sql;