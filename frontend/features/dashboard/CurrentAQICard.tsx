"use client";

import AQIGauge from "@/components/common/AQIGauge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CurrentAQICardProps {
  aqi: number;
  station?: string;
  updatedAt?: string;
}

export default function CurrentAQICard({ aqi, station, updatedAt }: CurrentAQICardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current AQI</CardTitle>
        {station && <p className="text-xs text-slate-400">{station}</p>}
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <AQIGauge value={aqi} size="lg" />
        {updatedAt && (
          <p className="text-xs text-slate-500">Updated {updatedAt}</p>
        )}
      </CardContent>
    </Card>
  );
}
