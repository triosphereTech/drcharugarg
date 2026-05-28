// components/services/TreatmentScope.jsx

'use client'

import React from "react";

import {
  ShieldPlus,
  Microscope,
  Sparkles,
  ScanSearch,
  TestTube2,
  Stethoscope,
  Syringe,
  Pill,
  ShieldCheck,
  Activity,
  Sparkle,
} from "lucide-react";

const sectionIcons = {
  conditions: <ShieldPlus size={22} />,
  investigations: <Microscope size={22} />,
  treatments: <Sparkles size={22} />,
};

const pointIcons = {
  // CONDITIONS
  "Female Pattern Hair Loss": <Sparkle size={16} />,
  "Male Pattern Baldness": <ShieldCheck size={16} />,
  "Telogen Effluvium": <Activity size={16} />,
  "Dandruff & Seborrheic Dermatitis": <ShieldPlus size={16} />,
  "Alopecia Areata & Universalis": <Sparkles size={16} />,
  "Postpartum Hair Fall": <Sparkle size={16} />,
  "Scalp Infections": <ShieldCheck size={16} />,
  "Scalp Psoriasis": <ShieldPlus size={16} />,
  "Scarring Hair Loss": <Activity size={16} />,
  "Other Causes of Hair Loss": <Sparkles size={16} />,

  // INVESTIGATIONS
  "Clinical Examination": <Stethoscope size={16} />,
  "Trichoscopy": <ScanSearch size={16} />,
  "Hair Density Assessment": <Activity size={16} />,
  "Nutritional Evaluation": <TestTube2 size={16} />,
  "Hormonal Assessment": <Microscope size={16} />,
  "Hair Pull Test": <ShieldCheck size={16} />,

  // TREATMENTS
  "Medical Management": <Pill size={16} />,
  "Platelet Rich Plasma Therapy": <Syringe size={16} />,
  "Dutasteride Mesotherapy": <TestTube2 size={16} />,
  "Scalp Threads": <Sparkles size={16} />,
  "Exosomes": <Activity size={16} />,
};

const TreatmentScope = ({ data }) => {
  return (
    <section className="relative overflow-hidden bg-[#ffffff] ">

      {/* Blur */}
      <div className="absolute left-0 top-0 h-[320px] w-[320px] rounded-full bg-[#eef7fb] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-3 pt-10 md:px-5 md:pt-20">

        {/* TOP */}
        <div className="max-w-[900px]">

          {/* Badge */}
          <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-[#dceaf3] bg-[#f8fcfe] px-4 py-2">

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

        {/* TABLES */}
        <div className="mt-16 grid gap-6 xl:grid-cols-3">

          {data.tables?.map((table, index) => (

            <div
              key={index}
              className="group relative overflow-hidden rounded-[38px] border border-[#e4edf2] bg-[#fbfdfe] transition-all duration-500 hover:-translate-y-1 hover:border-[#cfe4f2] hover:bg-white hover:shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
            >

              {/* Glow */}
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#eef7fb] opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-100" />

              {/* Header */}
              <div className="relative border-b border-[#edf3f7] px-6 py-6">

                <div className="flex items-start gap-4">

                  {/* Icon */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#eef7fb] text-[#058FD2] transition-all duration-500 group-hover:bg-[#058FD2] group-hover:text-white">

                    {sectionIcons[table.icon]}
                  </div>

                  {/* Title */}
                  <div>

                    <h3 className="text-[28px] font-semibold leading-tight tracking-[-0.03em] text-[#131C15]">
                      {table.title}
                    </h3>

                    <p className="mt-2 text-sm font-medium text-[#8a97a5]">
                      {table.items.length} Specialized Areas
                    </p>
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-4">

                <div className="grid gap-3 xl:grid-cols-1 2xl:grid-cols-2">

                  {table.items?.map((item, i) => (

                    <div
                      key={i}
                      className="flex min-h-fit items-center gap-3 rounded-2xl border border-[#edf3f7] bg-white px-4 py-3 transition-all duration-300 hover:border-[#d9eaf4] hover:bg-[#fafcfd]"
                    >

                      {/* Icon */}
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef7fb] text-[#058FD2]">

                        {pointIcons[item]}
                      </div>

                      {/* Text */}
                      <p className="text-[14px] font-medium leading-6 text-[#4b5563]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-[#edf3f7] bg-[#fafcfd] px-6 py-5">

                <p className="text-[14px] leading-7 text-[#667085]">
                  {table.footer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TreatmentScope;