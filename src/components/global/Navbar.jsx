"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";

import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { HiArrowUpRight } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/redux/features/userSlice";
import Logo from "../../../public/images/brand/LogoTop.png";
import { GoArrowUpRight } from "react-icons/go";

const NAV_LINKS = [
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

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isPastFirstViewport, setIsPastFirstViewport] = useState(false);
  const [showFixedNavbar, setShowFixedNavbar] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const scrollFrameRef = useRef(null);
  const revealFrameRef = useRef(null);
  const isPastFirstViewportRef = useRef(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  // Fix: memoize the derived avatar initial so the profile button/dropdown do not recalculate it on unrelated renders.
  const userInitial = useMemo(
    () => user?.name?.charAt(0)?.toUpperCase() || "",
    [user?.name],
  );

  // Fix: keep logout state out of this component because success/error text was never rendered.
  const handleLogout = useCallback(async () => {
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
      dispatch(clearUser());

      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  // Fix: use one scheduled scroll updater instead of a separate effect that sets state synchronously.
  useEffect(() => {
    const revealFixedNavbar = () => {
      setShowFixedNavbar(true);
      revealFrameRef.current = null;
    };

    const updateNavbarPosition = () => {
      const pastViewport = window.scrollY >= window.innerHeight;

      if (pastViewport === isPastFirstViewportRef.current) {
        return;
      }

      isPastFirstViewportRef.current = pastViewport;
      setIsPastFirstViewport(pastViewport);

      if (!pastViewport) {
        if (revealFrameRef.current) {
          cancelAnimationFrame(revealFrameRef.current);
          revealFrameRef.current = null;
        }
        setShowFixedNavbar(false);
        return;
      }

      setShowFixedNavbar(false);
      revealFrameRef.current = requestAnimationFrame(revealFixedNavbar);
    };

    const handleScroll = () => {
      if (scrollFrameRef.current) return;

      scrollFrameRef.current = requestAnimationFrame(() => {
        scrollFrameRef.current = null;
        updateNavbarPosition();
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current);
      if (revealFrameRef.current) cancelAnimationFrame(revealFrameRef.current);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Fix: attach outside-click handling only while the dropdown is open.
  useEffect(() => {
    if (!profileOpen) return;

    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") setProfileOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [profileOpen]);

  // Fix: preserve the existing mobile-menu scroll lock and restore the previous body overflow on cleanup.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = openMenu ? "hidden" : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [openMenu]);

  return (
    <>
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
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src={Logo}
              alt="Dr Charu Garg Clinic"
              className="h-12 w-auto object-contain md:h-20 xl:h-18"
              priority
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden flex-1 justify-center xl:flex">
            <div className="flex items-center gap-9">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
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
            <Link
              href="/book-appointment"
              className="flex items-center gap-2 rounded-full bg-primary-dark px-6 py-3 text-[15px] font-medium text-white transition-all duration-300 hover:scale-[1.02]"
            >
              {user ? "Book Appointment" : "Login to Book Appointment"}
            </Link>

            {user ? (
              <>
                {/* Profile */}
                <div className="relative" ref={profileRef}>
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={profileOpen}
                    onClick={() => setProfileOpen((open) => !open)}
                    className="flex items-center gap-2 rounded-full border border-primary-dark/20 bg-white py-2 pl-2 pr-4  transition-all duration-300 hover:shadow-md"
                  >
                    {/* Avatar */}
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0D8CE9] text-lg font-semibold text-white">
                      {userInitial}
                    </div>

                    {/* Name */}
                    <div className="text-left">
                      <h4 className="text-md font-semibold text-primary-dark">
                        {user?.name}
                      </h4>

                      {/* <p className="text-xs text-gray-500">My Account</p> */}
                    </div>

                    <HiChevronDown
                      className={`text-xl transition-transform duration-300 ${
                        profileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown */}
                  <div
                    role="menu"
                    aria-hidden={!profileOpen}
                    className={`absolute right-0 top-[calc(100%+12px)] z-50 w-[280px] origin-top-right transform-gpu overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out will-change-transform ${
                      profileOpen
                        ? "translate-y-0 opacity-100 scale-100"
                        : "-translate-y-2 opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    {/* User Info */}
                    <div className="flex items-center gap-3 p-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0D8CE9] text-lg font-semibold text-white">
                        {userInitial}
                      </div>

                      <div className="min-w-0">
                        <h4 className="truncate text-[16px] font-semibold text-primary-dark">
                          {user?.name}
                        </h4>

                        <p className="text-sm text-gray-500">My Account</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-100" />

                    {/* Dashboard */}
                    <Link
                      href="/dashboard"
                      role="menuitem"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-[15px] font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      <HiOutlineUserCircle className="text-[20px]" />
                      Dashboard
                    </Link>

                    {/* Logout */}
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] font-medium text-red-500 transition hover:bg-red-50"
                    >
                      <HiOutlineArrowRightOnRectangle className="text-[20px]" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-full border border-primary-dark/10 bg-white px-5 py-3 text-[15px] font-medium text-primary-dark transition-all duration-300 hover:bg-primary-dark hover:text-white"
              >
                Login
              </Link>
            )}
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
            type="button"
            aria-label="Open menu"
            aria-expanded={openMenu}
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
          <div className="flex h-full flex-col px-3 pt-3">
            {/* TOP NAV */}
            <div className="flex h-[72px] items-center justify-between rounded-[30px] border border-black/[0.04] bg-white py-4 px-4">
              {/* LEFT */}
              <Link href="/" className="flex items-center gap-3">
                <div>
                  <Image
                    src={Logo}
                    alt="Dr Charu Garg Clinic"
                    className="h-12 w-auto object-contain md:h-14"
                    priority
                  />
                </div>
              </Link>

              {/* CLOSE BUTTON */}
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpenMenu(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-dark text-white"
              >
                <IoCloseOutline className="text-[28px]" />
              </button>
            </div>

            {/* NAVIGATION — now scrollable so it never overflows/hides the bottom card on shorter screens */}
            <div className="flex min-h-0 flex-1 flex-col justify-between overflow-y-auto pt-5">
              {/* LINKS */}
              <div className="flex flex-col gap-1.5">
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpenMenu(false)}
                    className="flex items-center justify-between rounded-[22px] bg-white px-4 py-3.5"
                  >
                    <span className="text-[21px] font-semibold leading-none text-primary-dark">
                      {item.label}
                    </span>

                    <HiArrowUpRight className="text-[20px] text-primary-dark" />
                  </Link>
                ))}
              </div>

              {/* BOTTOM CARD */}
              <div className="mb-4 mt-4 shrink-0 space-y-2">
                <Link
                  href="/book-appointment"
                  onClick={() => setOpenMenu(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-dark py-3 text-[14px] font-medium text-white"
                >
                  Book Appointment
                  <HiArrowUpRight className="text-[18px]" />
                </Link>
                {user && (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setOpenMenu(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white py-3 text-[14px] font-semibold text-primary-dark"
                    >
                      <HiOutlineUserCircle className="text-[18px]" />
                      Profile
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-red-100 bg-white py-3 text-[14px] font-semibold text-red-500"
                    >
                      <HiOutlineArrowRightOnRectangle className="text-[18px]" />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
