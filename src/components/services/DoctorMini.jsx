// components/services/DoctorMini.jsx

'use client'

import React from "react";
import { ShieldCheck, ArrowUpRight } from "lucide-react";

const DoctorMini = ({ data }) => {
  return (
    <section className="relative overflow-hidden bg-[] py-14 md:py-18">

      {/* Blur */}
      <div className="absolute left-1/2 top-0 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-[#eef7fb] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-3 pt-10 md:px-5 md:pt-20">

        <div className="relative overflow-hidden rounded-[40px] border border-[#dceaf3] bg-[#f8fbfd] p-5 md:p-7">

          {/* Soft Glow */}
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#dff2fc] blur-[90px]" />

          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            {/* LEFT */}
            <div className="flex items-center gap-5">

              {/* Image */}
              <div className="relative shrink-0">

                <div className="absolute inset-0 rounded-[30px] bg-[#dff2fc] blur-2xl opacity-60" />

                <div className="relative overflow-hidden rounded-[28px] border border-[#dceaf3] bg-white p-2">

                  <img
                    src="/images/drcharu.jpeg"
                    alt={data.name}
                    className="h-[110px] w-[100px] rounded-[22px] object-cover md:h-[130px] md:w-[120px]"
                  />
                </div>
              </div>

              {/* Content */}
              <div>

                {/* Badge */}
                <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-[#dceaf3] bg-white px-3 py-1.5">

                  <ShieldCheck
                    size={14}
                    className="text-[#058FD2]"
                  />

                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#058FD2]">
                    Board Certified Dermitologist
                  </p>
                </div>

                {/* Name */}
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#131C15] md:text-[34px]">
                  {data.name}
                </h2>

                {/* Degree */}
                <p className="mt-2 text-[15px] font-medium text-[#058FD2] md:text-[16px]">
                  {data.degree}
                </p>

                {/* Description */}
                {/* <p className="mt-4 max-w-[420px] text-[15px] leading-7 text-[#667085]">
                  {data.description}
                </p> */}
              </div>
            </div>

            {/* RIGHT */}
            <button className="group flex w-fit items-center gap-2 rounded-2xl bg-[#131C15] px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#058FD2] active:scale-95">

              Contact Us

              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorMini;