import { create } from "zustand";
import type { AQIReading, HourlyForecast, SafeWindow } from "@/types/aqi";

interface PollutionState {
  currentAqi: AQIReading | null;
  forecast: HourlyForecast[];
  safeWindows: SafeWindow[];
  isLoading: boolean;
  error: string | null;
  setCurrentAqi: (reading: AQIReading) => void;
  setForecast: (data: HourlyForecast[]) => void;
  setSafeWindows: (windows: SafeWindow[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePollutionStore = create<PollutionState>()((set) => ({
  currentAqi: null,
  forecast: [],
  safeWindows: [],
  isLoading: false,
  error: null,
  setCurrentAqi: (reading) => set({ currentAqi: reading }),
  setForecast: (data) => set({ forecast: data }),
  setSafeWindows: (windows) => set({ safeWindows: windows }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
