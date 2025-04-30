import { pool } from "./db";

export async function initSchema() {
  const client = await pool.connect();

  try {
    // numbers table
    await client.query(
      `CREATE TABLE IF NOT EXISTS numbers (
            id SERIAL PRIMARY KEY,
            value INTEGER NOT NULL
            );
        `
    );

    // grades table
    await client.query(`
        CREATE TABLE IF NOT EXISTS grades (
          id SERIAL PRIMARY KEY,
          class TEXT NOT NULL,
          grade INTEGER NOT NULL
        );
      `);

    console.log("Tables 'numbers' and 'grades' initialized!.");
  } catch (error) {
    console.error("Error initializing schema:", error);
  } finally {
    client.release();
  }
}
