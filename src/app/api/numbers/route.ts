import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { initNumbersTable } from "@/lib/initSchema";
import { msg } from "@/constants/messages";

await initNumbersTable();

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    if (typeof body !== "object" || !("numberValue" in body)) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    let { numberValue } = body;
    // for (let i = 0; i < 100_000_000; i++) {
    // simulate hard calc
    numberValue = parseFloat(numberValue); // insdeaf of Number(""), it treats "" as 0
    // }

    if (!Number.isInteger(numberValue) || numberValue === 0) {
      return NextResponse.json(
        { message: "Number validation failed!" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      "INSERT INTO numbers (value) VALUES ($1) RETURNING id, value;",
      [numberValue]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("error:", error); // avoid printing sensetive info in production
    return NextResponse.json(
      { message: msg.FAILD_TO_LOAD_DATA },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const allNumbersResult = await pool.query(`
      SELECT
        n1.id AS id1,
        n1.value AS number1,
        n2.id AS id2,
        n2.value AS number2,
        n1.value + n2.value AS sum
      FROM numbers n1
      JOIN numbers n2 ON n2.id = n1.id + 1
      ORDER BY n1.id
      `);

    return NextResponse.json(allNumbersResult.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: msg.FAILD_TO_LOAD_DATA },
      { status: 500 }
    );
  }
};
