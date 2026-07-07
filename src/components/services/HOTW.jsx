// components/services/HOTW.jsx

"use client";

import React from "react";

import { Upload, ScanSearch, FileText } from "lucide-react";

const iconMap = {
  upload: <Upload size={34} />,
  assessment: <ScanSearch size={34} />,
  plan: <FileText size={34} />,
};

const HOTW = ({ data }) => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#eef7fb] to-[#ffffff] ">
      {/* Blur */}
      <div className="absolute right-0 top-0 h-[320px] w-[320px] rounded-full bg-[#eef7fb] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-3 pt-5 md:px-5 lg:pt-20">
        {/* Heading */}
        <div className="mx-auto max-w-[920px] text-center">
          {/* Badge */}
          <div className="mb-5 flex justify-center">
            {/* <div className="flex items-center gap-2 rounded-full border border-[#dceaf3] bg-[#f8fcfe] px-4 py-2">
              <div className="h-2 w-2 rounded-full bg-[#058FD2]" />

              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#058FD2]">
                {data.badge}
              </p>
            </div> */}
          </div>

          {/* Title */}
          <h2 className="text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#131C15] md:text-4xl lg:text-5xl">
            How our Online Consultation works
          </h2>

          {/* Description */}
          
        </div>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Curved Connection Line */}
          <div className="absolute left-1/2 top-[62px] hidden w-[78%] -translate-x-1/2 lg:block">
            <svg
              viewBox="0 0 1400 260"
              className="w-full overflow-visible"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Left → Center */}
              <path
                d="
        M 140 130
        C 300 130,
          360 70,
          520 70
        S 740 130,
          700 130
      "
                stroke="#1f2937"
                strokeWidth="3"
                strokeDasharray="1 18"
                strokeLinecap="round"
                fill="none"
                opacity="0.35"
              />

              {/* Center → Right */}
              <path
                d="
        M 700 130
        C 860 130,
          920 190,
          1080 190
        S 1260 130,
          1260 130
      "
                stroke="#1f2937"
                strokeWidth="3"
                strokeDasharray="1 18"
                strokeLinecap="round"
                fill="none"
                opacity="0.35"
              />
            </svg>
          </div>

          {/* Cards */}
          <div className="grid gap-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
            {data.steps?.map((item, index) => (
              <div
                key={index}
                className={`group relative flex flex-col items-center text-center ${
                  index === 1 ? "lg:mt-10" : "mt-0"
                }`}
              >
                {/* Circle */}
                <div className="relative">
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-full bg-[#eef7fb] opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-100" />

                  {/* Main Circle */}
                  <div className="relative flex h-[150px] w-[150px] items-center justify-center rounded-full border-[2px] border-[#8fd0ec] bg-white transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[#7a8cff] md:h-[180px] md:w-[180px]">
                    {/* Inner */}
                    <div className="flex h-[130px] w-[130px] items-center justify-center rounded-full bg-linear-to-br from-[#bbe4f9] to-white text-[#131C15] transition-all duration-500 group-hover:bg-[#eef7fb] md:h-[135px] md:w-[135px]">
                      <span className="text-5xl">{iconMap[item.icon]}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="mt-8 max-w-[320px]">
                  {/* Number */}
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#058FD2]">
                    Step 0{index + 1}
                  </p>

                  {/* Title */}
                  <h3 className="mt-3 text-2xl font-semibold leading-snug text-[#131C15]">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 text-[15px] leading-8 text-[#667085]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Line */}
        {/* <div className="relative mt-20 overflow-hidden rounded-[36px] border border-[#dceaf3] bg-[#f7fbfd] p-7 md:p-10">
         
          <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-[#dff2fc] blur-[90px]" />

          <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
           
            <div className="max-w-[760px]">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#058FD2]">
                Seamless Online Care
              </p>

              <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#131C15] md:text-4xl">
                {data.bottomTitle}
              </h3>
            </div>

       
            <div className="rounded-2xl border border-[#dceaf3] bg-white px-5 py-4">
              <p className="text-sm font-medium text-[#667085]">
                Expert care from the comfort of your home.
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default HOTW;
