import { cn } from "@/lib/utils";

interface RiskIndicatorProps {
  level: "low" | "medium" | "high" | "critical";
  label?: string;
  className?: string;
}

const colorMap = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-orange-500",
  critical: "bg-red-500",
};

export default function RiskIndicator({ level, label, className }: RiskIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn("h-2.5 w-2.5 rounded-full", colorMap[level])} />
      <span className="text-xs text-slate-300 capitalize">{label ?? level} risk</span>
    </div>
  );
}
