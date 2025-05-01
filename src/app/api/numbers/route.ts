import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { initNumbersTable } from "@/lib/initSchema";
import { msg } from "@/constants/messages";

await initNumbersTable();

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    let { numberValue } = body;

    numberValue = Number(numberValue);

    if (!Number.isFinite(numberValue)) {
      throw new Error("Validation failed!");
    }

    const result = await pool.query(
      "INSERT INTO numbers (value) VALUES ($1) RETURNING id, value;",
      [numberValue]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("error:", error);
    return NextResponse.json(
      { message: msg.FAILD_TO_LOAD_DATA },
      { status: 500 }
    );
  }
};
