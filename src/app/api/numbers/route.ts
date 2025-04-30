// import { connectToDatabase } from "@/lib/connection";
import { NumberEntity } from "@/entities/NumberEntity";
import { msg } from "@/constants/messages";

await initSchema();

// Route Handlers

interface NumbersResponse {
  id: number;
  value: number;
}

import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { initSchema } from "@/lib/initSchema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let { numberValue } = body;

    numberValue = Number(numberValue);

    if (!Number.isFinite(numberValue)) {
      throw new Error("Validation failed!");
    }

    const client = await pool.connect();

    const result = await client.query(
      "INSERT INTO numbers (value) VALUES ($1) RETURNING id, value;",
      [numberValue]
    );

    client.release();

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("error:", error);
    return NextResponse.json(
      { message: msg.FAILD_TO_LOAD_DATA },
      { status: 500 }
    );
  }
}
