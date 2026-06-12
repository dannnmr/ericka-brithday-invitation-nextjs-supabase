import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function SectionHeader({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-8", className)}>
      {subtitle && (
        <p
          className={cn(
            "font-sans text-[10px] md:text-xs uppercase tracking-[0.5em] text-primary mb-2 font-bold",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
      <h3
        className={cn(
          "text-5xl md:text-6xl lg:text-7xl text-secondary drop-shadow-xs leading-tight py-3 px-1",
          !titleClassName?.includes("font-") && "font-script",
          titleClassName
        )}
      >
        {title}
      </h3>
    </div>
  );
}
