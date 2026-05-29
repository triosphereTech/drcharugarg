"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        <rect
          x="14"
          y="14"
          width="7"
          height="7"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
  {
    href: "/admin/patients",
    label: "Patients",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <circle
          cx="8"
          cy="7"
          r="4"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        <path
          d="M2 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <path
          d="M19 8v6M16 11h6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/admin/appointments",
    label: "Appointments",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <rect
          x="3"
          y="4"
          width="18"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        <path
          d="M16 2v4M8 2v4M3 10h18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] bg-[--primary-dark] flex flex-col flex-shrink-0 h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/8">
        <div className="w-8 h-8 rounded-lg bg-[--primary-accent] flex items-center justify-center mb-3">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p
          className="text-white font-semibold text-[15px] leading-tight"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Dr. Charu Garg
        </p>

        <p className="text-[--primary-accent] text-[11px] font-medium tracking-widest uppercase mt-1">
          Dermatology Admin
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-5 py-2.5 text-[13.5px] border-l-[2.5px] transition-all",
                isActive
                  ? "text-white bg-[#058FD2]/12 border-l-[--primary-accent]"
                  : "text-white/50 border-l-transparent hover:text-white hover:bg-white/5"
              )}
            >
              <span
                className={cn(
                  isActive ? "opacity-100" : "opacity-70"
                )}
              >
                {item.icon}
              </span>

              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Admin footer */}
      <div className="px-5 py-4 border-t border-white/8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[--primary-accent] flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
            CG
          </div>

          <div className="leading-tight">
            <p className="text-white text-[13px] font-medium">
              Admin
            </p>

            <p className="text-white/40 text-[11px]">
              dr.charu@clinic.in
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}