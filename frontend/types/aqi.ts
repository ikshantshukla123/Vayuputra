/** AQI severity levels used throughout the app */
export type AQISeverity = "Good" | "Satisfactory" | "Moderate" | "Poor" | "Very Poor" | "Severe" | "Severe+";

/** Single AQI reading from a station */
export interface AQIReading {
  stationId: string;
  stationName: string;
  aqi: number;
  severity: AQISeverity;
  pm25: number;
  pm10: number;
  no2?: number;
  so2?: number;
  o3?: number;
  co?: number;
  timestamp: string;
}

/** Hourly forecast entry */
export interface HourlyForecast {
  hour: string;
  aqi: number;
  risk: AQISeverity;
}

/** Historical AQI data point */
export interface HistoricalDataPoint {
  year: string;
  aqi: number;
  deaths: number;
}

/** AQI level thresholds and metadata */
export interface AQILevel {
  min: number;
  max: number;
  label: AQISeverity;
  color: string;
  textColor: string;
  healthAdvice: string;
}

/** Safe window — a time range with lower AQI */
export interface SafeWindow {
  startHour: string;
  endHour: string;
  avgAqi: number;
  severity: AQISeverity;
}

/** Vulnerable area data */
export interface VulnerableArea {
  area: string;
  aqi: number;
  population: string;
  schools: number;
}
