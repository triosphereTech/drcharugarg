"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { HiArrowUpRight } from "react-icons/hi2";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
const handleLogout = async () => {
  // Clear user session or token here
  // For example, if using cookies:
      try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to logout.");
      }
      setMessage(data.message || "Logout successful.");
      
      window.location.href = "/"; // Redirect to login page after logout
    } catch (err) {
      setError(err.message);
    } finally {
    }


}
  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openMenu]);

  const navLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/",
    },
    {
      label: "Treatments",
      href: "/",
    },
    {
      label: "Results",
      href: "/",
    },
    {
      label: "Contact",
      href: "/",
    },
  ];

  return (
    <>
      {/* DESKTOP + MOBILE NAVBAR */}
      <header className="fixed top-0 z-50 w-full px-3  md:px-5 ">
        <div className="flex h-[62px] items-center justify-between bg-white/30 rounded-[30px]  px-4 backdrop-blur-xl md:h-[84px] md:px-7 xl:px-10">
          {/* LEFT */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-dark text-[18px] font-semibold text-white">
              D
            </div>

            <div>
              <h2 className="text-[18px] font-semibold tracking-[-0.5px] text-primary-dark md:text-[21px]">
                Dr Charu Garg
              </h2>

              <p className="text-[13px] font-medium text-primary-dark/45 md:text-[14px]">
                Dermatology
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-11 xl:flex">
            {navLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-[15px] font-medium text-primary-dark transition-all duration-300 hover:opacity-60"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* DESKTOP BUTTON */}
          <div className="hidden xl:block">
            <button className="flex items-center gap-2 rounded-full bg-primary-dark px-6 py-3 text-[15px] font-medium text-white transition-all duration-300 hover:scale-[1.02]">
              Book Appointment

              <HiArrowUpRight className="text-[18px]" />
            </button>
            
          </div>
            <div className="hidden xl:block">
            <button className="flex items-center gap-2 rounded-full bg-primary-dark px-6 py-3 text-[15px] font-medium text-white transition-all duration-300 hover:scale-[1.02]"
            onClick={async () => {
              await  handleLogout();
            }
          }
            >
         Logout 

              <HiArrowUpRight className="text-[18px]" />
            </button>
            
          </div>
          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpenMenu(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-dark text-white xl:hidden"
          >
            <HiOutlineMenuAlt3 className="text-[24px]" />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[999] transition-all duration-500 ${
          openMenu
            ? "pointer-events-auto bg-black/25 opacity-100"
            : "pointer-events-none bg-black/0 opacity-0"
        }`}
      >
        {/* MOBILE PANEL */}
        <div
          className={`relative h-full w-full bg-[#f7f7f4] transition-all duration-500 ${
            openMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* INNER WRAPPER */}
          <div className="flex h-full flex-col px-3 pt-3">
            {/* TOP NAV */}
            <div className="flex h-[72px] items-center justify-between rounded-[30px] border border-black/[0.04] bg-white px-4">
              {/* LEFT */}
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-dark text-[18px] font-semibold text-white">
                  D
                </div>

                <div>
                  <h2 className="text-[18px] font-semibold tracking-[-0.5px] text-primary-dark">
                    Dr Charu Garg
                  </h2>

                  <p className="text-[13px] font-medium text-primary-dark/45">
                    Dermatology
                  </p>
                </div>
              </Link>

              {/* CLOSE BUTTON */}
              <button
                onClick={() => setOpenMenu(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-dark text-white"
              >
                <IoCloseOutline className="text-[28px]" />
              </button>
            </div>

            {/* NAVIGATION */}
            <div className="flex flex-1 flex-col justify-between pt-8">
              {/* LINKS */}
              <div className="flex flex-col gap-2">
                {navLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setOpenMenu(false)}
                    className="flex items-center justify-between rounded-[28px] bg-white px-5 py-5"
                  >
                    <span className="text-[32px] font-semibold leading-none tracking-[-1.8px] text-primary-dark">
                      {item.label}
                    </span>

                    <HiArrowUpRight className="text-[24px] text-primary-dark" />
                  </Link>
                ))}
              </div>

              {/* BOTTOM CARD */}
              <div className="mb-3 mt-8 rounded-[32px] border border-black/[0.04] bg-white p-5">
                <p className="text-[15px] font-medium leading-[170%] text-primary-dark/55">
                  Advanced dermatology care focused on healthy skin,
                  confidence, and long-term wellness.
                </p>

                <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary-dark py-4 text-[16px] font-medium text-white">
                  Book Appointment

                  <HiArrowUpRight className="text-[20px]" />
                </button>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;