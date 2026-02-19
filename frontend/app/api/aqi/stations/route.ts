import { NextResponse } from "next/server";

const STATION_ENDPOINTS = [
  "sonipat",
  "baghpat",
  "bawana",
  "narela",
  "alipur",
  "delhi/dtu",
  "rohini",
  "delhi/shaheed-sukhdev-college-of-business-studies--rohini",
  "delhi/iti-jahangirpuri",
  "loni",
  "delhi/burari-crossing",
  "delhi/sonia-vihar-water-treatment-plant-djb",
  "delhi/delhi-institute-of-tool-engineering--wazirpur",
  "bahadurgarh",
  "delhi/mundka",
  "delhi/punjabi-bagh",
  "delhi/iti-shahdra--jhilmil-industrial-area",
  "delhi/shadipur",
  "delhi/anand-vihar",
  "delhi/mandir-marg",
  "delhi/ito",
  "delhi/major-dhyan-chand-national-stadium.",
  "delhi/mother-dairy-plant--parparganj",
  "delhi/lodhi-road",
  "delhi/jawaharlal-nehru-stadium",
  "delhi/national-institute-of-malaria-research--sector-8--dwarka",
  "delhi/r.k.-puram",
  "delhi/pgdav-college--sriniwaspuri",
  "delhi/sri-auribindo-marg",
  "india/noida/sector-116",
  "india/noida/sector-1",
  "india/noida/sector-62",
  "india/ghaziabad/indirapuram",
  "india/ghaziabad/vasundhara",
  "delhi/crri-mathura-road",
  "india/noida/sector-125",
  "delhi/dite-okhla",
  "delhi/aya-nagar",
  "delhi/bramprakash-ayurvedic-hospital--najafgarh",
  "india/gurgaon/vikas-sadan-gurgaon",
  "india/gurugram/nise-gwal-pahari",
  "india/gurugram/sector-51",
  "india/manesar/sector-2-imt",
  "delhi/dr.-karni-singh-shooting-range",
  "india/faridabad/sector-30",
  "india/faridabad/new-industrial-town",
  "india/faridabad/sector-11",
  "india/ballabgarh/nathu-colony",
  "india/greater-noida/knowledge-park-iii",
  "india/greater-noida/knowledge-park-v",
];

function getCategory(aqi: number) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive";
  if (aqi <= 200) return "Poor";
  if (aqi <= 300) return "Very Poor";
  return "Severe";
}

export async function GET() {
  const token = process.env.WAQI_TOKEN;

  // Fetch all stations in parallel
  const results = await Promise.allSettled(
    STATION_ENDPOINTS.map(async (endpoint) => {
      const res = await fetch(
        `https://api.waqi.info/feed/${endpoint}/?token=${token}`,
        { next: { revalidate: 900 } } // cache 15 min
      );
      const json = await res.json();
      if (json.status !== "ok") return null;
      return json.data;
    })
  );

  const stations = results
    .map((r, i) => {
      if (r.status !== "fulfilled" || !r.value) return null;
      const d = r.value;
      const aqi = typeof d.aqi === "number" ? d.aqi : parseInt(d.aqi, 10);
      if (isNaN(aqi)) return null;

      // Extract a short name from the city name
      const fullName: string = d.city?.name ?? STATION_ENDPOINTS[i];
      const shortName = fullName
        .replace(/,\s*(Delhi|India|Haryana|Uttar Pradesh).*$/i, "")
        .replace(/^(delhi|india)\//i, "")
        .trim();

      return {
        id: STATION_ENDPOINTS[i],
        name: shortName,
        aqi,
        category: getCategory(aqi),
        dominant_pollutant: d.dominentpol ?? null,
        geo: d.city?.geo ?? null,
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
        },
        updated_at: d.time?.iso ?? null,
      };
    })
    .filter(Boolean);

  // Sort by AQI descending (worst first)
  stations.sort((a, b) => (b?.aqi ?? 0) - (a?.aqi ?? 0));

  // Compute aggregate stats
  const aqiValues = stations.map((s) => s!.aqi);
  const pm25Values = stations.map((s) => s!.pollutants.pm25).filter((v): v is number => v !== null);
  const pm10Values = stations.map((s) => s!.pollutants.pm10).filter((v): v is number => v !== null);

  const avg = (arr: number[]) => arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : null;
  const max = (arr: number[]) => arr.length ? Math.max(...arr) : null;
  const min = (arr: number[]) => arr.length ? Math.min(...arr) : null;

  return NextResponse.json({
    total_stations: stations.length,
    fetched_at: new Date().toISOString(),
    aggregate: {
      avg_aqi: avg(aqiValues),
      max_aqi: max(aqiValues),
      min_aqi: min(aqiValues),
      avg_pm25: avg(pm25Values),
      max_pm25: max(pm25Values),
      avg_pm10: avg(pm10Values),
      max_pm10: max(pm10Values),
      worst_station: stations[0]?.name ?? null,
      best_station: stations[stations.length - 1]?.name ?? null,
    },
    stations,
  });
}
