import { Badge } from "@/components/ui/badge";
import type { AQISeverity } from "@/types/aqi";

interface AQIBadgeProps {
  severity: AQISeverity;
  className?: string;
}

const variantMap: Record<AQISeverity, "good" | "moderate" | "poor" | "severe" | "destructive"> = {
  Good: "good",
  Satisfactory: "good",
  Moderate: "moderate",
  Poor: "poor",
  "Very Poor": "severe",
  Severe: "destructive",
  "Severe+": "destructive",
};

export default function AQIBadge({ severity, className }: AQIBadgeProps) {
  return (
    <Badge variant={variantMap[severity]} className={className}>
      {severity}
    </Badge>
  );
}
