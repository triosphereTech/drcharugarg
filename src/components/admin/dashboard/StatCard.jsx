import {
  HiOutlineUsers,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
  HiOutlineInbox,
} from "react-icons/hi2";

const ICONS = {
  patients: HiOutlineUsers,
  appointments: HiOutlineCalendarDays,
  analytics: HiOutlineChartBar,
  messages: HiOutlineInbox,
};

export function StatCard({
  label,
  value,
  note,
  accentColor = "#058FD2",
  icon = "patients",
}) {
  const Icon = ICONS[icon] || HiOutlineChartBar;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[#DDEBF2] bg-gradient-to-br from-white via-white to-[#F3FAFD] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#058FD2]/5">
      {/* Decorative Glow */}
      {/* <div
        className="absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-[0.08]"
        style={{ backgroundColor: accentColor }}
      /> */}

      {/* Icon */}
     <div className="flex justify-between items-start">
      <div>
         {/* Label */}
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
        {label}
      </p>

      {/* Value */}
      <h3 className="mt-3 text-[34px] font-semibold leading-none text-[#131C15]">
        {value}
      </h3>

      {/* Note */}
      <p className="mt-3 text-[13px] text-zinc-500">
        {note}
      </p> 
      </div>
      <div>
         <div
        className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl"
        style={{
          backgroundColor: `${accentColor}15`,
        }}
      >
        <Icon
          className="h-6 w-6"
          style={{ color: accentColor }}
        />
      </div>
      </div>
      
     </div>

    

      {/* Bottom Accent */}
      <div
        className="absolute bottom-0 left-0 h-1 w-full"
        style={{
          background: `linear-gradient(to right, ${accentColor}, transparent)`,
        }}
      />
    </div>
  );
}