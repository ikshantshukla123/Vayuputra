import type { AQIReading } from "@/types/aqi";
import type { ApiResponse } from "@/types/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

/** Generic fetch wrapper with error handling */
async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.error ?? `Request failed (${res.status})`);
  }

  const json: ApiResponse<T> = await res.json();
  return json.data;
}

/** Fetch current AQI for a given location */
export async function fetchCurrentAqi(
  lat: number,
  lng: number
): Promise<AQIReading> {
  return apiFetch<AQIReading>(`/aqi/current?lat=${lat}&lng=${lng}`);
}

/** Fetch 24-hour forecast */
export async function fetchForecast(lat: number, lng: number) {
  return apiFetch(`/aqi/forecast?lat=${lat}&lng=${lng}`);
}

/** Fetch report data for a city */
export async function fetchReport(city: string) {
  return apiFetch(`/reports/${encodeURIComponent(city)}`);
}
