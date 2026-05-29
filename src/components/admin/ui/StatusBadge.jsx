import { cn } from "@/lib/utils";

const CONFIG = {
  pending: {
    label: "Pending",
    className:
      "bg-amber-50 text-amber-600 border border-amber-200",
  },

  attended: {
    label: "Attended",
    className:
      "bg-emerald-50 text-emerald-600 border border-emerald-200",
  },

  cancelled: {
    label: "Cancelled",
    className:
      "bg-zinc-100 text-zinc-500 border border-zinc-200",
  },
};

export function StatusBadge({ status, className }) {
  const { label, className: base } = CONFIG[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        base,
        className
      )}
    >
      {label}
    </span>
  );
}