import { NextResponse } from "next/server";
import { initGradesTable } from "@/lib/initSchema";
import { numberVavidationCheck } from "@/helpers/utils";
import { pool } from "@/lib/db";
import { msg } from "@/constants/messages";
import { getGradeNumbers } from "@/lib/grades.sql";

await initGradesTable();

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    if (
      typeof body !== "object" ||
      !("classValue" in body) ||
      !("gradeValue" in body)
    ) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    let { classValue, gradeValue } = body;

    gradeValue = numberVavidationCheck(gradeValue, 0, 100);

    if (gradeValue === null || classValue === "")
      return NextResponse.json(
        { message: "Invalid grade or class value" },
        { status: 400 }
      );

    await pool.query(`INSERT INTO grades (class, grade) VALUES ($1, $2)`, [
      classValue,
      gradeValue,
    ]);

    return NextResponse.json(
      {
        message: `Class Name: ${classValue} and Grade Number: ${gradeValue} saved successfully!`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: msg.FAILD_TO_LOAD_DATA },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const data = await getGradeNumbers();

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: msg.FAILD_TO_LOAD_DATA },
      { status: 500 }
    );
  }
};
