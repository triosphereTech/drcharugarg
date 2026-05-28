'use client'
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineArrowRight,
} from "react-icons/hi2";

const OtpPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [seconds, setSeconds] = useState(28);

  const inputRefs = useRef([]);

  // Countdown Timer
  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [seconds]);

  // OTP Change
  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, "");

    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Backspace Support
// Backspace Support
const handleKeyDown = (e, index) => {
  if (e.key === "Backspace") {
    e.preventDefault();

    const newOtp = [...otp];

    // If current field has value -> clear it
    if (otp[index]) {
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    // Move to previous field and clear it instantly
    if (index > 0) {
      inputRefs.current[index - 1].focus();

      newOtp[index - 1] = "";
      setOtp(newOtp);
    }
  }
};

  // Format Timer
  const formattedSeconds = String(seconds).padStart(2, "0");

  return (
    <div className="min-h-screen bg-[#f8fbfd] overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 min-h-screen flex items-center py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center w-full">
          
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md hidden lg:block"
          >
            <span className="text-[#058FD2] text-sm font-medium tracking-wide">
              SECURE OTP VERIFICATION
            </span>

            <h1 className="text-4xl xl:text-5xl leading-tight font-semibold text-[#131C15] mt-4">
              One step away from your care portal.
            </h1>

            <p className="text-[#66706b] text-base leading-7 mt-5">
              Verify your email securely to continue accessing appointments,
              consultations, and personalized dermatology services.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-5">
              
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white border border-[#e7eef2] flex items-center justify-center text-[#058FD2] text-xl">
                  <HiOutlineShieldCheck />
                </div>

                <p className="text-[#131C15] text-base font-medium">
                  End-to-End Secure Authentication
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white border border-[#e7eef2] flex items-center justify-center text-[#058FD2] text-xl">
                  <HiOutlineClock />
                </div>

                <p className="text-[#131C15] text-base font-medium">
                  Quick & Seamless Verification
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md lg:ml-auto"
          >
            <div>
              <span className="inline-flex items-center gap-2 text-[#058FD2] text-sm font-medium">
                <HiOutlineShieldCheck className="text-base" />
                Secure Verification
              </span>

              <h2 className="text-3xl xl:text-4xl leading-tight font-semibold text-[#131C15] mt-4">
                Enter OTP
              </h2>

              <p className="text-[#6c7671] text-base leading-7 mt-3">
                We’ve sent a 6-digit verification code to your registered email address.
              </p>
            </div>

            {/* OTP INPUTS */}
            <div className="mt-10">
              <div className="flex items-center justify-between gap-3 sm:gap-4">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    value={data}
                    maxLength={1}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-14 sm:w-14 sm:h-16 rounded-2xl border border-[#e4ebef] bg-white text-center text-xl sm:text-2xl font-semibold text-[#131C15] outline-none focus:border-[#058FD2] transition-all"
                  />
                ))}
              </div>

              {/* TIMER */}
              <div className="flex items-center justify-between mt-5">
                <p className="text-sm text-[#8b9590]">
                  Resend code in 00:{formattedSeconds}
                </p>

                <button
                  disabled={seconds > 0}
                  onClick={() => setSeconds(28)}
                  className={`text-sm font-medium transition-all ${
                    seconds > 0
                      ? "text-[#b4bfba] cursor-not-allowed"
                      : "text-[#058FD2]"
                  }`}
                >
                  Resend OTP
                </button>
              </div>

              {/* BUTTON */}
              <button className="w-full h-[58px] rounded-full bg-[#058FD2] hover:bg-[#047fbc] transition-all text-white font-medium flex items-center justify-center gap-2 mt-8">
                Verify & Login
                <HiOutlineArrowRight className="text-lg" />
              </button>

              {/* CHANGE EMAIL */}
              <div className="mt-6 text-center">
                <p className="text-sm text-[#7e8883]">
                  Wrong email?{" "}
                  <span className="text-[#058FD2] font-medium cursor-pointer">
                    Change Email
                  </span>
                </p>
              </div>

              {/* FOOTER */}
              <p className="text-xs text-[#9aa4a0] leading-6 mt-8 text-center">
                By continuing, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;