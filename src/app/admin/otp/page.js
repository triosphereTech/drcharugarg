"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineArrowRight,
} from "react-icons/hi2";

export default function AdminOtpPage() {
  const router = useRouter();
  const [email] = useState(() => {
    if (typeof window === "undefined") return "";
    return sessionStorage.getItem("adminLoginEmail") || "";
  });
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [seconds, setSeconds] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const otpValue = otp.join("");
  const formattedSeconds = String(seconds).padStart(2, "0");

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  function handleChange(element, index) {
    const value = element.value.replace(/\D/g, "");

    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(e, index) {
    if (e.key !== "Backspace") return;

    e.preventDefault();
    const newOtp = [...otp];

    if (otp[index]) {
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
      newOtp[index - 1] = "";
      setOtp(newOtp);
    }
  }

  async function verifyLogin() {
    setMessage("");
    setError("");

    if (!email) {
      setError("Email is missing. Please request OTP again.");
      return;
    }

    if (otpValue.length !== 6) {
      setError("Please enter the 6 digit OTP.");
      return;
    }

    setIsVerifying(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: otpValue,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to login.");
      }

      sessionStorage.removeItem("adminLoginEmail");
      setMessage(data.message || "Login successful.");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsVerifying(false);
    }
  }

  async function resendOtp() {
    setMessage("");
    setError("");

    if (!email) {
      router.replace("/admin/login");
      return;
    }

    setIsResending(true);

    try {
      const response = await fetch("/api/admin/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to resend OTP.");
      }

      setOtp(new Array(6).fill(""));
      setSeconds(60);
      setMessage(data.message || "OTP sent successfully.");
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsResending(false);
    }
  }

  function changeEmail() {
    sessionStorage.removeItem("adminLoginEmail");
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#f8fbfd] overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 min-h-screen flex items-center py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md hidden lg:block"
          >
            <span className="text-[#058FD2] text-sm font-medium tracking-wide">
              SECURE ADMIN VERIFICATION
            </span>

            <h1 className="text-4xl xl:text-5xl leading-tight font-semibold text-[#131C15] mt-4">
              One step away from the dashboard.
            </h1>

            <p className="text-[#66706b] text-base leading-7 mt-5">
              Verify your email securely to continue managing appointments, patients, and prescriptions.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white border border-[#e7eef2] flex items-center justify-center text-[#058FD2] text-xl">
                  <HiOutlineShieldCheck />
                </div>
                <p className="text-[#131C15] text-base font-medium">
                  Secure Admin Authentication
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white border border-[#e7eef2] flex items-center justify-center text-[#058FD2] text-xl">
                  <HiOutlineClock />
                </div>
                <p className="text-[#131C15] text-base font-medium">
                  Quick Dashboard Access
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md lg:ml-auto"
          >
            <div>
              <span className="inline-flex items-center gap-2 text-[#058FD2] text-sm font-medium">
                <HiOutlineShieldCheck className="text-base" />
                Admin Verification
              </span>

              <h2 className="text-3xl xl:text-4xl leading-tight font-semibold text-[#131C15] mt-4">
                Enter OTP
              </h2>

              <p className="text-[#6c7671] text-base leading-7 mt-3">
                We have sent a 6-digit verification code to{" "}
                {email || "your registered admin email address"}.
              </p>
            </div>

            <div className="mt-10">
              <div className="flex items-center justify-between gap-3 sm:gap-4">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    value={data}
                    maxLength={1}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-14 sm:w-14 sm:h-16 rounded-2xl border border-[#e4ebef] bg-white text-center text-xl sm:text-2xl font-semibold text-[#131C15] outline-none focus:border-[#058FD2] transition-all"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between mt-5">
                <p className="text-sm text-[#8b9590]">
                  Resend code in 00:{formattedSeconds}
                </p>

                <button
                  disabled={seconds > 0 || isResending}
                  onClick={resendOtp}
                  className={`text-sm font-medium transition-all ${
                    seconds > 0 || isResending
                      ? "text-[#b4bfba] cursor-not-allowed"
                      : "text-[#058FD2]"
                  }`}
                >
                  {isResending ? "Sending..." : "Resend OTP"}
                </button>
              </div>

              {message && <p className="text-sm font-medium text-emerald-600 mt-5">{message}</p>}
              {error && <p className="text-sm font-medium text-red-500 mt-5">{error}</p>}

              <button
                onClick={verifyLogin}
                disabled={isVerifying}
                className="w-full h-[58px] rounded-full bg-[#058FD2] hover:bg-[#047fbc] disabled:bg-slate-300 disabled:cursor-not-allowed transition-all text-white font-medium flex items-center justify-center gap-2 mt-8"
              >
                {isVerifying ? "Verifying..." : "Verify & Login"}
                <HiOutlineArrowRight className="text-lg" />
              </button>

              <div className="mt-6 text-center">
                <p className="text-sm text-[#7e8883]">
                  Wrong email?{" "}
                  <button
                    type="button"
                    onClick={changeEmail}
                    className="text-[#058FD2] font-medium cursor-pointer"
                  >
                    Change Email
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}