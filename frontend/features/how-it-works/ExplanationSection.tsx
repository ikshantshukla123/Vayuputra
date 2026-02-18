"use client";

import { motion } from "framer-motion";

interface ExplanationSectionProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function ExplanationSection({ title, description, children }: ExplanationSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6"
    >
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{description}</p>
      {children}
    </motion.div>
  );
}
