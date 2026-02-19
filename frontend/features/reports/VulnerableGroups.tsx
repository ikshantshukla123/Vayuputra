"use client";

import { motion } from "framer-motion";
import type { VulnerableArea } from "@/types/aqi";

interface VulnerableGroupsProps {
  areas: VulnerableArea[];
}

function getAQIBarColor(aqi: number) {
  if (aqi <= 50) return "bg-green-500";
  if (aqi <= 100) return "bg-yellow-500";
  if (aqi <= 200) return "bg-orange-500";
  if (aqi <= 300) return "bg-red-500";
  return "bg-red-600";
}

function getAQITextColor(aqi: number) {
  if (aqi <= 50) return "text-green-400";
  if (aqi <= 100) return "text-yellow-400";
  if (aqi <= 200) return "text-orange-400";
  return "text-red-400";
}

export default function VulnerableGroups({ areas }: VulnerableGroupsProps) {
  const maxAqi = Math.max(...areas.map((a) => a.aqi), 1);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-white/10 bg-white/5 p-8"
    >
      <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
        Live Station Data
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Most Affected Areas
      </h2>
      <p className="mt-2 text-sm text-slate-300">
        Top monitoring stations ranked by AQI severity.
      </p>

      <div className="mt-6 space-y-3">
        {areas.map((area, idx) => (
          <motion.div
            key={area.area}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="overflow-hidden rounded-lg border border-white/10 bg-black/30 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-white">{area.area}</p>
                <p className="text-xs text-slate-400">{area.population}</p>
              </div>
              <div className="ml-4 text-right">
                <p className={`text-2xl font-bold ${getAQITextColor(area.aqi)}`}>
                  {area.aqi}
                </p>
                <p className={`text-xs ${getAQITextColor(area.aqi)}/70`}>AQI</p>
              </div>
            </div>
            {/* AQI bar */}
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(area.aqi / maxAqi) * 100}%` }}
                transition={{ delay: idx * 0.05 + 0.2, duration: 0.6 }}
                className={`h-full rounded-full ${getAQIBarColor(area.aqi)}`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
