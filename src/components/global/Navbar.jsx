"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { HiArrowUpRight } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/redux/features/userSlice";

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
  <div className="flex h-[62px] items-center rounded-[30px] bg-white/30 px-4 backdrop-blur-xl transition-all duration-500 ease-in-out md:h-[84px] md:px-7 xl:px-10">
    
    {/* LEFT */}
    <Link
      href="/"
      className="flex w-[280px] shrink-0 items-center gap-3"
    >
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

      <Link href="#booking" className="flex active:scale-95 items-center gap-2 rounded-full bg-primary-dark px-6 py-3 text-[15px] font-medium text-white transition-all duration-300 hover:scale-[1.02]">
       {user ? ( "Book Appointment"):("Login to Book Appointment")} 
        <HiArrowUpRight className="text-[18px]" />
      </Link>
    </div>

    {/* MOBILE MENU BUTTON */}
    <button
      onClick={() => setOpenMenu(true)}
      className="ml-auto flex h-auto w-auto p-2 items-center justify-center rounded-full bg-primary-dark text-white xl:hidden"
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
                {/* <p className="text-[15px] font-medium leading-[170%] text-primary-dark/55">
                  Advanced dermatology care focused on healthy skin, confidence,
                  and long-term wellness.
                </p> */}

                <a id="#booking" className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary-dark py-4 text-[16px] font-medium text-white">
                  Book Appointment
                  <HiArrowUpRight className="text-[20px]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
