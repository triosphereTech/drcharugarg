// components/services/LookLike.jsx

'use client'

import React from "react";

const LookLike = ({ data }) => {
  return (
    <section className="relative overflow-hidden ">

      {/* Soft Background */}
      <div className="absolute left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-[#eef7fb] blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-3 pt-10 md:px-5 md:pt-20">

        {/* TOP */}
        <div>

          {/* Badge */}
          <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-[#dceaf3] bg-[#f8fcfe] px-4 py-2">

            <div className="h-2 w-2 rounded-full bg-[#058FD2]" />

            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#058FD2]">
              Common Signs & Symptoms
            </p>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-semibold leading-[1.05] text-[#131C15] md:text-5xl lg:text-[4  2px]">
            {data.title}
          </h2>

          {/* Description */}
          <p className="mt-3 max-w-3xl text-[15px] leading-8 text-[#667085] md:text-[17px]">
            Early identification of symptoms helps create a more accurate, personalized treatment strategy for long-term hair restoration.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-5">

          {data.items?.map((item, index) => (

            <div
              key={index}
              className="group relative overflow-hidden rounded-[26px] border border-[#e4edf2] bg-[#fbfdfe] transition-all duration-500 hover:-translate-y-1 hover:border-[#cfe4f2] hover:bg-white hover:shadow-[0_22px_70px_rgba(15,23,42,0.06)]"
            >

              {/* Glow */}
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#eef7fb] opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-100" />

              {/* Image */}
              <div className="relative overflow-hidden p-3">

                <div className="overflow-hidden rounded-[20px]">

                  <img
                    src={item.image}
                    alt={item.label}
                    className="h-[240px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[280px]"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="relative px-6 pb-7">

                
                {/* Title */}
                <h3 className="mt-5 text-[22px] font-semibold leading-snug tracking-[-0.02em] text-[#131C15]">
                  {item.label}
                </h3>

                {/* Description */}
                {item.description && (

                  <p className="mt-3 text-[14px] leading-7 text-[#667085]">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Content */}
        <div className="mt-18 border-t border-[#dceaf3] pt-10">

          <div className="">

            {/* Left */}
            <div>

              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#058FD2]">
                Personalized Diagnosis
              </p>

              <h3 className="mt-4 text-2xl font-semibold leading-tight text-[#131C15] md:text-4xl">
                {data.bottomText}
              </h3>
            </div>

      
          </div>
        </div>
      </div>
    </section>
  );
};

export default LookLike;