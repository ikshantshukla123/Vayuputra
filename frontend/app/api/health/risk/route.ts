import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { aqi, profile } = body;

  let risk = "Moderate";

  if (aqi > 300) risk = "High";
  if (aqi > 400) risk = "Severe";
  if (profile?.condition === "asthma") risk = "Severe";

  return NextResponse.json({
    risk_level: risk,
    message:
      risk === "Severe"
        ? "Avoid outdoor exposure completely"
        : "Limit outdoor activity",
  });
}
