"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import { MdOutlineEmail } from "react-icons/md";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [error, setError] = useState("");

  const features = [
    {
      icon: <HiOutlineShieldCheck />,
      title: "Secure Admin Verification",
    },
    {
      icon: <HiOutlineSparkles />,
      title: "Fast Dashboard Access",
    },
  ];

  async function sendOtp() {
    setError("");

    if (!email.trim()) {
      setError("Please enter your admin email address.");
      return;
    }

    setIsSendingOtp(true);

    try {
      const response = await fetch("/api/admin/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send OTP.");
      }

      sessionStorage.setItem("adminLoginEmail", email.trim());
      router.replace("/admin/otp");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSendingOtp(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fbfd] overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 min-h-screen flex items-center py-6 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md hidden lg:block"
          >
            <span className="text-[#058FD2] text-sm font-medium tracking-wide">
              ADMIN PORTAL
            </span>

            <h1 className="text-4xl xl:text-5xl leading-tight font-semibold text-[#131C15] mt-4">
              Welcome back to the admin dashboard.
            </h1>

            <p className="text-[#66706b] text-base leading-7 mt-5">
              Manage appointments, patients, prescriptions, and consultation records securely with OTP login.
            </p>

            <div className="mt-10 space-y-5">
              {features.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-white border border-[#e7eef2] flex items-center justify-center text-[#058FD2] text-xl">
                    {item.icon}
                  </div>
                  <p className="text-[#131C15] text-base font-medium">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md lg:ml-auto"
          >
            <div>
              <h2 className="text-3xl xl:text-4xl leading-tight font-semibold text-[#131C15]">
                Admin Login
              </h2>
              <p className="text-[#6c7671] text-base leading-7 mt-3">
                Enter your registered admin email address to receive a secure OTP.
              </p>
            </div>

            <div className="mt-10 space-y-5">
              <div className="h-[58px] rounded-full bg-white border border-[#e4ebef] px-5 flex items-center gap-3 focus-within:border-[#058FD2] transition-all">
                <MdOutlineEmail className="text-[#058FD2] text-xl" />
                <input
                  type="email"
                  placeholder="Enter admin email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendOtp();
                  }}
                  className="w-full bg-transparent outline-none text-base text-[#131C15] placeholder:text-[#9aa5a0]"
                />
              </div>

              {error && <p className="text-sm font-medium text-red-500">{error}</p>}

              <button
                onClick={sendOtp}
                disabled={isSendingOtp}
                className="w-full h-[58px] cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-300 active:scale-95 duration-300 rounded-full bg-[#058FD2] hover:bg-[#047fbc] transition-all text-white font-medium flex items-center justify-center gap-2 mt-2"
              >
                {isSendingOtp ? "Sending OTP..." : "Get OTP"}
                <HiOutlineArrowRight className="text-lg" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}