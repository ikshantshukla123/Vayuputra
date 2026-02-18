"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "No Personal Health Data Stored",
    description: "All recommendations are generated in real-time. We never store your health information.",
  },
  {
    icon: Lock,
    title: "Location Privacy",
    description: "Your location is used only for AQI lookups. We don't track or share your movements.",
  },
  {
    icon: Eye,
    title: "Transparent Models",
    description: "Our prediction models are open-source. Every data source is cited and verifiable.",
  },
];

export default function TrustAndPrivacy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-white/10 bg-gradient-to-br from-green-500/5 to-transparent p-8"
    >
      <p className="text-xs uppercase tracking-[0.4em] text-green-400/70">
        Trust & Privacy
      </p>
      <h3 className="mt-3 text-2xl font-semibold text-white">
        Built On Transparency
      </h3>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {trustItems.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4"
          >
            <item.icon className="h-6 w-6 text-green-400" />
            <h4 className="text-sm font-semibold text-white">{item.title}</h4>
            <p className="text-xs text-slate-400">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
