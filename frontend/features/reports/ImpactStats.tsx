"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ImpactStats() {
  return (
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
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full border border-red-500/30 bg-red-500/20 px-3 py-1 text-xs text-red-300">
            Human Impact
          </span>
        </div>

        <h3 className="mb-2 text-2xl font-bold text-white">
          A Generation at Risk
        </h3>

        <p className="mb-4 text-sm text-slate-200">
          Children in Delhi lose an average of{" "}
          <span className="font-bold text-red-400">6.8 IQ points</span> by age
          10 due to pollution exposure. Respiratory illnesses are up{" "}
          <span className="font-bold text-red-400">340%</span> in the last
          decade.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-white/10 p-3 backdrop-blur">
            <p className="text-xs text-slate-300">Child Asthma</p>
            <p className="text-xl font-bold text-white">+235%</p>
            <p className="text-xs text-red-400">since 2015</p>
          </div>
          <div className="rounded-lg bg-white/10 p-3 backdrop-blur">
            <p className="text-xs text-slate-300">School Absences</p>
            <p className="text-xl font-bold text-white">47 days</p>
            <p className="text-xs text-red-400">this year</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
