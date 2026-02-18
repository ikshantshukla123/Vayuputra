"use client";

import { motion } from "framer-motion";

const nodes = [
  { label: "Satellites & Sensors", x: 10, y: 20 },
  { label: "Data Pipeline", x: 40, y: 20 },
  { label: "ML Models", x: 70, y: 20 },
  { label: "Your Dashboard", x: 50, y: 60 },
];

export default function DataFlowDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-white/10 bg-white/5 p-8"
    >
      <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
        Data Flow
      </p>
      <h3 className="mt-3 text-xl font-semibold text-white">
        From Satellites to Your Screen
      </h3>

      <div className="relative mt-8 flex flex-wrap justify-center gap-6">
        {nodes.map((node, i) => (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10 text-xl font-bold text-amber-300">
              {i + 1}
            </div>
            <p className="text-xs text-slate-300 text-center max-w-[100px]">
              {node.label}
            </p>
            {i < nodes.length - 1 && (
              <span className="hidden md:block absolute text-amber-400/30 text-2xl">
                →
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
