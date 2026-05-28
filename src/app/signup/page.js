'use client'
import { motion } from "framer-motion";
import {
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineCalendarDays,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import { MdOutlineEmail } from "react-icons/md";
import { FiUser, FiPhone } from "react-icons/fi";

const SignupPage = () => {
  const features = [
    {
      icon: <HiOutlineShieldCheck />,
      title: "Secure OTP Access",
    },
    {
      icon: <HiOutlineCalendarDays />,
      title: "Easy Appointment Management",
    },
    {
      icon: <HiOutlineSparkles />,
      title: "Personalized Skin Care Journey",
    },
  ];

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
              PREMIUM DERMATOLOGY CARE
            </span>

            <h1 className="text-4xl xl:text-5xl leading-tight font-semibold text-[#131C15] mt-4">
              Create your patient account.
            </h1>

            <p className="text-[#66706b] text-base leading-7 mt-5">
              Access appointments, consultations, treatment plans, and secure
              dermatology services with a clean and seamless experience.
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
                Sign Up
              </h2>

              <p className="text-[#6c7671] text-base leading-7 mt-3">
                Enter your details to continue securely.
              </p>
            </div>

            {/* FORM */}
            <div className="mt-10 space-y-5">
              
              {/* NAME */}
              <div>
                {/* <label className="text-sm text-[#131C15] font-medium block mb-3">
                  Full Name
                </label> */}

                <div className="h-[58px] rounded-full bg-white border border-[#e4ebef] px-5 flex items-center gap-3 focus-within:border-[#058FD2] transition-all">
                  <FiUser className="text-[#058FD2] text-lg" />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full bg-transparent outline-none text-base text-[#131C15] placeholder:text-[#9aa5a0]"
                  />
                </div>
              </div>

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
                    className="w-full bg-transparent outline-none text-base text-[#131C15] placeholder:text-[#9aa5a0]"
                  />
                </div>
              </div>

              {/* PHONE */}
              <div>
                {/* <label className="text-sm text-[#131C15] font-medium block mb-3">
                  Mobile Number
                </label> */}

                <div className="h-[58px] rounded-full bg-white border border-[#e4ebef] px-5 flex items-center gap-3 focus-within:border-[#058FD2] transition-all">
                  <FiPhone className="text-[#058FD2] text-lg" />

                  <input
                    type="tel"
                    placeholder="Enter your mobile number"
                    className="w-full bg-transparent outline-none text-base text-[#131C15] placeholder:text-[#9aa5a0]"
                  />
                </div>

                <p className="text-xs text-[#8b9590] mt-2">
                  Used for appointment updates and verification.
                </p>
              </div>

              {/* BUTTON */}
              <button className="w-full h-[58px] cursor-pointer active:scale-95 duration-300 rounded-full bg-[#058FD2] hover:bg-[#047fbc] transition-all text-white font-medium flex items-center justify-center gap-2 mt-2">
                Get OTP
                <HiOutlineArrowRight className="text-lg" />
              </button>
            </div>

            {/* FOOTER */}
            <div className="mt-8">
              <p className="text-[#7e8883] text-sm">
                Already have an account?{" "}
                <span className="text-[#058FD2] font-medium cursor-pointer">
                  Login
                </span>
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

export default SignupPage;