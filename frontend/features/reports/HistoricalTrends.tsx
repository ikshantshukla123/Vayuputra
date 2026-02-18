"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { HistoricalDataPoint } from "@/types/aqi";

interface HistoricalTrendsProps {
  data: HistoricalDataPoint[];
}

export default function HistoricalTrends({ data }: HistoricalTrendsProps) {
  return (
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
          Delhi&apos;s Air Quality (2019-2024)
        </h2>
        <p className="text-sm text-slate-300">
          Average winter AQI has increased 18% in 5 years.
        </p>
      </div>

      <div className="mt-8 h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="year" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #333",
              }}
              labelStyle={{ color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="aqi"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ fill: "#ef4444" }}
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
  );
}
