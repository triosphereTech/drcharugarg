'use client'

import React from "react";
import ReactCompareImage from "react-compare-image";

const BeforeAfter = ({ data }) => {
  return (
    <section className="relative overflow-hidden bg-linear-[120deg] from-[#315e95] via-[#039bd3] to-[#50b1a2] py-10 md:my-16 mx-5 rounded-4xl py-18 md:py-15">

      <div className="absolute right-0 top-0 h-[320px] w-[320px] rounded-full bg-[#eef7fb] blur-[120px]" />

      <div className="relative mx-auto max-w-[1350px] px-5 md:px-8 lg:px-10">

        {/* Header */}
        <div className="max-w-[850px]">

          <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-[#dceaf371] bg-white/20 px-4 py-2">

            <div className="h-2 w-2 rounded-full bg-white" />

            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white">
              Patient Transformations
            </p>
          </div>

         <h2 className="text-3xl font-semibold leading-[1.1] text-white md:text-4xl lg:text-4xl">
            {data.title}
          </h2>

          <p className="mt-5 max-w-[650px] text-[15px] leading-7 text-white">
            {data.description}
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-6 lg:grid-cols-4">

          {data.items?.map((item, index) => (

            <div
              key={index}
              className="overflow-hidden rounded-[16px] border border-[#e4edf2]/30 bg-white/60 p-4 shadow-[0_10px_40px_rgba(15,23,42,0.04)]"
            >

              {/* Comparison */}
              <div className="h-[240px] overflow-hidden rounded-[14px] md:h-[280px]">
                <ReactCompareImage
                  leftImage={item.beforeImage}
                  rightImage={item.afterImage}
                />
              </div>

              {/* Labels */}
              <div className="mt-5 flex items-center justify-between">

                <span className="rounded-full bg-[#f4f5f7] px-4 py-2 text-xs font-medium text-[#667085]">
                  Before
                </span>

                <span className="rounded-full bg-[#eef7fb] px-4 py-2 text-xs font-medium text-[#058FD2]">
                  After
                </span>
              </div>

              {/* Content */}
              <div className="mt-5">

                <h3 className="text-2xl font-semibold text-[#131C15]">
                  {item.title}
                </h3>

                <p className="mt-3 text-[15px] leading-7 text-[#667085]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-14 border-t border-[#dceaf3]/50 pt-8">

          <p className="text-center text-sm leading-7 text-white">
            Results vary from person to person depending on condition severity,
            treatment plan, and adherence to medical advice.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;