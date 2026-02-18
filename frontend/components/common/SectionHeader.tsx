import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeader({ label, title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <p className="text-xs uppercase tracking-[0.5em] text-amber-200/70">
          {label}
        </p>
      )}
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      {description && (
        <p className="max-w-2xl text-sm text-slate-300">{description}</p>
      )}
    </div>
  );
}
