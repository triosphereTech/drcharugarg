"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Logo from "@/../public/images/brand/LogoTop.png";

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
  const router = useRouter();
  const profileRef = useRef(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  useEffect(() => {
    function closeProfile(event) {
      if (!profileRef.current?.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    function closeOnEscape(event) {
      if (event.key === "Escape") setProfileOpen(false);
    }

    document.addEventListener("mousedown", closeProfile);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeProfile);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  async function logout() {
    setIsLoggingOut(true);
    setLogoutError("");

    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      const data = await response.json();

      if (!response.ok && response.status !== 401) {
        throw new Error(data.message || "Unable to log out.");
      }

      sessionStorage.removeItem("adminLoginEmail");
      router.replace("/admin/login");
      router.refresh();
    } catch (error) {
      setLogoutError(error.message);
      setIsLoggingOut(false);
    }
  }

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
             alt="Dr. Charu Garg"
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
          <div ref={profileRef} className="relative pl-2">
            <button
              type="button"
              onClick={() => setProfileOpen((open) => !open)}
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              className="flex items-center gap-3 rounded-2xl p-1.5 text-left transition-colors hover:bg-[#F5FAFC]"
            >
              <div className="text-right">
                <span className="text-[17px] font-semibold text-[--primary-dark] leading-none">
                  Dr. Charu Garg
                </span>

                <p className="text-[11px] uppercase tracking-[0.18em] text-[#058FD2]">
                  Admin Portal
                </p>
              </div>

              <div className="w-11 h-11 rounded-full bg-[#058FD2] text-white flex items-center justify-center font-semibold text-md">
                CG
              </div>
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -6 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  role="menu"
                  className="absolute right-0 top-[calc(100%+8px)] z-50 w-56 overflow-hidden rounded-2xl border border-[#DDEBF2] bg-white shadow-xl shadow-slate-200/60"
                >
                  <div className="border-b border-[#EEF2F5] px-4 py-3">
                    <p className="text-sm font-semibold text-[#131C15]">Dr. Charu Garg</p>
                    <p className="mt-0.5 text-xs text-zinc-400">Administrator</p>
                  </div>

                  <div className="p-2">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={logout}
                      disabled={isLoggingOut}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 8l4 4m0 0-4 4m4-4H9m3 7H6a2 2 0 01-2-2V7a2 2 0 012-2h6" />
                      </svg>
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </button>

                    {logoutError && (
                      <p className="px-3 pb-2 pt-1 text-xs text-red-500">{logoutError}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
