"use client";

import { useEffect, useState } from "react";
import type { AQIReading } from "@/types/aqi";
import { fetchCurrentAqi } from "@/lib/api";

/**
 * Fetches and returns the current AQI reading.
 * Re-fetches when lat/lng change.
 */
export function useAQI(lat?: number | null, lng?: number | null) {
  const [data, setData] = useState<AQIReading | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lat == null || lng == null) return;

    let cancelled = false;
    setLoading(true);

    fetchCurrentAqi(lat, lng)
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [lat, lng]);

  return { data, loading, error };
}
