import { pool } from "./db";

export const getGradeNumbers = async () => {
  const result = await pool.query(`
        SELECT * FROM grades;
        `);
  return result.rows;
};
