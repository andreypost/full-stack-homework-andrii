import { pool } from "./db";

export const getPaginatedNumberPairs = async (
  limit: number,
  offset: number
) => {
  const result = await pool.query(
    `
    SELECT
        n1.id AS id1,
        n1.value AS number1,
        n2.id AS id2,
        n2.value AS number2,
        (n1.value + n2.value)::BIGINT AS sum
    FROM numbers n1
    JOIN numbers n2 ON n2.id = n1.id + 1
    ORDER BY n1.id
    LIMIT $1 OFFSET $2;
    `,
    [limit, offset]
  );

  return result.rows;
};

export const getTotalNumberPairCount = async () => {
  const result = await pool.query(`
        SELECT COUNT(*) AS total
        FROM numbers n1
        JOIN NUMBERS n2 ON n2.id = n1.id + 1;
      `);

  return parseInt(result.rows[0].total || "0", 10);
};
