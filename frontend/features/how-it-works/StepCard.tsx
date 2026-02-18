"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface StepCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

export default function StepCard({ title, description, icon, index }: StepCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ scale: 1.02, y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 backdrop-blur-sm transition-all hover:border-amber-400/30 hover:shadow-xl hover:shadow-amber-500/5"
    >
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          background: isHovered
            ? "radial-gradient(circle at 30% 30%, rgba(251,191,36,0.1), transparent 70%)"
            : "radial-gradient(circle at 30% 30%, rgba(251,191,36,0), transparent 70%)",
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-4">
          <motion.span
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/20 text-3xl shadow-lg"
          >
            {icon}
          </motion.span>

          <div>
            <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-amber-200">
              {title}
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-amber-400/50" />
              <p className="text-xs text-amber-200/60">Step {index + 1}</p>
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-300">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
