"use client";

import { motion } from "framer-motion";

type ReportCardProps = {
  title: string;
  value: string;
  meta: string;
  subtext?: string;
  trend?: string;
  color?: string;
  index: number;
};

export default function ReportCard({ 
  title, 
  value, 
  meta, 
  subtext, 
  trend, 
  color = "text-white",
  index 
}: ReportCardProps) {
  
  const getTrendColor = (trend?: string) => {
    if (!trend) return "";
    if (trend.includes("+") || trend.includes("Hazardous") || trend.includes("Red")) 
      return "text-red-400";
    if (trend.includes("-")) return "text-green-400";
    return "text-yellow-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ scale: 1.02, borderColor: 'rgba(251, 191, 36, 0.3)' }}
      className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 backdrop-blur-sm transition-all"
    >
      <div className="flex items-start justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">
          {title}
        </p>
        {trend && (
          <span className={`text-xs font-medium ${getTrendColor(trend)}`}>
            {trend}
          </span>
        )}
      </div>
      
      <p className={`mt-3 text-4xl font-bold ${color}`}>
        {value}
      </p>
      
      <p className="mt-2 text-sm text-slate-300">
        {meta}
      </p>
      
      {subtext && (
        <p className="mt-1 text-xs text-slate-500">
          {subtext}
        </p>
      )}

      {/* Animated indicator bar */}
      <motion.div 
        className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          className={`h-full ${title.includes("AQI") ? 'bg-red-500' : 'bg-amber-500'}`}
          initial={{ width: 0 }}
          whileInView={{ width: "60%" }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
      </motion.div>
    </motion.div>
  );
}