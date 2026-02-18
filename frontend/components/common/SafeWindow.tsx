import { cn } from "@/lib/utils";
import type { SafeWindow as SafeWindowType } from "@/types/aqi";

interface SafeWindowProps {
  window: SafeWindowType;
  className?: string;
}

export default function SafeWindow({ window: w, className }: SafeWindowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-3",
        className
      )}
    >
      <div>
        <p className="text-sm font-medium text-white">
          {w.startHour} – {w.endHour}
        </p>
        <p className="text-xs text-slate-400">Safe outdoor window</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-green-400">{w.avgAqi}</p>
        <p className="text-xs text-green-400/70">AQI</p>
      </div>
    </div>
  );
}
