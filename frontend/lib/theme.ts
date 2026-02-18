/** Color and gradient tokens used across the app */
export const THEME = {
  colors: {
    background: "#07090b",
    surface: "rgba(255, 255, 255, 0.03)",
    surfaceHover: "rgba(255, 255, 255, 0.05)",
    border: "rgba(255, 255, 255, 0.1)",
    borderHover: "rgba(251, 191, 36, 0.2)",
    amber: {
      100: "#fffbeb",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
    },
    severity: {
      good: "#22c55e",
      satisfactory: "#84cc16",
      moderate: "#eab308",
      poor: "#f97316",
      veryPoor: "#ef4444",
      severe: "#dc2626",
    },
  },
  gradients: {
    heroOverlay:
      "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.85), rgba(0,0,0,0.3))",
    cardGlow:
      "radial-gradient(circle at 30% 30%, rgba(251,191,36,0.1), transparent 70%)",
    sectionFade:
      "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.8), black)",
  },
} as const;
