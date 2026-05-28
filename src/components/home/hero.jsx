"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

import "swiper/css";
import "swiper/css/navigation";

const slides = ["01", "02", "03"];

const HeroSection = () => {
  return (
    <section className="px-3 pt-3 md:px-5 md:pt-5">
      <div className="relative overflow-hidden rounded-[30px] bg-[#eef7fb] p-2 md:rounded-[38px] md:p-3">
        <Swiper
          loop={true}
          speed={1000}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".hero-prev",
            nextEl: ".hero-next",
          }}
          modules={[Navigation, Autoplay]}
        >
          {slides.map((number, index) => (
            <SwiperSlide key={index}>
              <div className="relative flex h-[420px] items-center justify-center rounded-[28px] bg-[#eef7fb] md:h-[560px]">
                <h1 className="text-[90px] font-semibold tracking-[-6px] text-sky-400 md:text-[160px]">
                  {number}
                </h1>

                {/* NAVIGATION */}
                <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
                  <button className="hero-prev flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-sky-500 transition-all duration-300 hover:scale-105">
                    <HiArrowLeft className="text-[20px]" />
                  </button>

                  <button className="hero-next flex h-[52px] w-[52px] items-center justify-center rounded-full bg-sky-500 text-white transition-all duration-300 hover:scale-105">
                    <HiArrowRight className="text-[20px]" />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HeroSection;