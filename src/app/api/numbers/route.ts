import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { initNumbersTable } from "@/lib/initSchema";
import {
  getPaginatedNumberPairs,
  getTotalNumberPairCount,
} from "@/lib/numbers.sql";
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

    await pool.query("INSERT INTO numbers (value) VALUES ($1);", [numberValue]);

    return NextResponse.json(
      { message: "Number saved successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: msg.FAILD_TO_LOAD_DATA },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "0", 10);
    const rowsPerPage = parseInt(
      url.searchParams.get("rowsPerPage") || "5",
      10
    );
    const offset = page * rowsPerPage;

    const data = await getPaginatedNumberPairs(rowsPerPage, offset);

    const totalCount = await getTotalNumberPairCount();

    return NextResponse.json(
      { data, totalCount },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: msg.FAILD_TO_LOAD_DATA },
      { status: 500 }
    );
  }
};
