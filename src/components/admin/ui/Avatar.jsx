import { getInitials } from "@/lib/data";
import { cn } from "@/lib/utils";

const SIZE_MAP = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-13 h-13 text-lg",
};

export function Avatar({
  name,
  size = "md",
  className,
}) {
  return (
    <div
      className={cn(
        "rounded-full bg-primary-accent text-white font-semibold flex items-center justify-center flex-shrink-0",
        SIZE_MAP[size],
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
}