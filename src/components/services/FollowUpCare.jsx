// components/services/FollowUpCare.jsx

'use client'

import React from "react";

import {
  TrendingUp,
  ScanLine,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const FollowUpCare = ({ data }) => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white to-[#EEF7FB] ">

      {/* Blur */}
      <div className="absolute right-0 top-0 h-[340px] w-[340px] rounded-full bg-[#dff2fc] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-3 pt-10 md:px-5 md:pt-20">

        {/* TOP */}
        <div className="max-w-[900px]">

          {/* Badge */}
          <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-[#dceaf3] bg-white px-4 py-2">

            <div className="h-2 w-2 rounded-full bg-[#058FD2]" />

            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#058FD2]">
              {data.badge}
            </p>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#131C15] md:text-5xl lg:text-[62px]">
            {data.title}
          </h2>

          {/* Description */}
          <p className="mt-7 max-w-[760px] text-[15px] leading-8 text-[#667085] md:text-[17px]">
            {data.description}
          </p>
        </div>

        {/* Main Layout */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_0.9fr]">

          {/* LEFT */}
          <div className="grid gap-6 md:grid-cols-2">

            {/* Large Image */}
            <div className="group relative overflow-hidden rounded-[38px] border border-[#dceaf3] bg-white p-3 md:col-span-2">

              <div className="overflow-hidden rounded-[30px]">

                <img
                  src={data.mainImage}
                  alt=""
                  className="h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[420px]"
                />
              </div>

              {/* Floating Card */}
              <div className="absolute bottom-8 left-8 rounded-[28px] border border-white/70 bg-white/92 px-6 py-5 shadow-[0_15px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl">

                <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#058FD2]">
                  Continuous Monitoring
                </p>

                <h3 className="mt-2 text-xl font-semibold text-[#131C15]">
                  Long-Term Hair Progress Tracking
                </h3>
              </div>
            </div>

            {/* Small Image 1 */}
            <div className="overflow-hidden rounded-[34px] border border-[#dceaf3] bg-white p-3">

              <img
                src={data.imageOne}
                alt=""
                className="h-[250px] w-full rounded-[26px] object-cover"
              />
            </div>

            {/* Small Image 2 */}
            <div className="overflow-hidden rounded-[34px] border border-[#dceaf3] bg-white p-3">

              <img
                src={data.imageTwo}
                alt=""
                className="h-[250px] w-full rounded-[26px] object-cover"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-5">

            {data.points?.map((item, index) => (

              <div
                key={index}
                className="group relative overflow-hidden rounded-[34px] border border-[#dceaf3] bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#cfe4f2] hover:shadow-[0_18px_50px_rgba(15,23,42,0.05)]"
              >

                {/* Glow */}
                <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#eef7fb] opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex items-start gap-5">

                  {/* Icon */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#eef7fb] text-[#058FD2] transition-all duration-500 group-hover:bg-[#058FD2] group-hover:text-white">

                    {index === 0 && <TrendingUp size={24} />}
                    {index === 1 && <ScanLine size={24} />}
                    {index === 2 && <ShieldCheck size={24} />}
                  </div>

                  {/* Content */}
                  <div>

                    <h3 className="text-xl font-semibold leading-snug text-[#131C15]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-[15px] leading-8 text-[#667085]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Bottom Highlight */}
            <div className="relative overflow-hidden rounded-[34px] border border-[#dceaf3] bg-[#eef7fb] p-7">

              {/* Blur */}
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#dff2fc] blur-[70px]" />

              <div className="relative z-10">

                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#058FD2]">
                  Guided Follow-Up Care
                </p>

                <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#131C15]">
                  {data.highlight}
                </h3>

                <button className="group mt-6 flex items-center gap-2 text-sm font-medium text-[#058FD2]">

                  Learn About Follow-Ups

                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FollowUpCare;