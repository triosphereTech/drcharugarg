// components/services/DoctorMini.jsx

'use client'

import React from "react";
import { ShieldCheck, ArrowUpRight } from "lucide-react";

const DoctorMini = ({ data }) => {
  return (
    <section className="relative overflow-hidden">

      

      <div className="relative mx-auto max-w-7xl px-3 pt-0 md:px-5 lg:pt-0">

        <div className="relative overflow-hidden rounded-[28px] border border-[#dceaf3] bg-[#f8fbfd] p-4 md:rounded-[40px] md:p-7">

          {/* Soft Glow */}
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#dff2fc] blur-[90px]" />

          <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-6">

            {/* LEFT */}
            <div className="flex items-center gap-3 md:gap-5">

              {/* Image */}
              <div className="relative shrink-0">

                <div className="absolute inset-0 rounded-[30px] bg-[#dff2fc] blur-2xl opacity-60" />

                <div className="relative overflow-hidden rounded-[20px] border border-[#dceaf3] bg-white p-1.5 md:rounded-[28px] md:p-2">

                  <img
                    src="/images/drcharu.jpeg"
                    alt={data.name}
                    className="h-[75px] w-[68px] rounded-[16px] object-cover md:h-[130px] md:w-[120px] md:rounded-[22px]"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="min-w-0">

                {/* Badge */}
                <div className="mb-2 flex w-fit items-center gap-1.5 rounded-full border border-[#dceaf3] bg-white px-2.5 py-1 md:mb-4 md:gap-2 md:px-3 md:py-1.5">

                  <ShieldCheck
                    size={13}
                    className="shrink-0 text-[#058FD2] md:w-4 md:h-4"
                  />

                  <p className="text-[7px] font-medium uppercase tracking-[0.12em] text-[#058FD2] md:text-[10px] md:tracking-[0.16em]">
                    Board Certified Dermitologist
                  </p>
                </div>

                {/* Name */}
                <span className="block text-lg font-semibold tracking-[-0.03em] text-[#131C15] md:inline md:text-[34px]">
                  {data.name}
                </span>

                {/* Degree */}
                <p className="mt-1 text-[13px] font-medium text-[#058FD2] md:mt-2 md:text-[16px]">
                  {data.degree}
                </p>

                {/* Description */}
                {/* <p className="mt-4 max-w-[420px] text-[15px] leading-7 text-[#667085]">
                  {data.description}
                </p> */}
              </div>
            </div>

            {/* RIGHT */}
            <button className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#131C15] px-5 py-3 text-xs font-medium text-white transition-all duration-300 hover:bg-[#058FD2] active:scale-95 md:w-fit md:rounded-2xl md:px-6 md:py-3.5 md:text-sm">

              Contact Us

              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:w-4 md:h-4"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorMini;