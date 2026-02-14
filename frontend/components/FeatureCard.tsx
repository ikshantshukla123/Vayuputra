"use client";

import { motion } from "framer-motion";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
  index: number;
};

export default function FeatureCard({
  title,
  description,
  icon,
  index,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.12 }}
      whileHover={{
        y: -6,
        borderColor: "rgba(251,191,36,0.25)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(251,191,36,0.06)",
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-7 backdrop-blur transition-colors"
    >
      {/* Glow spot on hover */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber-400/0 blur-3xl transition-all duration-500 group-hover:bg-amber-400/10" />

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-400/10 text-xl">
            {icon}
          </span>
          <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/50">
            0{index + 1}
          </p>
        </div>

        <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-amber-100">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-400">{description}</p>

        <div className="mt-2 h-px w-full bg-gradient-to-r from-amber-300/30 via-amber-300/10 to-transparent" />
      </div>
    </motion.div>
  );
}
