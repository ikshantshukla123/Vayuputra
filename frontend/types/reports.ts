import type { AQIReading, HistoricalDataPoint, VulnerableArea } from "./aqi";

/** City snapshot report */
export interface CitySnapshot {
  title: string;
  value: string;
  meta: string;
  subtext?: string;
  trend?: string;
  color?: string;
}

/** Full report payload */
export interface ReportData {
  snapshot: CitySnapshot[];
  historical: HistoricalDataPoint[];
  vulnerableAreas: VulnerableArea[];
  currentReadings: AQIReading[];
  generatedAt: string;
}
