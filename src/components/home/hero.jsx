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

const slides = [
  {
    id: 1,
    label: "Trust built on expertise",
    title1: "Consult the Dermatologist from the comfort of your home.",
    title2: "",
    contentwidth: "max-w-lg 2xl:max-w-2xl",
    extraheadingclass: "-mt-30",
    description: "",
    image: Hero3,
    imageScale: "1.22",
    imageScaleXl: "1.45",
    imageX: "0px",
    imageY: "0px",
    imageHeight: "100vh",
    imageHeightXl: "110vh",
    color: "#315e95",
    blend: "#039bd3",
    accent: "#50b1a2",
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
    contentwidth: "max-w-lg 2xl:max-w-2xl",

    description:
      "Experience premium dermatology care with personalized solutions for healthier, radiant, and naturally balanced skin.",
    image: Hero2,
    imageHeight: "80vh",
    imageHeightXl: "88vh",
    imageScale: "1.4",
    imageScaleXl: "1.5",
    imageX: "0px",
    imageY: "50px",
    color: "#039bd3",
    blend: "#315e95",
    accent: "#50b1a2",
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
    contentwidth: "max-w-lg 2xl:max-w-2xl",
    extraheadingclass: "mt-10",
    extraheadingclassxl: "-mt-20",
    tagline: "Disease Treatment to Aesthetic Care",
    description:
      "Comprehensive skin care designed with modern dermatology practices, advanced technologies, and patient-first attention.",
    image: Hero1,
    imageScale: "1.2",
    imageScaleXl: "1.48",
    imageX: "0px",
    imageY: "30px",
    imageXxl: "0px",
    imageYxl: "-20px",
    imageHeight: "70vh",
    imageHeightXl: "100vh",
    color: "#50b1a2",
    blend: "#039bd3",
    accent: "#315e95",
    stats: [
      { number: "10+", label: "Skin Specialists" },
      { number: "4.9★", label: "Average Rating" },
      { number: "24/7", label: "Patient Assistance" },
    ],
  },
];

const HeroSection = () => {
  const [is2xl, setIs2xl] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1536px)");
    setIs2xl(mq.matches);
    const handler = (e) => setIs2xl(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section className="relative h-[100vh] overflow-hidden bg-[#315e95] font-sans">
      <div className="absolute bottom-0 left-0 z-30 w-[min(760px,calc(100%-72px))] overflow-hidden rounded-tr-[46px] bg-[#eef7fb] py-4 shadow-[0_-4px_18px_rgba(0,0,0,0.08)]">
        <motion.div
          className="flex w-max items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          {[0, 1].map((group) => (
            <div key={group} className="flex items-center gap-10 pl-8">
              {marqueeItems.map((item, index) => (
                <div
                  key={`${group}-${item}`}
                  className="flex items-center gap-3 text-md font-medium text-slate-800"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#039bd3]/10 text-[#039bd3]">
                    {index === 0 ? (
                      <MdOutlineBiotech size={14} />
                    ) : index === 1 ? (
                      <MdOutlineLocalHospital size={14} />
                    ) : index === 2 ? (
                      <MdOutlineLightbulb size={14} />
                    ) : (
                      <MdOutlineSpa size={14} />
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
        className="hero-prev absolute left-3 sm:left-6 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/35 bg-white/15 text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#315e95] active:scale-95"
      >
        <HiArrowLeft className="text-xl" />
      </button>

      <button
        aria-label="Next slide"
        className="hero-next absolute right-3 sm:right-6 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/35 bg-white/15 text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#315e95] active:scale-95"
      >
        <HiArrowRight className="text-xl" />
      </button>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{ prevEl: ".hero-prev", nextEl: ".hero-next" }}
        autoplay={{ delay: 11000, disableOnInteraction: false }}
        speed={900}
        loop={true}
        className="min-h-screen w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative min-h-screen overflow-hidden px-5 py-16 sm:px-8 md:py-20 lg:px-20 2xl:px-28"
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
              <div className="pointer-events-none absolute left-8 top-[2%] grid grid-cols-4 gap-2 opacity-25">
                {Array.from({ length: 28 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-1.5 w-1.5 rounded-full bg-white"
                  />
                ))}
              </div>
              <div className="pointer-events-none absolute bottom-12 right-10 grid grid-cols-5 gap-2 opacity-20">
                {Array.from({ length: 20 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-1.5 w-1.5 rounded-full bg-white"
                  />
                ))}
              </div>
              <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full border border-white/15" />
              <div className="pointer-events-none absolute left-[60%] top-[58%] h-24 w-24 rotate-45 rounded-3xl border border-white/10" />

              {/* Medical Pattern Background */}
              <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
                <Image
                  src={PlusBg}
                  alt=""
                  fill
                  priority
                  className="object-cover opacity-[0.10]"
                />
              </div>

              <div className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl 2xl:max-w-[96rem] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 2xl:gap-20">
                {/* LEFT CONTENT */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className={`${slide.contentwidth} lg:ml-10 2xl:ml-0 ${slide.extraheadingclass ?? ""} 2xl:${slide.extraheadingclassxl ?? ""}`}
                >
                  <div className="text-sm px-3 py-1 mb-3 rounded-full border border-white/35 bg-white/15 text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#315e95] w-fit">
                    {slide.label}
                  </div>
                  <span className="text-4xl xl:text-6xl 2xl:text-7xl leading-[1.08] font-semibold text-white">
                    {slide.title1}
                  </span>
                  <br />
                  <span className="text-4xl xl:text-6xl 2xl:text-7xl leading-[1.08] font-semibold text-white">
                    {slide.title2}
                  </span>

                  {/* MOBILE IMAGE */}
                  <div className="block lg:hidden mt-8">
                    <div className="relative">
                      <Image
                        src={slide.image}
                        alt="Dermatology"
                        className="h-auto w-full object-contain"
                        priority
                      />
                    </div>
                  </div>

                  <p className="text-white text-base xl:text-lg 2xl:text-2xl leading-8 2xl:leading-9 mt-4 max-w-lg 2xl:max-w-2xl">
                    {slide.tagline || slide.description}
                  </p>

                  <div className="flex items-center gap-3 mt-5 flex-wrap">
                    <Link
                      href="/#services"
                      className="py-3 px-6 2xl:px-8 rounded-full bg-white text-[#315e95] hover:bg-white/90 transition-all text-md active:scale-95 2xl:text-xl font-semibold flex items-center gap-2 shadow-sm shadow-inner"
                    >
                      Our Facilities
                      <HiArrowUpRight className="text-lg 2xl:text-xl" />
                    </Link>
                    <Link
                      href="/book-appointment"
                      className="py-3 px-6 2xl:px-8 rounded-full bg-white text-[#315e95] hover:bg-white/90 transition-all text-md active:scale-95 2xl:text-xl font-semibold flex items-center gap-2 shadow-sm shadow-inner"
                    >
                      Book Appointment
                      <HiArrowUpRight className="text-lg 2xl:text-xl" />
                    </Link>
                  </div>
                </motion.div>

                {/* DESKTOP IMAGE */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative hidden lg:flex justify-end items-end self-end overflow-visible"
                >
                  <div
                    className="relative flex items-end overflow-visible"
                    style={{
                      transform: `translate(${is2xl ? slide.imageXxl || slide.imageX : slide.imageX},
                        ${is2xl ? slide.imageYxl || slide.imageY : slide.imageY})
                        scale(${is2xl ? slide.imageScaleXl : slide.imageScale})`,
                      transformOrigin: "bottom center",
                    }}
                  >
                    <Image
                      src={slide.image}
                      alt="Dermatology"
                      priority
                      style={{
                        height: is2xl
                          ? slide.imageHeightXl || "110vh"
                          : slide.imageHeight || "100vh",
                        width: "auto",
                      }}
                      className="object-contain object-bottom"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
