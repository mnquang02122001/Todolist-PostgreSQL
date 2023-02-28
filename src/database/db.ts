import {Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tasks',
    password: process.env.PG_PASSWORD,
    port: 10000
})

export default pool;