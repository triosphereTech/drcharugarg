"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    href: "/admin",
    label: "Dashboard",
  },
  {
    href: "/admin/patients",
    label: "Patients",
  },
  {
    href: "/admin/appointments",
    label: "Appointments",
  },
];

export function Topbar({ title, subtitle, actions }) {
  const pathname = usePathname();

  return (
    <header className=" border-b border-[#E6EEF3] flex-shrink-0">
      {/* Top Row */}
      <div className="h-[72px] bg-white px-8 flex items-center justify-between border-b border-[#EEF2F5]">
        {/* Left */}
        <div className="flex items-center gap-8">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#EEF7FB] flex items-center justify-center">
              <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  stroke="#058FD2"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              <h2
                className="text-[17px] font-semibold text-[--primary-dark] leading-none"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Dr. Charu Garg
              </h2>

              <p className="text-[11px] uppercase tracking-[0.18em] text-[#058FD2] mt-1">
                Admin Portal
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="hidden lg:flex items-center w-[320px] h-11 rounded-xl border border-[#E4EAF0] bg-[#FAFBFC] px-4">
            <svg
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              className="text-zinc-400"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
              />

              <path
                d="M20 20L17 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <input
              type="text"
              placeholder="Search patients, appointments..."
              className="flex-1 bg-transparent outline-none text-[14px] text-zinc-700 placeholder:text-zinc-400 px-3"
            />

            <div className="px-2 py-1 rounded-md bg-white border border-[#E4EAF0] text-[11px] text-zinc-400">
              ⌘K
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          <button className="relative w-11 h-11 rounded-xl border border-[#E4EAF0] flex items-center justify-center hover:bg-[#F8FAFC] transition-all">
            <svg
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M15 17H5l1.4-1.4A2 2 0 007 14.2V10a5 5 0 0110 0v4.2a2 2 0 00.6 1.4L19 17h-4z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M10 20a2 2 0 004 0"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>

            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#058FD2]" />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden sm:block">
              <p className="text-[13px] font-medium text-[--primary-dark]">
                Admin
              </p>

              <p className="text-[11px] text-zinc-400">
                Dr. Charu Garg
              </p>
            </div>

            <div className="w-11 h-11 rounded-full bg-[#058FD2] text-white flex items-center justify-center font-semibold text-sm">
              CG
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Row */}
      <div className="h-[60px] bg-white px-8 flex items-center gap-2 overflow-x-auto">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 rounded-full text-[14px] transition-all whitespace-nowrap",
                isActive
                  ? "bg-[#EEF7FB] text-[#058FD2] font-medium"
                  : "text-zinc-500 hover:text-zinc-800 hover:bg-[#F7F9FB]"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Page Title Row */}
      <div className="px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-[--primary-dark]">
            {title}
          </h1>

          {subtitle && (
            <p className="text-[13px] text-zinc-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2.5">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}
