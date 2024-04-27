import { PoolClient } from "pg";
import pool from "./client";
import { Parents, Students } from "./schema";

async function createTable(client: PoolClient, query: string) {
    try {
        const result = await client.query(query);
        return result;
    } catch (error) {
        console.error(
            `Error creating table: ${query.split("TABLE ")[1].split("(")[0]}`
        );
        throw error;
    }
}

async function buildSchema() {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        await Promise.all([
            createTable(client, Parents),
            createTable(client, Students),
        ]);

        await client.query("COMMIT");

        console.log("Schema built successfully");
    } catch (error) {
        console.log(error);
        await client.query("ROLLBACK");
        console.error("Schema build aborted.");
    } finally {
        client.release();
    }
}

buildSchema();
