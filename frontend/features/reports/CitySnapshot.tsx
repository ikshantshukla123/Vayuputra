"use client";

import { motion } from "framer-motion";

interface CitySnapshotProps {
  stats: {
    title: string;
    value: string;
    meta: string;
    subtext?: string;
    trend?: string;
    color?: string;
  }[];
}

function getTrendColor(trend?: string) {
  if (!trend) return "";
  if (trend.includes("+") || trend.includes("Hazardous") || trend.includes("Red"))
    return "text-red-400";
  if (trend.includes("-")) return "text-green-400";
  return "text-yellow-400";
}

export default function CitySnapshot({ stats }: CitySnapshotProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, borderColor: "rgba(251, 191, 36, 0.3)" }}
          className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 backdrop-blur-sm transition-all"
        >
          <div className="flex items-start justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">
              {item.title}
            </p>
            {item.trend && (
              <span className={`text-xs font-medium ${getTrendColor(item.trend)}`}>
                {item.trend}
              </span>
            )}
          </div>
          <p className={`mt-3 text-4xl font-bold ${item.color ?? "text-white"}`}>
            {item.value}
          </p>
          <p className="mt-2 text-sm text-slate-300">{item.meta}</p>
          {item.subtext && (
            <p className="mt-1 text-xs text-slate-500">{item.subtext}</p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
