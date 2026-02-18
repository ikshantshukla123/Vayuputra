"use client";

import RiskIndicator from "@/components/common/RiskIndicator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HealthSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <RiskIndicator level="critical" label="Respiratory" />
        <RiskIndicator level="high" label="Cardiovascular" />
        <RiskIndicator level="medium" label="Skin & Eyes" />
        <p className="mt-2 text-xs text-slate-500">
          Based on current AQI levels in your area.
        </p>
      </CardContent>
    </Card>
  );
}
