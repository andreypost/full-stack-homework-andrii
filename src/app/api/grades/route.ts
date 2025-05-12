import { NextResponse } from "next/server";
import { initGradesTable } from "@/lib/initSchema";
import { msg } from "@/constants/messages";

await initGradesTable();

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    console.log("body: ", body);

    return NextResponse.json(
      {
        message: "Class Name Grade saved successfully!",
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
