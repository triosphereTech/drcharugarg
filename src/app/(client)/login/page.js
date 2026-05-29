'use client'
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import { MdOutlineEmail } from "react-icons/md";
import { useSelector } from "react-redux";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [error, setError] = useState("");

    const user = useSelector(
    (state) => state.user.user
  );
    console.log("User from Redux store:", user);
  useEffect(() => {

    if (user) {
      router.replace("/");
    }

  }, [user, router]);

  const features = [
    {
      icon: <HiOutlineShieldCheck />,
      title: "Secure OTP Verification",
    },
    {
      icon: <HiOutlineSparkles />,
      title: "Fast & Seamless Access",
    },
  ];

  const sendOtp = async () => {
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setIsSendingOtp(true);

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send OTP.");
      }
      sessionStorage.setItem("loginEmail", email);
      router.replace("/otp");

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSendingOtp(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbfd] overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 min-h-screen flex items-center py-6 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center w-full">
          
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md hidden lg:block"
          >
            <span className="text-[#058FD2] text-sm font-medium tracking-wide">
              PREMIUM DERMATOLOGY CARE
            </span>

            <h1 className="text-4xl xl:text-5xl leading-tight font-semibold text-[#131C15] mt-4">
              Welcome back to your care portal.
            </h1>

            <p className="text-[#66706b] text-base leading-7 mt-5">
              Access appointments, consultations, treatment records, and
              personalized dermatology services securely with OTP login.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-5">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4"
                >
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

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md lg:ml-auto"
          >
            <div>
              <h2 className="text-3xl xl:text-4xl leading-tight font-semibold text-[#131C15]">
                Login
              </h2>

              <p className="text-[#6c7671] text-base leading-7 mt-3">
                Enter your registered email address to receive a secure OTP.
              </p>
            </div>

            {/* FORM */}
            <div className="mt-10 space-y-5">
              
              {/* EMAIL */}
              <div>
                {/* <label className="text-sm text-[#131C15] font-medium block mb-3">
                  Email Address
                </label> */}

                <div className="h-[58px] rounded-full bg-white border border-[#e4ebef] px-5 flex items-center gap-3 focus-within:border-[#058FD2] transition-all">
                  <MdOutlineEmail className="text-[#058FD2] text-xl" />

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent outline-none text-base text-[#131C15] placeholder:text-[#9aa5a0]"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm font-medium text-red-500">{error}</p>
              )}

              <button
                onClick={sendOtp}
                disabled={isSendingOtp}
                className="w-full h-[58px] cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-300 active:scale-95 duration-300 rounded-full 
              bg-[#058FD2] hover:bg-[#047fbc] transition-all text-white font-medium flex items-center justify-center gap-2 mt-2">
                {isSendingOtp ? "Sending OTP..." : "Get OTP"}
                <HiOutlineArrowRight className="text-lg" />
              </button>
            </div>

            {/* FOOTER */}
            <div className="mt-8">
              <p className="text-[#7e8883] text-sm">
                Don’t have an account?{" "}
                <Link href="/signup">
                <span className="text-[#058FD2] font-medium cursor-pointer">
                  Sign Up
                </span>
                </Link>
              </p>

              <p className="text-xs text-[#9aa4a0] leading-6 mt-6">
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

export default LoginPage;
