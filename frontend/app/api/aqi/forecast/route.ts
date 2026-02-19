import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat") ?? "28.6139";
  const lon = searchParams.get("lon") ?? "77.2090";

  const token = process.env.WAQI_TOKEN;

  const res = await fetch(
    `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${token}`,
    { next: { revalidate: 1800 } } // cache 30 min
  );

  const json = await res.json();

  if (json.status !== "ok") {
    return NextResponse.json(
      { error: "Failed to fetch forecast" },
      { status: 500 }
    );
  }

  // WAQI returns forecast data in json.data.forecast.daily
  const forecast = json.data.forecast?.daily ?? {};

  return NextResponse.json({
    city: json.data.city?.name ?? "Delhi",
    forecast: {
      pm25: forecast.pm25 ?? [],
      pm10: forecast.pm10 ?? [],
      o3: forecast.o3 ?? [],
    },
    updated_at: json.data.time.iso,
    source: "WAQI",
  });
}
