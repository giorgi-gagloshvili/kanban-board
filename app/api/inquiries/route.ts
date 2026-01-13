import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "public", "inquiries.json");

export const GET = async (request: Request) => {
  try {
    const jsonData = await fs.readFile(DATA_PATH, "utf-8");
    let data = JSON.parse(jsonData);

    const { searchParams } = new URL(request.url);
    const clientName = searchParams.get("clientName")?.toLowerCase();
    const potentialValue = searchParams.get("potentialValue");
    const startDateQuery = searchParams.get("startDate"); // e.g., "2026-02-01"
    const endDateQuery = searchParams.get("endDate"); // e.g., "2026-02-28"

    data = data.filter((item: any) => {
      const matchesName = clientName
        ? item.clientName?.toLowerCase().includes(clientName)
        : true;

      const matchesValue = potentialValue
        ? item.potentialValue > Number(potentialValue)
        : true;

      const itemDate = item.createdAt;

      let matchesDates = true;

      if (startDateQuery && itemDate) {
        matchesDates = matchesDates && itemDate >= startDateQuery;
      }

      if (endDateQuery && itemDate) {
        matchesDates = matchesDates && itemDate <= endDateQuery;
      }

      return matchesName && matchesValue && matchesDates;
    });

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
};
