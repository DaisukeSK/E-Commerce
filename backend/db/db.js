import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
    user: process.env.user,
    host: process.env.host,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port_db,
    max: 4
});

export default pool;