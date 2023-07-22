const { Pool } = require('pg');

const db = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123456',
    database: 'tdo',
});

module.exports = { db };
