module.exports = {
    HOST: process.env.MYSQLDB_LOCAL,
    USER: process.env.MYSQLDB_USER,
    PASSWORD: process.env.MYSQLDB_ROOT_PASSWORD,
    DB: process.env.MYSQLDB_DATABASE,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    SECRET: process.env.SECRET,
    JWT_EXPIRES_IN: process.env.EXPIRES_IN,
};
