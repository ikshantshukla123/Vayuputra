"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  DashboardHeader,
  CurrentAQICard,
  SafeWindowsPanel,
  RecommendationsList,
  HealthSummary,
  LocationStatus,
} from "@/features/dashboard";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";

function DashboardContent() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "Traveler";

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16 sm:px-10">
      <DashboardHeader username={username} />
      <LocationStatus label="Delhi, India" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CurrentAQICard aqi={487} station="Anand Vihar" updatedAt="2 min ago" />
        <HealthSummary />
        <RecommendationsList />
      </div>

      <SafeWindowsPanel
        windows={[
          { startHour: "6:00 AM", endHour: "7:30 AM", avgAqi: 180, severity: "Moderate" },
          { startHour: "2:00 PM", endHour: "3:30 PM", avgAqi: 210, severity: "Poor" },
        ]}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main className="min-h-[70vh] bg-black">
      <Suspense
        fallback={
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
            <LoadingSkeleton lines={5} />
          </div>
        }
      >
        <DashboardContent />
      </Suspense>
    </main>
  );
}
