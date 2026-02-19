"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Radio } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Dynamically import the map to avoid SSR issues with Leaflet
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const DELHI_CENTER: [number, number] = [28.6139, 77.209];
const DEFAULT_ZOOM = 10;

export default function AQIMap() {
  const [mounted, setMounted] = useState(false);
  const token = process.env.NEXT_PUBLIC_WAQI_MAP_TOKEN;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
        <div className="h-[420px] animate-pulse rounded-xl bg-zinc-800" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Delhi Air Quality — Live Map
          </h2>
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
        </div>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-400">
          <Radio className="h-3.5 w-3.5 text-zinc-500" />
          Official monitoring stations &bull; Updated every 15 minutes
        </p>
      </div>

      {/* Map */}
      <div className="overflow-hidden rounded-xl border border-white/5">
        <MapContainer
          center={DELHI_CENTER}
          zoom={DEFAULT_ZOOM}
          scrollWheelZoom={true}
          zoomControl={false}
          attributionControl={true}
          style={{ height: "420px", width: "100%" }}
        >
          {/* Base layer — OpenStreetMap */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* WAQI AQI overlay */}
          <TileLayer
            attribution='Air Quality Data &copy; <a href="https://waqi.info">WAQI</a>'
            url={`https://tiles.aqicn.org/tiles/usepa-aqi/{z}/{x}/{y}.png?token=${token}`}
            opacity={0.6}
          />
        </MapContainer>
      </div>

      {/* Footer attribution */}
      <p className="mt-3 text-xs text-zinc-500">
        Data: World Air Quality Index (WAQI) &bull; CPCB monitoring network
      </p>
    </div>
  );
}
