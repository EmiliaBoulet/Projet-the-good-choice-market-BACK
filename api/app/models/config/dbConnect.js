import pkg from "pg";
const { Pool } = pkg;

//? Le process.env.NODE_ENV sur le local est "undefined" et sur heroku il est en "production"
//? console.log(process.env.NODE_ENV);

export default () => {
    if (!process.env.NODE_ENV) {
        const pool = new Pool({
            host: process.env.PGHOST,
            port: process.env.PGPORT,
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            database: process.env.PGDATABASE,
            max: 20,
            idleTimeoutMillis: 2000,
            connectionTimeoutMillis: 2000,
        });
        return pool;
    } else {
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false,
            },
            max: 20,
            idleTimeoutMillis: 2000,
            connectionTimeoutMillis: 2000,
        });
        return pool;
    }
};
