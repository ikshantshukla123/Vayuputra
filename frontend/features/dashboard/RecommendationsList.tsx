"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const recommendations = [
  { icon: "😷", text: "Wear an N95 mask outdoors" },
  { icon: "🏠", text: "Keep windows closed and use air purifiers" },
  { icon: "🚫", text: "Avoid outdoor exercise until AQI drops below 150" },
  { icon: "💧", text: "Stay hydrated — pollution increases dehydration" },
  { icon: "🧒", text: "Keep children indoors during peak hours" },
];

export default function RecommendationsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {recommendations.map((r) => (
          <div
            key={r.text}
            className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3"
          >
            <span className="text-lg">{r.icon}</span>
            <p className="text-sm text-slate-300">{r.text}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
