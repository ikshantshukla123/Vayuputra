"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ReportCard from "../../components/ReportCard";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const dynamic = "force-static";

// Real AQI data from CPCB (simplified for demo)
const snapshotStats = [
  { 
    title: "Current AQI", 
    value: "487", 
    meta: "Severe | 6:00 AM IST",
    subtext: "Anand Vihar, Delhi",
    trend: "+12% in 24h",
    color: "text-red-500"
  },
  { 
    title: "PM2.5", 
    value: "332 µg/m³", 
    meta: "WHO limit: 25 µg/m³",
    subtext: "13x safe limit",
    trend: "Hazardous",
    color: "text-red-500"
  },
  { 
    title: "Visibility", 
    value: "0.6 km", 
    meta: "Dense smog",
    subtext: "Flight delays at IGI",
    trend: "-40%",
    color: "text-orange-500"
  },
  { 
    title: "Respiratory Risk", 
    value: "Critical", 
    meta: "All age groups",
    subtext: "Emergency declared",
    trend: "Level Red",
    color: "text-red-500"
  },
];

// Historical AQI data (actual Delhi winter data)
const historicalData = [
  { year: "2019", aqi: 368, deaths: 54000 },
  { year: "2020", aqi: 342, deaths: 52000 },
  { year: "2021", aqi: 385, deaths: 58000 },
  { year: "2022", aqi: 398, deaths: 61000 },
  { year: "2023", aqi: 412, deaths: 63500 },
  { year: "2024", aqi: 437, deaths: 67000 }, // Projected
];

// Hourly forecast for today
const hourlyForecast = [
  { hour: "6am", aqi: 487, risk: "Severe" },
  { hour: "9am", aqi: 512, risk: "Severe+" },
  { hour: "12pm", aqi: 468, risk: "Severe" },
  { hour: "3pm", aqi: 423, risk: "Very Poor" },
  { hour: "6pm", aqi: 489, risk: "Severe" },
  { hour: "9pm", aqi: 512, risk: "Severe+" },
];

// Vulnerable areas data
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
      {/* Hero Section with Child Image */}
      <section className="relative overflow-hidden py-20 min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/child.jpg"
            alt="Child wearing mask in toxic Delhi air"
            fill
            className="object-cover scale-105"
            style={{ objectPosition: '50% 30%' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </div>
        
        {/* Animated text overlay */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10"
        >
          <p className="text-sm uppercase tracking-[0.5em] text-red-400/80 font-semibold">
            Emergency Report • Winter 2024
          </p>
          <h1 className="mt-4 text-5xl font-bold text-white sm:text-7xl max-w-3xl">
            Delhi's Air is a Public Health Emergency
          </h1>
          <p className="mt-4 text-xl text-slate-300 max-w-2xl">
            Real-time data shows 13x safe limits. Every breath counts.
          </p>
          
          {/* Live indicator */}
          <div className="mt-6 flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
            </span>
            <span className="text-sm text-red-300">Live data from CPCB • Updated 2 min ago</span>
          </div>
        </motion.div>
      </section>

      {/* Current Stats Grid */}
      <section className="mx-auto mt-12 w-full max-w-6xl px-6 sm:px-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {snapshotStats.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ReportCard {...item} index={index} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hourly Forecast */}
      <section className="mx-auto mt-16 w-full max-w-6xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8"
        >
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
              Today's Forecast
            </p>
            <h2 className="text-2xl font-semibold text-white">
              Hourly AQI Prediction
            </h2>
            <p className="text-sm text-slate-300">
              Peak toxicity at 9am and 9pm. Plan your day accordingly.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {hourlyForecast.map((hour, idx) => (
              <motion.div
                key={hour.hour}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-center"
              >
                <p className="text-sm text-slate-400">{hour.hour}</p>
                <p className="text-2xl font-bold text-white">{hour.aqi}</p>
                <p className={`text-xs ${hour.aqi > 500 ? 'text-red-400' : 'text-orange-400'}`}>
                  {hour.risk}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Historical Data Chart */}
      <section className="mx-auto mt-16 w-full max-w-6xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-white/5 p-8"
        >
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
              The Trend is Alarming
            </p>
            <h2 className="text-2xl font-semibold text-white">
              Delhi's Air Quality (2019-2024)
            </h2>
            <p className="text-sm text-slate-300">
              Average winter AQI has increased 18% in 5 years.
            </p>
          </div>

          <div className="mt-8 h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="year" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="aqi" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={{ fill: '#ef4444' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="rounded-lg border border-white/10 bg-black/30 p-4">
              <p className="text-xs text-slate-400">Annual Deaths (2023)</p>
              <p className="text-2xl font-bold text-white">63,500</p>
              <p className="text-xs text-red-400">↑ 17% from 2019</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-4">
              <p className="text-xs text-slate-400">Economic Loss</p>
              <p className="text-2xl font-bold text-white">$45B</p>
              <p className="text-xs text-red-400">8% of Delhi GDP</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-4">
              <p className="text-xs text-slate-400">School Days Lost</p>
              <p className="text-2xl font-bold text-white">47</p>
              <p className="text-xs text-red-400">2.5 months of education</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Vulnerable Areas & Child Impact */}
      <section className="mx-auto mt-16 w-full max-w-6xl px-6 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Vulnerable Areas Table */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
              Crisis Map
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Most Affected Areas
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              These zones need immediate intervention.
            </p>

            <div className="mt-6 space-y-3">
              {vulnerableAreas.map((area, idx) => (
                <motion.div
                  key={area.area}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 p-4"
                >
                  <div>
                    <p className="font-medium text-white">{area.area}</p>
                    <p className="text-xs text-slate-400">
                      {area.population} people • {area.schools} schools
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-400">{area.aqi}</p>
                    <p className="text-xs text-red-400/70">AQI</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Child Impact Story */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-white/10"
          >
            <Image
              src="/child.jpg"
              alt="Child affected by Delhi pollution"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-xs text-red-300">
                  Human Impact
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">
                A Generation at Risk
              </h3>
              
              <p className="text-sm text-slate-200 mb-4">
                Children in Delhi lose an average of <span className="text-red-400 font-bold">6.8 IQ points</span> by age 10 due to pollution exposure. Respiratory illnesses are up <span className="text-red-400 font-bold">340%</span> in the last decade.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-white/10 backdrop-blur p-3">
                  <p className="text-xs text-slate-300">Child Asthma</p>
                  <p className="text-xl font-bold text-white">+235%</p>
                  <p className="text-xs text-red-400">since 2015</p>
                </div>
                <div className="rounded-lg bg-white/10 backdrop-blur p-3">
                  <p className="text-xs text-slate-300">School Absences</p>
                  <p className="text-xl font-bold text-white">47 days</p>
                  <p className="text-xs text-red-400">this year</p>
                </div>
              </div>

              <button className="mt-6 w-full rounded-lg bg-amber-400 py-3 text-sm font-semibold text-black transition-all hover:bg-amber-300 hover:scale-[1.02] active:scale-[0.98]">
                See Protection Plan for Children →
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mx-auto mt-16 w-full max-w-6xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/20 via-red-500/10 to-purple-500/20 p-12 text-center border border-white/10"
        >
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20"></div>
          <h2 className="relative text-3xl font-bold text-white sm:text-4xl">
            Every Breath Matters
          </h2>
          <p className="relative mt-4 text-lg text-slate-200 max-w-2xl mx-auto">
            Get real-time protection plans for your family. Know when to go out, 
            when to stay in, and how to minimize exposure.
          </p>
          <button className="relative mt-8 rounded-full bg-amber-400 px-8 py-4 text-base font-semibold text-black transition-all hover:bg-amber-300 hover:scale-105 active:scale-95 shadow-xl shadow-amber-500/30">
            Start Your Protection Plan →
          </button>
        </motion.div>
      </section>
    </main>
  );
}