// components/services/ServiceHero.jsx

'use client'

import React from "react";
import Slider from "react-slick";

import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Activity,
  Pill,
  Sparkles,
  Brain,
  ArrowUpRight,
  ArrowRight,
  Star,
} from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const iconMap = {
  hormonal: <Activity size={28} />,
  nutrition: <Pill size={28} />,
  scalp: <Sparkles size={28} />,
  stress: <Brain size={28} />,
};

const NextArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-0 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-[#131C15] text-white transition-all duration-300 hover:bg-[#058FD2]"
    >
      <ChevronRight size={20} />
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-16 top-0 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-[#dce7ee] bg-white text-[#131C15] transition-all duration-300 hover:border-[#058FD2] hover:text-[#058FD2]"
    >
      <ChevronLeft size={20} />
    </button>
  );
};

const ServiceHero = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: true,
    autoplay: false,
    dotsClass: "slick-dots custom-dots",
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#EEF7FB] to-white ">

      {/* Blur */}
      {/* <div className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-[#dff2fc] blur-[100px]" /> */}

      <div className="relative mx-auto max-w-7xl px-3 pt-10 md:px-5 md:pt-20">

        <Slider {...settings}>

          {data.slides.map((slide, index) => (

            <div key={index}>
              <div className="px-1 md:px-2">

                {/* ================================================= */}
                {/* HERO SLIDE */}
                {/* ================================================= */}

                {slide.type === "hero" && (

                  <div className="overflow-hidden rounded-[40px] ">

                    <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-16">

                      {/* LEFT */}
                      <div>

                        {/* Badge */}
                        <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-[#d9eaf4] bg-[#eef7fb] px-4 py-2">
                          <div className="h-2 w-2 rounded-full bg-[#058FD2]" />

                          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#058FD2]">
                            {slide.badge}
                          </p>
                        </div>

                        {/* Heading */}
                        <h1 className=" text-4xl font-semibold tracking-wide  text-[#131C15] md:text-5xl lg:text-[72px]">
                          {slide.titleFirst}

                          <span className="text-[#058FD2]">
                            {" "}
                            {slide.titleHighlight}
                          </span>
                        </h1>

                        {/* Description */}
                        <p className="mt-7 max-w-[560px] text-[15px] leading-8 text-[#667085] md:text-[17px]">
                          {slide.description}
                        </p>

                        {/* Features */}
                        <div className="mt-8 flex flex-wrap gap-3">

                          {slide.features?.map((item, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 rounded-full border border-[#e4edf2] bg-[#fafcfd] px-4 py-2"
                            >
                              <Star
                                size={14}
                                className="fill-[#058FD2] text-[#058FD2]"
                              />

                              <p className="text-sm font-medium text-[#131C15]">
                                {item}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-10 flex flex-wrap gap-4">

                          {slide.buttons?.map((btn, i) => (

                            <button
                              key={i}
                              className={`group flex items-center gap-2 rounded-2xl px-7 py-4 text-sm font-medium transition-all duration-300 active:scale-95 ${
                                btn.variant === "primary"
                                  ? "bg-[#1d5ea8] text-white shadow-[0_15px_40px_rgba(29,94,168,0.18)] hover:bg-[#131C15]"
                                  : "border border-[#4CAF50] bg-white text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white"
                              }`}
                            >
                              {btn.label}

                              <ArrowUpRight
                                size={18}
                                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              />
                            </button>
                          ))}
                        </div>

                        {/* Bottom Stats */}
                        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">

                          {slide.stats?.map((item, i) => (
                            <div
                              key={i}
                              className="rounded-[26px] border border-[#e7edf1] bg-[#fafcfd] p-5"
                            >
                              <h3 className="text-3xl font-semibold text-[#131C15]">
                                {item.value}
                              </h3>

                              <p className="mt-2 text-sm leading-6 text-[#667085]">
                                {item.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div className="relative">

                        {/* Main Image */}
                        <div className="overflow-hidden rounded-[36px] bg-[#f4f5f7] p-3">
                          <img
                            src={slide.image}
                            alt=""
                            className="h-[320px] w-full rounded-[28px] object-cover md:h-[500px] lg:h-[560px]"
                          />
                        </div>

                        {/* Floating Expert Card */}
                        <div className="absolute bottom-5 left-5 rounded-[28px] border border-white/70 bg-white/92 p-5 shadow-[0_15px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl md:p-6">

                          <div className="flex items-center gap-4">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef7fb] text-[#1d5ea8]">
                              <ShieldCheck size={26} />
                            </div>

                            <div>
                              <h3 className="text-lg font-semibold text-[#131C15]">
                                {slide.expertTitle}
                              </h3>

                              <p className="mt-1 text-sm text-[#667085]">
                                {slide.expertDesc}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Floating Mini Badge */}
                        <div className="absolute right-5 top-5 rounded-full bg-white px-5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                          <p className="text-sm font-semibold text-[#131C15]">
                            {slide.miniBadge}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================================================= */}
                {/* CAUSES SLIDE */}
                {/* ================================================= */}

                {slide.type === "causes" && (

                  <div className="overflow-hidden rounded-[40px]  p-6 md:p-8 lg:p-10">

                    {/* Heading */}
                    <div className="mx-auto max-w-[820px] text-center">

                      <div className="mb-5 flex items-center justify-center gap-4">
                        <div className="hidden h-[1px] w-20 bg-[#8fc5e6] md:block" />

                        <div className="h-2 w-2 rounded-full bg-[#4f9dd4]" />

                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#058FD2]">
                          {slide.badge}
                        </p>

                        <div className="h-2 w-2 rounded-full bg-[#4f9dd4]" />

                        <div className="hidden h-[1px] w-20 bg-[#8fc5e6] md:block" />
                      </div>

                      <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#163c78] md:text-5xl">
                        {slide.title}
                      </h2>

                      <p className="mt-5 text-[15px] leading-8 text-[#667085] md:text-[17px]">
                        {slide.description}
                      </p>
                    </div>

                    {/* GRID */}
                    <div className="mt-14 grid gap-5 md:grid-cols-2">

                      {slide.points?.map((item, i) => (

                        <div
                          key={i}
                          className="group relative overflow-hidden rounded-[32px] border border-[#dceaf3] bg-[#fafcfd] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#b8d9ec] hover:bg-white hover:shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
                        >

                          {/* Blur */}
                          <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#eef7fb] blur-3xl" />

                          <div className="relative z-10">

                            {/* Icon */}
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eef7fb] text-[#1d5ea8] transition-all duration-500 group-hover:bg-[#1d5ea8] group-hover:text-white">
                              {iconMap[item.icon]}
                            </div>

                            {/* Title */}
                            <h3 className="mt-6 text-2xl font-semibold leading-snug text-[#131C15]">
                              {item.label}
                            </h3>

                            {/* Desc */}
                            <p className="mt-4 max-w-[90%] text-[15px] leading-8 text-[#667085]">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ================================================= */}
                {/* RESULTS SLIDE */}
                {/* ================================================= */}

                {slide.type === "results" && (

                  <div className="overflow-hidden rounded-[40px] p-6 md:p-8 lg:p-10">

                    {/* Heading */}
                    <div className="mx-auto max-w-[820px] text-center">

                      <div className="mb-5 flex items-center justify-center gap-4">
                        <div className="hidden h-[1px] w-20 bg-[#8fc5e6] md:block" />

                        <div className="h-2 w-2 rounded-full bg-[#4f9dd4]" />

                        <p className="text-[11px] font-medium uppercase  text-[#058FD2]">
                          {slide.badge}
                        </p>

                        <div className="h-2 w-2 rounded-full bg-[#4f9dd4]" />

                        <div className="hidden h-[1px] w-20 bg-[#8fc5e6] md:block" />
                      </div>

                      <h2 className="text-3xl font-semibold leading-tight  text-[#163c78] md:text-5xl">
                        {slide.title}
                      </h2>
                    </div>

                    {/* Before After */}
                    <div className="mt-14 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">

                      {/* Before */}
                      <div className="group relative">

                        <div className="overflow-hidden rounded-[36px] bg-[#f4f5f7] p-3 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
                          <img
                            src={slide.beforeImage}
                            alt=""
                            className="h-[320px] w-full rounded-[28px] object-cover md:h-[450px]"
                          />
                        </div>

                        {/* Label */}
                        <div className="absolute bottom-5 left-5 rounded-2xl bg-white/92 px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl">
                          <h3 className="text-lg font-semibold text-[#131C15]">
                            Before
                          </h3>

                          <p className="mt-1 text-sm text-[#667085]">
                            {slide.beforeText}
                          </p>
                        </div>
                      </div>

                      {/* Center Arrow */}
                      <div className="flex items-center justify-center">

                        <div className="relative flex h-28 w-28 items-center justify-center">

                          {/* Circle */}
                          <div className="absolute inset-0 rounded-full border border-dashed border-[#b6d7eb]" />

                          {/* Arrow */}
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1d5ea8] text-white shadow-[0_15px_40px_rgba(29,94,168,0.2)]">
                            <ArrowRight
                              size={34}
                              className="rotate-90 lg:rotate-0"
                            />
                          </div>
                        </div>
                      </div>

                      {/* After */}
                      <div className="group relative">

                        <div className="overflow-hidden rounded-[36px] bg-[#f4f5f7] p-3 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
                          <img
                            src={slide.afterImage}
                            alt=""
                            className="h-[320px] w-full rounded-[28px] object-cover md:h-[450px]"
                          />
                        </div>

                        {/* Label */}
                        <div className="absolute bottom-5 left-5 rounded-2xl bg-white/92 px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl">
                          <h3 className="text-lg font-semibold text-[#131C15]">
                            After
                          </h3>

                          <p className="mt-1 text-sm text-[#667085]">
                            {slide.afterText}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Dots Style */}
      <style jsx global>{`
        .custom-dots {
          bottom: -8px;
        }

        .custom-dots li button:before {
          font-size: 10px;
          color: #b6c7d3;
          opacity: 1;
        }

        .custom-dots li.slick-active button:before {
          color: #1d5ea8;
        }
      `}</style>
    </section>
  );
};

export default ServiceHero;