"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  AQIMap,
  CitySnapshot,
  AQIHeatmap,
  HistoricalTrends,
  VulnerableGroups,
  ImpactStats,
} from "@/features/reports";
import { CallToAction } from "@/features/landing";

// --------------- helpers ---------------

function getAQICategory(aqi: number) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive";
  if (aqi <= 200) return "Poor";
  if (aqi <= 300) return "Very Poor";
  return "Severe";
}

function getAQIColor(aqi: number) {
  if (aqi <= 50) return "text-green-400";
  if (aqi <= 100) return "text-yellow-400";
  if (aqi <= 200) return "text-orange-400";
  return "text-red-500";
}

function getRiskLabel(aqi: number) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive";
  if (aqi <= 200) return "Poor";
  if (aqi <= 300) return "Very Poor";
  if (aqi <= 400) return "Severe";
  return "Severe+";
}

function formatTime(iso: string) {
  try {
    const d = new Date(iso);
    return (
      d.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      }) + " IST"
    );
  } catch {
    return "";
  }
}

// --------------- types ---------------

interface DelhiData {
  aqi: number;
  category: string;
  dominant_pollutant: string;
  city: string;
  pollutants: {
    pm25: number | null;
    pm10: number | null;
    no2: number | null;
    so2: number | null;
    o3: number | null;
    co: number | null;
  };
  weather: {
    temperature: number | null;
    humidity: number | null;
    wind_speed: number | null;
  };
  forecast: {
    pm25: { avg: number; day: string; max: number; min: number }[];
    pm10: { avg: number; day: string; max: number; min: number }[];
  };
  updated_at: string;
}

interface Station {
  id: string;
  name: string;
  aqi: number;
  category: string;
  dominant_pollutant: string | null;
  pollutants: {
    pm25: number | null;
    pm10: number | null;
    no2: number | null;
    so2: number | null;
    o3: number | null;
    co: number | null;
  };
  weather: {
    temperature: number | null;
    humidity: number | null;
    wind_speed: number | null;
  };
  updated_at: string | null;
}

interface StationsData {
  total_stations: number;
  aggregate: {
    avg_aqi: number | null;
    max_aqi: number | null;
    min_aqi: number | null;
    avg_pm25: number | null;
    max_pm25: number | null;
    avg_pm10: number | null;
    max_pm10: number | null;
    worst_station: string | null;
    best_station: string | null;
  };
  stations: Station[];
}

// --------------- component ---------------

export default function ReportsPage() {
  const [data, setData] = useState<DelhiData | null>(null);
  const [stationsData, setStationsData] = useState<StationsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/aqi/delhi").then((r) => r.json()),
      fetch("/api/aqi/stations").then((r) => r.json()),
    ])
      .then(([delhiJson, stationsJson]) => {
        if (delhiJson.error) throw new Error(delhiJson.error);
        setData(delhiJson);
        if (!stationsJson.error) setStationsData(stationsJson);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // --- Loading state ---
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-amber-400" />
          <p className="mt-4 text-sm text-slate-400">
            Fetching live data from 50+ monitoring stations…
          </p>
        </div>
      </main>
    );
  }

  // --- Error state ---
  if (error || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <p className="text-lg text-red-400">Failed to load live data</p>
          <p className="mt-2 text-sm text-slate-500">{error}</p>
        </div>
      </main>
    );
  }

  // --- Derive component props from live data ---

  const agg = stationsData?.aggregate;
  const pm25 = agg?.avg_pm25 ?? data.pollutants.pm25;
  const pm10 = agg?.avg_pm10 ?? data.pollutants.pm10;
  const avgAqi = agg?.avg_aqi ?? data.aqi;
  const maxAqi = agg?.max_aqi ?? data.aqi;
  const pm25Ratio = pm25 ? Math.round(pm25 / 25) : null; // WHO 24h guideline

  const snapshotStats = [
    {
      title: "Avg AQI (All Stations)",
      value: String(avgAqi),
      meta: `${getAQICategory(avgAqi)} | ${formatTime(data.updated_at)}`,
      subtext: `${stationsData?.total_stations ?? "—"} stations across Delhi-NCR`,
      trend: getAQICategory(avgAqi),
      color: getAQIColor(avgAqi),
    },
    {
      title: "Worst Station AQI",
      value: String(maxAqi),
      meta: agg?.worst_station ?? "—",
      subtext: `${getAQICategory(maxAqi)} — highest reading`,
      trend: getAQICategory(maxAqi),
      color: getAQIColor(maxAqi),
    },
    {
      title: "Avg PM2.5",
      value: pm25 !== null ? `${pm25} µg/m³` : "N/A",
      meta: "WHO limit: 25 µg/m³",
      subtext: pm25Ratio ? `${pm25Ratio}x safe limit` : undefined,
      trend:
        pm25 && pm25 > 150
          ? "Hazardous"
          : pm25 && pm25 > 100
            ? "Very Unhealthy"
            : "Unhealthy",
      color: pm25 && pm25 > 150 ? "text-red-500" : "text-orange-400",
    },
    {
      title: "Dominant Pollutant",
      value: data.dominant_pollutant?.toUpperCase() || "PM2.5",
      meta: `Temp: ${data.weather.temperature ?? "—"}°C`,
      subtext: `Humidity: ${data.weather.humidity ? Math.round(data.weather.humidity) : "—"}% · Wind: ${data.weather.wind_speed ?? "—"} m/s`,
      color: "text-amber-400",
    },
  ];

  // Forecast heatmap from WAQI daily pm25 forecast
  const forecastData = (data.forecast.pm25 ?? []).slice(0, 7).map((entry) => ({
    hour: new Date(entry.day).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    }),
    aqi: entry.avg,
    risk: getRiskLabel(entry.avg),
  }));

  // Trend chart from forecast
  const historicalFromForecast = (data.forecast.pm25 ?? []).map((entry) => ({
    year: new Date(entry.day).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    }),
    aqi: entry.avg,
    deaths: 0,
  }));

  // Top 10 worst stations for Vulnerable Areas section
  const worstStations = (stationsData?.stations ?? []).slice(0, 10).map((s) => ({
    area: s.name,
    aqi: s.aqi,
    population: s.category,
    schools: 0,
  }));

  return (
    <main className="bg-black pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/child.jpg"
            alt="Child wearing mask in toxic Delhi air"
            fill
            className="object-cover scale-105"
            style={{ objectPosition: "50% 30%" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10"
        >
          <p className="text-sm uppercase tracking-[0.5em] text-red-400/80 font-semibold">
            Live Report •{" "}
            {new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <h1 className="mt-4 text-5xl font-bold text-white sm:text-7xl max-w-3xl">
            Delhi-NCR AQI:{" "}
            <span className={getAQIColor(avgAqi)}>{avgAqi}</span>
          </h1>
          <p className="mt-4 text-xl text-slate-300 max-w-2xl">
            {pm25Ratio ? `PM2.5 at ${pm25Ratio}x WHO safe limit. ` : ""}
            Live data from {stationsData?.total_stations ?? "50+"} monitoring
            stations across Delhi-NCR.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
            </span>
            <span className="text-sm text-red-300">
              Live data from CPCB • Updated {formatTime(data.updated_at)}
            </span>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="mx-auto mt-12 w-full max-w-6xl px-6 sm:px-10">
        <CitySnapshot stats={snapshotStats} />
      </section>

      {/* Live AQI Map */}
      <section className="mx-auto mt-16 w-full max-w-6xl px-6 sm:px-10">
        <AQIMap />
      </section>

      {/* Daily Forecast */}
      {forecastData.length > 0 && (
        <section className="mx-auto mt-16 w-full max-w-6xl px-6 sm:px-10">
          <AQIHeatmap forecast={forecastData} />
        </section>
      )}

      {/* Forecast Trends Chart */}
      {historicalFromForecast.length > 0 && (
        <section className="mx-auto mt-16 w-full max-w-6xl px-6 sm:px-10">
          <HistoricalTrends data={historicalFromForecast} />
        </section>
      )}

      {/* Worst Stations & Impact */}
      <section className="mx-auto mt-16 w-full max-w-6xl px-6 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-2">
          {worstStations.length > 0 && (
            <VulnerableGroups areas={worstStations} />
          )}
          <ImpactStats />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-16 w-full max-w-6xl px-6 sm:px-10">
        <CallToAction />
      </section>
    </main>
  );
}