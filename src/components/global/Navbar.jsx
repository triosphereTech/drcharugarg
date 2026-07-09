"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { HiArrowUpRight } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/redux/features/userSlice";
import Logo from "../../../public/images/brand/LogoTop.png";
import { GoArrowUpRight } from "react-icons/go";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isPastFirstViewport, setIsPastFirstViewport] = useState(false);
  const [showFixedNavbar, setShowFixedNavbar] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const handleLogout = async () => {
    // Clear user session or token here
    // For example, if using cookies:
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to logout.");
      }
      dispatch(clearUser()); // Clear user from Redux store
      setMessage(data.message || "Logout successful.");

      window.location.href = "/"; // Redirect to login page after logout
    } catch (err) {
      setError(err.message);
    } finally {
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsPastFirstViewport(window.scrollY >= window.innerHeight);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isPastFirstViewport) {
      setShowFixedNavbar(false);
      return;
    }

    const frame = requestAnimationFrame(() => {
      setShowFixedNavbar(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [isPastFirstViewport]);

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
      href: "/about",
    },
    {
      label: "Our Facilities",
      href: "/#services",
    },
    {
      label: "FAQs",
      href: "/#faqs",
    },
    {
      label: "Blogs",
      href: "/#blogs",
    },
    {
      label: "Contact Us",
      href: "/contact",
    },
  ];

  return (
    <>
      {/* DESKTOP + MOBILE NAVBAR */}
      {/* DESKTOP + MOBILE NAVBAR */}
      <header
        className={`top-0 z-50 w-full px-3 md:px-5 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isPastFirstViewport
            ? `fixed bg-transparent ${
                showFixedNavbar
                  ? "translate-y-0 opacity-100 scale-100"
                  : "-translate-y-10 opacity-0 scale-[0.98]"
              }`
            : "absolute translate-y-0 bg-white opacity-100 scale-100"
        }`}
      >
        <div className="flex mt-2 h-[62px] items-center rounded-[30px] bg-white/65 px-1 backdrop-blur-md transition-all duration-500 ease-in-out md:h-[84px] md:px-7 xl:px-10">
          {/* LEFT */}
          {/* LEFT */}
          <Link href="/" className="flex shrink-0 items-center">
            <img
              src={Logo.src}
              alt="Dr Charu Garg Clinic"
              className="h-12 w-auto object-contain md:h-20 xl:h-18"
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden flex-1 justify-center xl:flex">
            <div className="flex items-center gap-9">
              {navLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-[17px] font-medium text-primary-dark transition-all duration-300 hover:opacity-60"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="ml-auto hidden items-center gap-3 xl:flex">
            {user ? (
              <>
                {/* <span className="max-w-[120px] bg-white px-3 py-2 rounded-full shadow-inner truncate text-[15px] font-medium text-primary-dark">
              {user.name}
            </span> */}

                <button
                  onClick={handleLogout}
                  className="rounded-full border border-primary-dark/10 bg-white px-5 py-3 text-[15px] font-medium text-primary-dark transition-all duration-300 hover:bg-primary-dark hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <button className="rounded-full border border-primary-dark/10 bg-white px-5 py-3 text-[15px] font-medium text-primary-dark transition-all duration-300 hover:bg-primary-dark hover:text-white">
                  Login
                </button>
              </Link>
            )}

            <Link
              href="/book-appointment"
              className="flex active:scale-95 items-center gap-2 rounded-full bg-primary-dark px-6 py-3 text-[15px] font-medium text-white transition-all duration-300 hover:scale-[1.02]"
            >
              {user ? "Book Appointment" : "Login to Book Appointment"}
              <HiArrowUpRight className="text-[18px]" />
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-3 xl:hidden">
            <Link
              href="/book-appointment"
              className="flex items-center gap-1 px-3 py-2 bg-[#40b5c7] border border-gray-200 backdrop-blur-md text-white rounded-full text-sm font-medium transition-all duration-300 hover:bg-primary-dark hover:text-white"
            >
              Make a Booking
              <GoArrowUpRight />
            </Link>
          </div>
          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpenMenu(true)}
            className="ml-1 flex h-auto w-auto p-2 items-center justify-center rounded-full bg-primary-dark text-white xl:hidden"
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
          {/* INNER WRAPPER */}
          <div className="flex h-full flex-col px-3 pt-3">
            {/* TOP NAV */}
            <div className="flex h-[72px] items-center justify-between rounded-[30px] border border-black/[0.04] bg-white py-4 px-4">
              {/* LEFT */}
              <Link href="/" className="flex items-center gap-3">
                <div>
                  <img
                    src={Logo.src}
                    alt="Dr Charu Garg Clinic"
                    className="h-12 w-auto object-contain md:h-14"
                  />
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

            {/* NAVIGATION — now scrollable so it never overflows/hides the bottom card on shorter screens */}
            <div className="flex min-h-0 flex-1 flex-col justify-between overflow-y-auto pt-8">
              {/* LINKS */}
              <div className="flex flex-col gap-2">
                {navLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setOpenMenu(false)}
                    className="flex items-center justify-between rounded-[28px] bg-white px-5 py-5"
                  >
                    <span className="text-[28px] font-semibold leading-none text-primary-dark">
                      {item.label}
                    </span>

                    <HiArrowUpRight className="text-[24px] text-primary-dark" />
                  </Link>
                ))}
              </div>

              {/* BOTTOM CARD */}
              <div className="mb-5 shrink-0">
                <Link
                  href="/book-appointment"
                  onClick={() => setOpenMenu(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-dark py-4 text-[16px] font-medium text-white"
                >
                  Book Appointment
                  <HiArrowUpRight className="text-[20px]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
