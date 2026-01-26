import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    return NextResponse.json({ message: "SUCCESS" });
  } catch (err) {
    return NextResponse.json({ message: "FAILED" }, { status: 500 });
  }
};
