import { pool } from "./db";

let numbersInitialized = false,
  gradesInitialized = false;

// ALTER TABLE numbers ALTER COLUMN value TYPE BIGINT;

export const initNumbersTable = async () => {
  if (numbersInitialized) return;
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS numbers (
        id SERIAL PRIMARY KEY,
        value BIGINT NOT NULL
      );`
    );
    console.log("Tables 'numbers' initialized!");
    numbersInitialized = true;
  } catch (error) {
    console.error("Error initializing numbers schema:", error);
  }
};

export const initGradesTable = async () => {
  if (gradesInitialized) return;
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS grades (
        id SERIAL PRIMARY KEY,
        class TEXT NOT NULL,
        grade BIGINT NOT NULL
      );`
    );
    console.log("Table 'grades' initialized!");
    gradesInitialized = true;
  } catch (error) {
    console.error("Error initializing grades schema:", error);
  }
};
