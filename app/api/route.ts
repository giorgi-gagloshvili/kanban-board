import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "inquiries.json");

export const GET = async () => {
  try {
    const jsonData = await fs.readFile(DATA_PATH, "utf-8");
    const data = JSON.parse(jsonData);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
};

export const PATCH = async (request: Request) => {
  console.log(request);
  return NextResponse.json({ message: "UPDATED" });
};
