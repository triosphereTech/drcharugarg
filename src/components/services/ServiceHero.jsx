// components/services/ServiceHero.jsx

"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FaFlask, FaShieldAlt, FaUserMd } from "react-icons/fa";

const ServiceHero = ({ data }) => {
  return (
    <section className="relative overflow-hidden bg-linear-[120deg] from-[#315e95] via-[#039bd3] to-[#50b1a2] pt-28 pb-14 md:pb-20 md:pt-36 ">
      {/* Background Blur */}
      <div className="absolute -left-55 top-0 h-[300px] w-[300px] rounded-full bg-[#095c88] blur-[100px]" />

      <div className="relative mx-auto grid max-w-[1350px] gap-10 px-5 md:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16 lg:px-10">
        {/* Left Content */}
        <div>
          {/* Badge */}
          <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-[#d8eaf4] bg-white/20 px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-[#ffffff]" />

            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#ffffff]">
              Our Services
            </p>
          </div>

          {/* Heading */}
          <h1 className="max-w-auto text-4xl font-semibold leading-[1.15] text-white md:text-5xl lg:text-5xl">
            {data.title}
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-[620px] text-[15px] leading-8 text-white md:text-base">
            {data.description}
          </p>

          {/* Features */}
          <div className="mt-8 flex flex-wrap gap-3">
            {data.features?.map((item, index) => (
              <div
                key={index}
                className="rounded-full border border-[#dbe7ee]/40 bg-white/20 px-4 py-2 text-sm font-medium text-white"
              >
                {item}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/book-appointment"
              className="rounded-full bg-[#131C15] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#058FD2] active:scale-95"
            >
              Book Appointment
            </Link>
          </div>

          {/* Bottom Stats */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-[20px] hover:scale-105 transition-all border border-[#e5edf2] bg-white px-5 py-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F4F8FB]">
                <FaFlask className="text-2xl text-[#2E7D5A]" />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-[#131C15]">
                Evidence-Based
              </h3>
            </div>

            <div className="rounded-[20px] hover:scale-105 transition-all border border-[#e5edf2] bg-white px-5 py-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F4F8FB]">
                <FaShieldAlt className="text-2xl text-[#2E7D5A]" />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-[#131C15]">
                Safe &amp; Effective
              </h3>
            </div>

            <div className="rounded-[20px] hover:scale-105 transition-all border border-[#e5edf2] bg-white px-5 py-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F4F8FB]">
                <FaUserMd className="text-2xl text-[#2E7D5A]" />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-[#131C15]">
                Expert Care
              </h3>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          {/* Main Image */}
          <div className="relative overflow-hidden rounded-[34px] border border-white/60 bg-white p-3 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
            <img
              src={data.image}
              alt={data.title}
              className="h-[380px] w-full rounded-[28px] object-cover md:h-[520px]"
            />
          </div>

         {/* Floating Card */}
{data.showFloatingCard !== false && (
  <div className="absolute -bottom-6 left-6 rounded-[28px] border border-white/70 bg-white/70 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl md:left-10 md:p-6">
    <div className="flex items-center gap-4">
      <div>
        <h3 className="text-lg font-semibold text-[#131C15]">
          {data.cardTitle}
        </h3>
      </div>
    </div>
  </div>
)}
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
