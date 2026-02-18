"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AQIGaugeProps {
  value: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

function getSeverityColor(aqi: number) {
  if (aqi <= 50) return "#22c55e";
  if (aqi <= 100) return "#84cc16";
  if (aqi <= 200) return "#eab308";
  if (aqi <= 300) return "#f97316";
  if (aqi <= 400) return "#ef4444";
  return "#dc2626";
}

function getSeverityLabel(aqi: number) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Satisfactory";
  if (aqi <= 200) return "Moderate";
  if (aqi <= 300) return "Poor";
  if (aqi <= 400) return "Very Poor";
  return "Severe";
}

const sizeMap = { sm: 80, md: 120, lg: 160 };

export default function AQIGauge({ value, size = "md", className }: AQIGaugeProps) {
  const px = sizeMap[size];
  const color = getSeverityColor(value);
  const label = getSeverityLabel(value);

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div
        className="relative flex items-center justify-center rounded-full border-4"
        style={{ width: px, height: px, borderColor: color }}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-3xl font-bold text-white"
          style={{ fontSize: px * 0.25 }}
        >
          {value}
        </motion.span>
      </div>
      <span className="text-xs font-medium" style={{ color }}>
        {label}
      </span>
    </div>
  );
}
