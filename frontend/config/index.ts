/** App-wide configuration constants */
export const config = {
  appName: "VAYUPUTRA",
  appNameHindi: "वायुपुत्र",
  tagline: "AI-Powered Pollution Awareness",
  defaultCity: "Delhi",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api",
  mapboxToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "",
  refreshIntervalMs: 5 * 60 * 1000, // 5 minutes
} as const;
