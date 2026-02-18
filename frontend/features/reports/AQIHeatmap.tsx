"use client";

import { motion } from "framer-motion";

interface AQIHeatmapProps {
  forecast: { hour: string; aqi: number; risk: string }[];
}

export default function AQIHeatmap({ forecast }: AQIHeatmapProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8"
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
          Today&apos;s Forecast
        </p>
        <h2 className="text-2xl font-semibold text-white">
          Hourly AQI Prediction
        </h2>
        <p className="text-sm text-slate-300">
          Peak toxicity at 9am and 9pm. Plan your day accordingly.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {forecast.map((hour, idx) => (
          <motion.div
            key={hour.hour}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="rounded-xl border border-white/10 bg-white/5 p-4 text-center"
          >
            <p className="text-sm text-slate-400">{hour.hour}</p>
            <p className="text-2xl font-bold text-white">{hour.aqi}</p>
            <p
              className={`text-xs ${
                hour.aqi > 500 ? "text-red-400" : "text-orange-400"
              }`}
            >
              {hour.risk}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
