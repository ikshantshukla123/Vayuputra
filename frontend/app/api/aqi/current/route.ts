import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "lat and lon required" },
      { status: 400 }
    );
  }

  const token = process.env.WAQI_TOKEN;

  const res = await fetch(
    `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${token}`,
    { next: { revalidate: 600 } } // cache 10 min
  );

  const json = await res.json();

  if (json.status !== "ok") {
    return NextResponse.json(
      { error: "Failed to fetch AQI" },
      { status: 500 }
    );
  }

  const aqi = json.data.aqi;

  return NextResponse.json({
    aqi,
    category:
      aqi <= 50
        ? "Good"
        : aqi <= 100
          ? "Moderate"
          : aqi <= 200
            ? "Poor"
            : aqi <= 300
              ? "Very Poor"
              : "Severe",
    dominant_pollutant: json.data.dominentpol,
    updated_at: json.data.time.iso,
    source: "WAQI",
  });
}
