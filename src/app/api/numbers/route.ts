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

    if (!Number.isInteger(numberValue)) {
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
