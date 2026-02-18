"use client";

import { MapPin } from "lucide-react";

interface LocationStatusProps {
  label?: string;
  lat?: number | null;
  lng?: number | null;
  loading?: boolean;
}

export default function LocationStatus({ label, lat, lng, loading }: LocationStatusProps) {
  if (loading) {
    return (
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <MapPin className="h-3.5 w-3.5 animate-pulse" />
        <span>Detecting location…</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-xs text-slate-400">
      <MapPin className="h-3.5 w-3.5 text-amber-400" />
      <span>{label ?? `${lat?.toFixed(4)}, ${lng?.toFixed(4)}`}</span>
    </div>
  );
}
