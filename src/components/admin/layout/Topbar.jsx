"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image"
import Logo from "@/../public/images/brand/LogoTop.png"

const NAV_ITEMS = [
  {
    href: "/admin",
    label: "Dashboard",
  },
  {
    href: "/admin/patients",
    label: "Patients",
  },
  // {
  //   href: "/admin/appointments",
  //   label: "Appointments",
  // },
];

export function Topbar({ title, subtitle, actions }) {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-[#E6EEF3] flex-shrink-0 ">
      {/* Top Row */}
      <div className="h-[72px] bg-white px-12 flex items-center justify-between border-b border-[#EEF2F5]">
        {/* Left */}
        <div className="flex items-center gap-8">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <div className="w-40 flex items-center justify-center">
             <Image
             src={Logo}
             className=""
             />
            </div>

            
          </div>

          {/* Search */}
          {/* <div className="hidden lg:flex items-center w-[320px] h-11 rounded-xl border border-[#E4EAF0] bg-[#FAFBFC] px-4">
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
          </div> */}
        </div>

        <div>
            {NAV_ITEMS.map((item) => {
    const isActive =
      item.href === "/admin"
        ? pathname === "/admin"
        : pathname.startsWith(item.href);

    return (
      <Link
        key={item.href}
        href={item.href}
        className="relative px-4 py-2 rounded-full text-[14px] whitespace-nowrap"
      >
        {isActive && (
          <motion.span
            layoutId="nav-pill"
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 35,
            }}
            className="absolute inset-0 rounded-full border border-blue-100 bg-[#EEF7FB]"
          />
        )}

        <span
          className={`
            relative z-10 transition-colors duration-200
            ${
              isActive
                ? "text-[#058FD2] font-medium"
                : "text-zinc-500 hover:text-zinc-800"
            }
          `}
        >
          {item.label}
        </span>
      </Link>
    );
  })}
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          {/* <button className="relative w-11 h-11 rounded-xl border border-[#E4EAF0] flex items-center justify-center hover:bg-[#F8FAFC] transition-all">
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
          </button> */}

          {/* Profile */}
          <div className="flex items-center gap-3 pl-2">

            <div className="text-right">
              <span
                className="text-[17px] font-semibold text-[--primary-dark] leading-none"
              >
                Dr. Charu Garg
              </span>

              <p className="text-[11px] uppercase tracking-[0.18em] text-[#058FD2]">
                Admin Portal
              </p>
            </div>

            <div className="w-11 h-11 rounded-full bg-[#058FD2] text-white flex items-center justify-center font-semibold text-md">
              CG
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Row */}
{/* <div className="h-[60px] bg-white px-8 flex items-center justify-center gap-2 overflow-x-auto">
  {NAV_ITEMS.map((item) => {
    const isActive =
      item.href === "/admin"
        ? pathname === "/admin"
        : pathname.startsWith(item.href);

    return (
      <Link
        key={item.href}
        href={item.href}
        className="relative px-4 py-2 rounded-full text-[14px] whitespace-nowrap"
      >
        {isActive && (
          <motion.span
            layoutId="nav-pill"
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 35,
            }}
            className="absolute inset-0 rounded-full bg-[#EEF7FB]"
          />
        )}

        <span
          className={`
            relative z-10 transition-colors duration-200
            ${
              isActive
                ? "text-[#058FD2] font-medium"
                : "text-zinc-500 hover:text-zinc-800"
            }
          `}
        >
          {item.label}
        </span>
      </Link>
    );
  })}
</div> */}

      {/* Page Title Row */}
      <div className="py-5 px-12 flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-[--primary-dark]">
            {title}
          </h1>

          {/* {subtitle && (
            <p className="text-[13px] text-zinc-400 mt-1">
              {subtitle}
            </p>
          )} */}
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
