"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  CitySnapshot,
  AQIHeatmap,
  HistoricalTrends,
  VulnerableGroups,
  ImpactStats,
} from "@/features/reports";
import { CallToAction } from "@/features/landing";

const snapshotStats = [
  { title: "Current AQI", value: "487", meta: "Severe | 6:00 AM IST", subtext: "Anand Vihar, Delhi", trend: "+12% in 24h", color: "text-red-500" },
  { title: "PM2.5", value: "332 µg/m³", meta: "WHO limit: 25 µg/m³", subtext: "13x safe limit", trend: "Hazardous", color: "text-red-500" },
  { title: "Visibility", value: "0.6 km", meta: "Dense smog", subtext: "Flight delays at IGI", trend: "-40%", color: "text-orange-500" },
  { title: "Respiratory Risk", value: "Critical", meta: "All age groups", subtext: "Emergency declared", trend: "Level Red", color: "text-red-500" },
];

const historicalData = [
  { year: "2019", aqi: 368, deaths: 54000 },
  { year: "2020", aqi: 342, deaths: 52000 },
  { year: "2021", aqi: 385, deaths: 58000 },
  { year: "2022", aqi: 398, deaths: 61000 },
  { year: "2023", aqi: 412, deaths: 63500 },
  { year: "2024", aqi: 437, deaths: 67000 },
];

const hourlyForecast = [
  { hour: "6am", aqi: 487, risk: "Severe" },
  { hour: "9am", aqi: 512, risk: "Severe+" },
  { hour: "12pm", aqi: 468, risk: "Severe" },
  { hour: "3pm", aqi: 423, risk: "Very Poor" },
  { hour: "6pm", aqi: 489, risk: "Severe" },
  { hour: "9pm", aqi: 512, risk: "Severe+" },
];

const vulnerableAreas = [
  { area: "Anand Vihar", aqi: 512, population: "450k", schools: 23 },
  { area: "Rohini", aqi: 487, population: "890k", schools: 45 },
  { area: "Dwarka", aqi: 456, population: "780k", schools: 38 },
  { area: "Janakpuri", aqi: 478, population: "520k", schools: 27 },
  { area: "Lajpat Nagar", aqi: 443, population: "340k", schools: 19 },
];

export default function ReportsPage() {
  return (
    <main className="bg-black pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <Image src="/child.jpg" alt="Child wearing mask in toxic Delhi air" fill className="object-cover scale-105" style={{ objectPosition: "50% 30%" }} priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10">
          <p className="text-sm uppercase tracking-[0.5em] text-red-400/80 font-semibold">Emergency Report • Winter 2024</p>
          <h1 className="mt-4 text-5xl font-bold text-white sm:text-7xl max-w-3xl">Delhi&apos;s Air is a Public Health Emergency</h1>
          <p className="mt-4 text-xl text-slate-300 max-w-2xl">Real-time data shows 13x safe limits. Every breath counts.</p>
          <div className="mt-6 flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
            </span>
            <span className="text-sm text-red-300">Live data from CPCB • Updated 2 min ago</span>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="mx-auto mt-12 w-full max-w-6xl px-6 sm:px-10">
        <CitySnapshot stats={snapshotStats} />
      </section>

      {/* Hourly Forecast */}
      <section className="mx-auto mt-16 w-full max-w-6xl px-6 sm:px-10">
        <AQIHeatmap forecast={hourlyForecast} />
      </section>

      {/* Historical */}
      <section className="mx-auto mt-16 w-full max-w-6xl px-6 sm:px-10">
        <HistoricalTrends data={historicalData} />
      </section>

      {/* Vulnerable Areas & Impact */}
      <section className="mx-auto mt-16 w-full max-w-6xl px-6 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <VulnerableGroups areas={vulnerableAreas} />
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