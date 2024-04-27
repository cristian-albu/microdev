import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.RL_CONNECTION_STR,
});

export default pool;
