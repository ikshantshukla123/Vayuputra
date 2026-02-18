"use client";

import SafeWindow from "@/components/common/SafeWindow";
import SectionHeader from "@/components/common/SectionHeader";
import type { SafeWindow as SafeWindowType } from "@/types/aqi";

interface SafeWindowsPanelProps {
  windows: SafeWindowType[];
}

export default function SafeWindowsPanel({ windows }: SafeWindowsPanelProps) {
  if (windows.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
        <p className="text-sm text-slate-400">No safe outdoor windows found for today.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader label="Safe Windows" title="Best Times to Go Outside" />
      <div className="flex flex-col gap-3">
        {windows.map((w, i) => (
          <SafeWindow key={i} window={w} />
        ))}
      </div>
    </div>
  );
}
