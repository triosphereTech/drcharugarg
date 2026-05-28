// components/services/ServiceContent.jsx

'use client'
import React from "react";
import { Check } from "lucide-react";

const ServiceContent = ({ data }) => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1350px] px-5 md:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          
          {/* Left Images */}
          <div className="relative">
            {/* Main Image */}
            <div className="overflow-hidden rounded-[34px]">
              <img
                src={data.contentImage}
                alt={data.title}
                className="h-[520px] w-full object-cover"
              />
            </div>

            {/* Floating Mini Card */}
            <div className="absolute -bottom-6 right-5 rounded-[28px] border border-[#e7edf1] bg-white p-5 shadow-[0_15px_50px_rgba(0,0,0,0.07)] md:right-8 md:w-[280px]">
              <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#058FD2]">
                Why Choose Us
              </p>

              <h3 className="mt-3 text-xl font-semibold leading-snug text-[#131C15]">
                Personalized dermatology care with advanced treatments.
              </h3>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-[#058FD2]">
              About Treatment
            </p>

            <h2 className="max-w-[650px] text-3xl font-semibold leading-tight text-[#131C15] md:text-5xl">
              {data.contentTitle}
            </h2>

            <p className="mt-6 text-[15px] leading-8 text-[#667085] md:text-base">
              {data.contentDesc}
            </p>

            {/* Benefits */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {data.benefits?.map((item, index) => (
                <div
                  key={index}
                  className="rounded-[24px] border border-[#e8edf1] bg-[#fafcfd] p-5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef7fb] text-[#058FD2]">
                    <Check size={18} />
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-[#131C15]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-[#667085]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="rounded-full bg-[#131C15] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#058FD2] active:scale-95">
                Schedule Consultation
              </button>

              <button className="rounded-full border border-[#dce7ee] bg-white px-7 py-3.5 text-sm font-medium text-[#131C15] transition-all duration-300 hover:border-[#058FD2] hover:text-[#058FD2]">
                View Treatments
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceContent;