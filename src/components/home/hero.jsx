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

import Hero1 from "../../../public/images/HomeHero4.png";
import Hero2 from "../../../public/images/SideFaceN.png";
import Hero3 from "../../../public/images/StraightLook.png";

import PlusBg from "../../../public/images/PlusBg.png";
import Link from "next/link";

const marqueeItems = [
  "Energy-based devices",
  "Dermato surgical facility",
  "Advanced laser care",
  "Skin & hair treatments",
];

const slides = [
  {
    id: 1,
    label: "ADVANCED DERMATOLOGY CARE",
    title: "Dr. Charu Garg",
    contentwidth: "max-w-lg",
    extraheadingclass : "-mt-30",
    description:
      "Consult the Dermatologist from the comfort of your home.",
    image: Hero3,
    imageScale: "1.25",
    imageX: "0px",
    imageY: "0px",
    color: "#315e95",
    blend: "#039bd3",
    accent: "#50b1a2",
    //  tagline :"Consult Me Garg for Expert Skin Solutions",
    stats: [
      { number: "12+", label: "Years Experience" },
      { number: "5k+", label: "Happy Patients" },
      { number: "98%", label: "Patient Satisfaction" },
    ],
  },

  {
    id: 2,
    label: "MODERN SKIN SOLUTIONS",
    title: `Teleconsult Dr.Charu Garg`,
    tagline: "Expert Care, One click away",
     contentwidth: "max-w-lg",
    description:
      "Experience premium dermatology care with personalized solutions for healthier, radiant, and naturally balanced skin.",
    image: Hero2,
    imageHeight: "80vh",
    imageScale : "1.3",
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
    label: "PERSONALIZED CARE EXPERIENCE",
    title: "Expert Skin Solution",
     contentwidth: "max-w-lg",
    extraheadingclass : "-mt-30",
    tagline: "Disease Treatment to Aesthetic Care",
    description:
      "Comprehensive skin care designed with modern dermatology practices, advanced technologies, and patient-first attention.",
    image: Hero1,
    // imageHeight: "100vh",
    imageScale : "1.1",
    imageX: "0px",
    imageY: "-100px",
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
  return (
    <section className="relative h-[100vh] overflow-hidden bg-[#315e95] font-sans">
      <div className="absolute bottom-0 left-0 z-30 w-[min(760px,calc(100%-72px))] overflow-hidden rounded-tr-[46px] bg-[#eef7fb] py-4 shadow-[0_-4px_18px_rgba(0,0,0,0.08)]">
  <motion.div
    className="flex w-max items-center whitespace-nowrap"
    animate={{ x: ["0%", "-50%"] }}
    transition={{
      duration: 20,
      ease: "linear",
      repeat: Infinity,
    }}
  >
    {[0, 1].map((group) => (
      <div key={group} className="flex items-center gap-10 pl-8">
        {marqueeItems.map((item, index) => (
          <div
            key={`${group}-${item}`}
            className="flex items-center gap-3 text-md font-medium text-slate-800"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#039bd3]/10 text-[#039bd3]">
              {index === 0 ? <MdOutlineBiotech size={14} /> :
               index === 1 ? <MdOutlineLocalHospital size={14} /> :
               index === 2 ? <MdOutlineLightbulb size={14} /> :
               <MdOutlineSpa size={14} />}
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
        navigation={{
          prevEl: ".hero-prev",
          nextEl: ".hero-next",
        }}
        autoplay={{
          delay: 11000,
          disableOnInteraction: false,
        }}
        speed={900}
        loop={true}
        className="min-h-screen w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative min-h-screen overflow-hidden px-5 py-16 sm:px-8 md:py-20 lg:px-20"
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

              <div className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                {/* LEFT CONTENT */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className={`${slide.contentwidth} lg:ml-10 ${slide.extraheadingclass}`}
                >
                  {/* HEADING */}
                  <span className="text-4xl xl:text-6xl leading-[1.08] font-semibold text-white">
                    {slide.title}
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

                  {/* DESCRIPTION */}
                  {/* <p className="text-[#66706b] text-base xl:text-lg leading-8 mt-6 max-w-lg">
        {slide.description}
      </p> */}
                  <p className="text-white text-base xl:text-lg leading-8 mt-4 max-w-lg">
                    {slide.tagline || slide.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-3 mt-5 flex-wrap">
                    <Link href={"/#booking"} className="h-[56px]  px-6 rounded-full bg-white text-[#315e95] hover:bg-white/90 transition-all text-sm font-semibold flex items-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.16)]">
                      Book Appointment
                      <HiArrowUpRight className="text-lg" />
                    </Link>

                    {/* <button className="h-[56px] px-6 rounded-full border border-[#dbe7ee] bg-white/70 backdrop-blur-sm text-[#131C15] text-sm font-medium hover:bg-white transition-all">
          Explore Treatments
        </button> */}
                  </div>
                </motion.div>

                {/* DESKTOP IMAGE */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative hidden lg:flex justify-end items-end self-end overflow-visible"
                >
                  <div className="relative flex items-end overflow-visible">
                    <Image
  src={slide.image}
  alt="Dermatology"
  priority
  style={{
    height: slide.imageHeight || "100vh",
    width: "auto",
    transform: `translate(${slide.imageX}, ${slide.imageY}) scale(${slide.imageScale})`,
    transformOrigin: "bottom center",
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
