"use client";

import { motion } from "framer-motion";
import { HiArrowUpRight, HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import {
  MdOutlineBiotech,
  MdOutlineLocalHospital,
  MdOutlineLightbulb,
  MdOutlineSpa,
} from "react-icons/md";

import "swiper/css";

import Hero1 from "../../../public/images/HomeHero.png";
import Hero2 from "../../../public/images/Slide2U.png";
import Hero3 from "../../../public/images/StraightLook.png";

import PlusBg from "../../../public/images/PlusBg.png";
import Link from "next/link";
import { useEffect, useState } from "react";

const marqueeItems = [
  "Energy-based devices",
  "Dermato surgical facility",
  "Evidence-based practice",
  "Skin & hair treatments",
];

/**
 * Breakpoint order used for the image sizing fallback chain.
 * Matches Tailwind's default breakpoints.
 */
const BP_ORDER = ["base", "sm", "md", "lg","ipadPro", "xl", "2xl"];

/**
 * Reads window width and returns the current breakpoint bucket.
 * Re-computes on resize.
 */
function useBreakpoint() {
  const [bp, setBp] = useState("base");

  useEffect(() => {
    const mqs = {
      ipadPro: window.matchMedia(
    "(min-width: 1024px) and (max-width: 1024px) and (min-height: 1366px)"
  ),
      "2xl": window.matchMedia("(min-width: 1536px)"),
      xl: window.matchMedia("(min-width: 1280px)"),
      lg: window.matchMedia("(min-width: 1024px)"),
      md: window.matchMedia("(min-width: 768px)"),
      sm: window.matchMedia("(min-width: 640px)"),
    };

    const compute = () => {
      if (mqs["2xl"].matches) return "2xl";
      if (mqs.xl.matches) return "xl";
      if (mqs.ipadPro.matches) return "ipadPro";
      if (mqs.lg.matches) return "lg";
      if (mqs.md.matches) return "md";
      if (mqs.sm.matches) return "sm";
      return "base";
    };

    setBp(compute());
    const handler = () => setBp(compute());

    Object.values(mqs).forEach((mq) => mq.addEventListener("change", handler));
    return () =>
      Object.values(mqs).forEach((mq) => mq.removeEventListener("change", handler));
  }, []);

  return bp;
}

/**
 * Walks down the breakpoint chain from the current breakpoint to "base"
 * and returns the first defined config it finds. This lets each slide
 * only specify the breakpoints where the image actually needs to change.
 */
function getImageStyle(config, bp) {
  const startIndex = BP_ORDER.indexOf(bp);
  for (let i = startIndex; i >= 0; i--) {
    if (config[BP_ORDER[i]]) return config[BP_ORDER[i]];
  }
  return config.base;
}

const slides = [
  {
    id: 1,
    label: "Trust built on expertise",
    title1: "Consult the Dermatologist from the comfort of your home.",
    title2: "",
    tagline: "",
    image: Hero3,
    color: "#315e95",
    blend: "#039bd3",
    accent: "#50b1a2",
    imageConfig: {
      base: { height: "42vh", scale: 1.20, x: "0px", y: "0px" },
      sm: { height: "48vh", scale: 1.12, x: "0px", y: "0px" },
      md: { height: "58vh", scale: 1.18, x: "0px", y: "0px" },
      ipadPro: { height: "78vh", scale: 1.1,x: "150px",y: "-130px"},
      lg: { height: "100vh", scale: 1, x: "0px", y: "0px" },
      xl: { height: "100vh", scale: 1, x: "150px", y: "0px" },
      "2xl": { height: "110vh", scale: 1, x: "180px", y: "0px" },
    },
    stats: [
      { number: "12+", label: "Years Experience" },
      { number: "5k+", label: "Happy Patients" },
      { number: "98%", label: "Patient Satisfaction" },
    ],
  },
  {
    id: 2,
    label: "Trust built on expertise",
    title1: "Teleconsult",
    title2: "Dr. Charu Garg",
    tagline: "Expert Care, One click away",
    description:
      "Experience premium dermatology care with personalized solutions for healthier, radiant, and naturally balanced skin.",
    image: Hero2,
    color: "#039bd3",
    blend: "#315e95",
    accent: "#50b1a2",
    imageConfig: {
      base: { height: "46vh", scale: 0.90, x: "0px", y: "-30px" },
      sm: { height: "42vh", scale: 1.15, x: "0px", y: "30px" },
      md: { height: "50vh", scale: 1.3, x: "0px", y: "40px" },
      lg: { height: "80vh", scale: 1.2, x: "0px", y: "70px" },
      ipadPro: { height: "75vh", scale: 1,x: "170px",y: "-200px"},
      "2xl": { height: "88vh", scale: 1.1, x: "30px", y: "50px" },
    },
    stats: [
      { number: "15+", label: "Advanced Treatments" },
      { number: "8k+", label: "Consultations Done" },
      { number: "96%", label: "Trusted Care Rate" },
    ],
  },
  {
    id: 3,
    label: "Trust built on expertise",
    title1: "Expert",
    title2: "Skin Solutions",
    tagline: "Disease Treatment to Aesthetic Care",
    description:
      "Comprehensive skin care designed with modern dermatology practices, advanced technologies, and patient-first attention.",
    image: Hero1,
    color: "#50b1a2",
    blend: "#039bd3",
    accent: "#315e95",
    imageConfig: {
      base: { height: "40vh", scale: 1.3, x: "-40px", y: "15px" },
      sm: { height: "46vh", scale: 1.14, x: "0px", y: "20px" },
      md: { height: "58vh", scale: 1.2, x: "0px", y: "30px" },
      lg: { height: "70vh", scale: 1.2, x: "-80px", y: "40px" },
      ipadPro: { height: "78vh", scale: 0.95,x: "50px",y: "-250px"},
      "2xl": { height: "100vh", scale: 0.95, x: "0px", y: "-20px" },
    },
    stats: [
      { number: "10+", label: "Skin Specialists" },
      { number: "4.9★", label: "Average Rating" },
      { number: "24/7", label: "Patient Assistance" },
    ],
  },
];

const HeroSection = () => {
  const bp = useBreakpoint();
  const isIpadPro = bp === "ipadPro";

  return (
    <section className="relative h-[100svh] overflow-hidden bg-[#315e95] font-sans">
      {/* Marquee bar */}
      <div className="absolute bottom-0 left-0 z-30 w-[min(760px,calc(100%-32px))] sm:w-[min(760px,calc(100%-72px))] overflow-hidden rounded-tr-[30px] sm:rounded-tr-[46px] bg-[#eef7fb] py-2.5 sm:py-4 shadow-[0_-4px_18px_rgba(0,0,0,0.08)]">
        <motion.div
          className="flex w-max items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          {[0, 1].map((group) => (
            <div key={group} className="flex items-center gap-6 sm:gap-10 pl-5 sm:pl-8">
              {marqueeItems.map((item, index) => (
                <div
                  key={`${group}-${item}`}
                  className="flex items-center gap-2 sm:gap-3 text-sm xl:text-lg 2xl:text-xl font-medium text-slate-800"
                >
                  <span className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-[#039bd3]/10 text-[#039bd3]">
                    {index === 0 ? (
                      <MdOutlineBiotech size={12} className="sm:hidden" />
                    ) : index === 1 ? (
                      <MdOutlineLocalHospital size={12} className="sm:hidden" />
                    ) : index === 2 ? (
                      <MdOutlineLightbulb size={12} className="sm:hidden" />
                    ) : (
                      <MdOutlineSpa size={12} className="sm:hidden" />
                    )}
                    {index === 0 ? (
                      <MdOutlineBiotech size={14} className="hidden sm:block" />
                    ) : index === 1 ? (
                      <MdOutlineLocalHospital size={14} className="hidden sm:block" />
                    ) : index === 2 ? (
                      <MdOutlineLightbulb size={14} className="hidden sm:block" />
                    ) : (
                      <MdOutlineSpa size={14} className="hidden sm:block" />
                    )}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <button
        aria-label="Previous slide"
        className="hero-prev absolute left-2 sm:left-6 top-1/2 z-20 flex h-9 w-9 sm:h-11 sm:w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/35 bg-white/15 text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#315e95] active:scale-95"
      >
        <HiArrowLeft className="text-base sm:text-xl" />
      </button>

      <button
        aria-label="Next slide"
        className="hero-next absolute right-2 sm:right-6 top-1/2 z-20 flex h-9 w-9 sm:h-11 sm:w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/35 bg-white/15 text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#315e95] active:scale-95"
      >
        <HiArrowRight className="text-base sm:text-xl" />
      </button>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{ prevEl: ".hero-prev", nextEl: ".hero-next" }}
        autoplay={{ delay: 11000, disableOnInteraction: false }}
        speed={900}
        loop={true}
        className="h-[100svh] w-full"
      >
        {slides.map((slide) => {
          const imgStyle = getImageStyle(slide.imageConfig, bp);

          return (
            <SwiperSlide key={slide.id}>
              <div
                className="relative flex h-[100svh] w-full flex-col overflow-hidden px-4 pt-14 pb-0 sm:px-8 sm:pt-16 md:px-12 md:pt-20 lg:px-16 lg:py-16 2xl:px-28"
                style={{
                  background: `linear-gradient(120deg, ${slide.color} 0%, ${slide.blend} 48%, ${slide.accent} 100%)`,
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 16% 22%, rgba(255,255,255,0.18), transparent 24%), radial-gradient(circle at 76% 42%, rgba(255,255,255,0.16), transparent 28%), linear-gradient(90deg, rgba(255,255,255,0.06), transparent 45%)`,
                  }}
                />
                <div className="pointer-events-none absolute left-8 top-[2%] hidden sm:grid grid-cols-4 gap-2 opacity-25">
                  {Array.from({ length: 28 }).map((_, index) => (
                    <span key={index} className="h-1.5 w-1.5 rounded-full bg-white" />
                  ))}
                </div>
                <div className="pointer-events-none absolute bottom-12 right-10 hidden sm:grid grid-cols-5 gap-2 opacity-20">
                  {Array.from({ length: 20 }).map((_, index) => (
                    <span key={index} className="h-1.5 w-1.5 rounded-full bg-white" />
                  ))}
                </div>
                <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full border border-white/15" />
                <div className="pointer-events-none absolute left-[60%] top-[58%] h-24 w-24 rotate-45 rounded-3xl border border-white/10" />

                {/* Medical pattern background */}
                <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
                  <Image
                    src={PlusBg}
                    alt=""
                    fill
                    priority
                    className="object-cover opacity-[0.10]"
                  />
                </div>

                {/*
                  Layout:
                  - base -> lg: single column, flex-col. Text block is shrink-0
                    at the top, image block is flex-1 and pinned to the
                    bottom edge of the slide with NO margin/padding, so it's
                    always flush with the viewport bottom / marquee bar.
                  - lg+: real 2-col grid, text on the left, image block fills
                    full slide height and stays bottom-aligned on the right.
                */}
                <div className="hero-layout relative z-10 mx-auto flex w-full max-w-7xl 2xl:max-w-[96rem] flex-1 flex-col lg:grid lg:grid-cols-2 lg:items-center lg:gap-10 xl:gap-16 2xl:gap-20 lg:min-h-[calc(100vh-8rem)]">
                  {/* TEXT CONTENT */}
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className={`w-full max-w-xl 2xl:max-w-2xl shrink-0 lg:ml-6 xl:ml-10 2xl:ml-0 ${
                        slide.id === 1 ? "mt-10 lg:mt-0 2xl:-mt-26" : "mt-10 lg:mt-0"
                      }`}
                      style={{
    marginTop: isIpadPro ? "80px" : undefined,
  }}
                  >
                    <div className={`mb-3 w-fit rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs sm:text-sm text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#315e95]`}>
                      {slide.label}
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl font-semibold leading-[1.15] text-white">
                      {slide.title1}
                      {slide.title2 && (
                        <>
                          <br />
                          {slide.title2}
                        </>
                      )}
                    </h1>

                    {(slide.tagline || slide.description) && (
                      <p className="mt-3 sm:mt-4 max-w-md sm:max-w-lg 2xl:max-w-2xl text-sm sm:text-base xl:text-lg 2xl:text-2xl leading-6 sm:leading-8 2xl:leading-9 text-white">
                        {slide.tagline || slide.description}
                      </p>
                    )}

                    <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2.5 sm:gap-3">
                      <Link
                        href="/#services"
                        className="flex items-center gap-2 rounded-full bg-white px-3 py-2.5 text-xs font-semibold text-[#315e95] shadow-sm shadow-inner transition-all hover:bg-white/90 active:scale-95 sm:px-6 sm:py-3 2xl:px-8 2xl:text-xl"
                      >
                        Our Facilities
                        <HiArrowUpRight className="text-base sm:text-lg 2xl:text-xl" />
                      </Link>
                      <Link
                        href="/book-appointment"
                        className="flex items-center gap-2 rounded-full bg-white px-3 py-2.5 text-xs font-semibold text-[#315e95] shadow-sm shadow-inner transition-all hover:bg-white/90 active:scale-95 sm:px-6 sm:py-3 2xl:px-8 2xl:text-xl"
                      >
                        Book Appointment
                        <HiArrowUpRight className="text-base sm:text-lg 2xl:text-xl" />
                      </Link>
                    </div>
                  </motion.div>

                  {/*
                    SINGLE IMAGE CONTAINER — used for every breakpoint.
                    items-end + object-bottom + m-0/p-0 keeps the image
                    glued to the bottom of the slide on every device.
                    flex-1 lets it eat all remaining vertical space on
                    mobile/tablet; on lg+ it fills the grid cell height.
                  */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative flex w-full flex-1 items-end justify-center overflow-visible p-0 m-0 lg:h-full lg:flex-none lg:justify-end lg:self-end"
                  >
                    <div
                      className="relative flex items-end justify-center overflow-visible p-0 m-0"
                      style={{
                        transform: `translate(${imgStyle.x}, ${imgStyle.y}) scale(${imgStyle.scale})`,
                        transformOrigin: "bottom center",
                      }}
                    >
                      <Image
                        src={slide.image}
                        alt="Dermatology"
                        priority
                        style={{
                          height: imgStyle.height,
                          width: "auto",
                          maxWidth: "none",
                          margin: 0,
                          padding: 0,
                          display: "block",
                        }}
                        className="object-contain object-bottom"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default HeroSection;