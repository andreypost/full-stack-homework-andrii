// import { connectToDatabase } from "@/lib/connection";
import { NumberEntity } from "@/entities/NumberEntity";
import { msg } from "@/constants/messages";

// Route Handlers

interface NumbersResponse {
  id: number;
  value: number;
}

import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { numberValue } = body;

    console.log("numberValue:", numberValue);

    const client = await pool.connect();

    return NextResponse.json({ id: 122, numberValue }, { status: 200 });
  } catch (error) {
    console.error("error:", error);
    return NextResponse.json(
      { message: msg.FAILD_TO_LOAD_DATA },
      { status: 500 }
    );
  }
}
