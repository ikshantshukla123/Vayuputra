import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-amber-400 text-black",
        secondary: "border-transparent bg-white/10 text-white",
        destructive: "border-transparent bg-red-500/20 text-red-300 border-red-500/30",
        outline: "border-white/20 text-white",
        good: "border-transparent bg-green-500/20 text-green-300",
        moderate: "border-transparent bg-yellow-500/20 text-yellow-300",
        poor: "border-transparent bg-orange-500/20 text-orange-300",
        severe: "border-transparent bg-red-500/20 text-red-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
