import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    severe_days_2023: 47,
    asthma_increase_percent: 35,
    estimated_deaths_per_year: 54000,
    school_closure_days: 47,
    sources: ["CPCB", "WAQI", "WHO"],
  });
}
