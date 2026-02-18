"use client";

import { motion } from "framer-motion";
import type { VulnerableArea } from "@/types/aqi";

interface VulnerableGroupsProps {
  areas: VulnerableArea[];
}

export default function VulnerableGroups({ areas }: VulnerableGroupsProps) {
  return (
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
        {areas.map((area, idx) => (
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
  );
}
