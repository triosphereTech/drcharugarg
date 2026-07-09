// components/services/ServiceHero.jsx

"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FaFlask, FaShieldAlt, FaUserMd } from "react-icons/fa";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 70,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeIn = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.12,
    },
  },
};

const ServiceHero = ({ data }) => {
  return (
    <section className="relative overflow-x-hidden overflow-y-visible bg-linear-[120deg] from-[#315e95] via-[#039bd3] to-[#50b1a2] pt-28 pb-5 md:pb-20 md:pt-36">
      {/* Background Blur */}
      <div className="pointer-events-none absolute -left-55 top-0 h-[300px] w-[300px] rounded-full bg-[#095c88] blur-[100px]" />

      <div className="relative mx-auto grid w-full max-w-[1350px] grid-cols-1 gap-5 md:gap-10 px-5 md:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16 lg:px-10">
        {/* Left Content */}
        <motion.div
          className="min-w-0"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            className="mb-5 flex w-fit items-center gap-2 rounded-full border border-[#d8eaf4] bg-white/20 px-4 py-2"
          >
            <div className="h-2 w-2 shrink-0 rounded-full bg-[#ffffff]" />

            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#ffffff]">
              Our Services
            </p>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="max-w-full text-2xl font-semibold leading-[1.15] text-white md:text-5xl"
          >
            {data.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-[620px] text-sm md:text-md lg:text-lg leading-8 text-white md:text-base"
          >
            {data.description}
          </motion.p>

          {/* Features */}
          <motion.div
            variants={fadeUp}
            className="mt-3 flex w-full gap-3 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {data.features?.map((item, index) => (
              <div
                key={index}
                className="shrink-0 whitespace-nowrap rounded-full border border-[#dbe7ee]/40 bg-white/20 px-4 py-2 text-sm font-medium text-white"
              >
                {item}
              </div>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div variants={fadeUp} className="hidden mt-5 md:flex flex-wrap gap-4">
            <Link
              href="/book-appointment"
              className="rounded-full bg-[#131C15] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#058FD2] active:scale-95"
            >
              Book Appointment
            </Link>
          </motion.div>

          {/* Bottom Stats */}
          <motion.div
            variants={staggerContainer}
            className="mt-3 flex flex-col gap-3 sm:grid sm:grid-cols-3 sm:gap-4"
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4 rounded-[16px] border border-[#e5edf2] bg-white px-3 py-2 sm:block sm:rounded-[20px] sm:px-5 sm:py-3 sm:hover:scale-105 transition-all"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4F8FB]">
                <FaFlask className="text-md md:text-2xl text-[#2E7D5A]" />
              </div>

              <h3 className="text-base font-semibold text-[#131C15] sm:mt-4 sm:text-lg">
                Evidence-Based
              </h3>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4 rounded-[16px] border border-[#e5edf2] bg-white px-3 py-2 sm:block sm:rounded-[20px] sm:px-5 sm:py-3 sm:hover:scale-105 transition-all"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4F8FB]">
                <FaShieldAlt className="text-md md:text-2xl text-[#2E7D5A]" />
              </div>

              <h3 className="text-base font-semibold text-[#131C15] sm:mt-4 sm:text-lg">
                Safe &amp; Effective
              </h3>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4 rounded-[16px] border border-[#e5edf2] bg-white px-3 py-2 sm:block sm:rounded-[20px] sm:px-5 sm:py-3 sm:hover:scale-105 transition-all"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4F8FB]">
                <FaUserMd className="text-md md:text-2xl text-[#2E7D5A]" />
              </div>

              <h3 className="text-base font-semibold text-[#131C15] sm:mt-4 sm:text-lg">
                Expert Care
              </h3>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="relative min-w-0"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          {/* Main Image */}
          <div className="relative overflow-hidden rounded-[34px] border border-white/60 bg-white p-3 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
            <img
              src={data.image}
              alt={data.title}
              className="h-[300px] w-full rounded-[28px] object-cover sm:h-[380px] md:h-[520px]"
            />
          </div>

          {/* Floating Card */}
          {data.showFloatingCard !== false && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="absolute -bottom-6 left-6 max-w-[calc(100%-2rem)] rounded-[28px] border border-white/70 bg-white/70 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl md:left-10 md:p-6"
            >
              <div className="flex items-center gap-4">
                <div className="min-w-0">
                  <h3 className="text-xs font-semibold text-[#131C15] md:text-lg line-clamp-2 break-words">
                    {data.cardTitle}
                  </h3>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
        <div className="md:hidden mt-5 flex flex-wrap gap-4">
          <Link
            href="/book-appointment"
            className="rounded-full bg-[#131C15] px-7 py-3.5 text-sm w-full text-center font-medium text-white transition-all duration-300 hover:bg-[#058FD2] active:scale-95"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;