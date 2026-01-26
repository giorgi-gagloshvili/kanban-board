import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { TCard } from "@/lib/types";

const DATA_PATH = path.join(process.cwd(), "public", "inquiries.json");

export const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;
    const body = await request.json();

    const jsonData = await fs.readFile(DATA_PATH, "utf-8");
    const inquiries = JSON.parse(jsonData);
    const index = inquiries.findIndex((item: TCard) => item.id === id);
    // console.log({ id, body, index });

    if (index < 0) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    inquiries[index] = {
      ...inquiries[index],
      ...body,
    };
    await fs.writeFile(DATA_PATH, JSON.stringify(inquiries));
    return NextResponse.json(
      { message: "UPDATE", data: inquiries },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
};
