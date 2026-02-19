import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.WAQI_TOKEN;

  const res = await fetch(
    `https://api.waqi.info/feed/delhi/?token=${token}`,
    { next: { revalidate: 900 } } // cache 15 min
  );

  const json = await res.json();

  if (json.status !== "ok") {
    return NextResponse.json(
      { error: "Failed to fetch Delhi AQI" },
      { status: 500 }
    );
  }

  const d = json.data;
  const aqi = d.aqi;

  return NextResponse.json({
    aqi,
    category:
      aqi <= 50
        ? "Good"
        : aqi <= 100
          ? "Moderate"
          : aqi <= 150
            ? "Unhealthy for Sensitive"
            : aqi <= 200
              ? "Poor"
              : aqi <= 300
                ? "Very Poor"
                : "Severe",
    dominant_pollutant: d.dominentpol,
    city: d.city?.name ?? "Delhi",
    station_geo: d.city?.geo ?? [28.6139, 77.209],
    attributions: d.attributions ?? [],
    pollutants: {
      pm25: d.iaqi?.pm25?.v ?? null,
      pm10: d.iaqi?.pm10?.v ?? null,
      no2: d.iaqi?.no2?.v ?? null,
      so2: d.iaqi?.so2?.v ?? null,
      o3: d.iaqi?.o3?.v ?? null,
      co: d.iaqi?.co?.v ?? null,
    },
    weather: {
      temperature: d.iaqi?.t?.v ?? null,
      humidity: d.iaqi?.h?.v ?? null,
      wind_speed: d.iaqi?.w?.v ?? null,
      wind_direction: d.iaqi?.wd?.v ?? null,
      pressure: d.iaqi?.p?.v ?? null,
      dew: d.iaqi?.dew?.v ?? null,
    },
    forecast: {
      pm25: d.forecast?.daily?.pm25 ?? [],
      pm10: d.forecast?.daily?.pm10 ?? [],
      uvi: d.forecast?.daily?.uvi ?? [],
    },
    updated_at: d.time?.iso ?? new Date().toISOString(),
    source: "WAQI",
  });
}

