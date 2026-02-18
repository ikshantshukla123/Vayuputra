"use client";

import { motion } from "framer-motion";

interface DashboardHeaderProps {
  username: string;
}

export default function DashboardHeader({ username }: DashboardHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-2"
    >
      <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
        Dashboard
      </p>
      <h1 className="text-3xl font-semibold text-white">
        Welcome, {username}
      </h1>
      <p className="text-sm text-slate-300">
        Your personalised air quality intelligence.
      </p>
    </motion.div>
  );
}
