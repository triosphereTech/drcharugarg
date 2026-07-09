// components/services/TreatmentScope.jsx

"use client";

import React from "react";
import { motion } from "framer-motion";

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
  Trichoscopy: <ScanSearch size={16} />,
  "Hair Density Assessment": <Activity size={16} />,
  "Nutritional Evaluation": <TestTube2 size={16} />,
  "Hormonal Assessment": <Microscope size={16} />,
  "Hair Pull Test": <ShieldCheck size={16} />,

  // TREATMENTS
  "Medical Management": <Pill size={16} />,
  "Platelet Rich Plasma Therapy": <Syringe size={16} />,
  "Dutasteride Mesotherapy": <TestTube2 size={16} />,
  "Scalp Threads": <Sparkles size={16} />,
  Exosomes: <Activity size={16} />,
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 70,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.22,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const TreatmentScope = ({ data }) => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white to-[#eef7fb] ">
      {/* Blur */}
      <div className="absolute left-0 top-0 h-[320px] w-[320px] rounded-full bg-[#eef7fb] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-3 pt-10 md:px-5 md:pt-20">
        {/* TOP */}
        <motion.div
          className="max-w-auto px-2"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* Badge */}
          <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-[#dceaf3] bg-[#f8fcfe] px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-[#058FD2]" />

            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#058FD2]">
              Clinical overview
            </p>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-semibold leading-[1.05] text-[#131C15] md:text-4xl lg:text-5xl">
            Diagnosis & Treatment Approach
          </h2>
        </motion.div>

        {/* TABLES */}
        <motion.div
          className="mt-6 lg:mt-16 grid gap-6 xl:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {data.tables?.map((table, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              className="group relative overflow-hidden rounded-[38px] border border-[#e4edf2] bg-[#fbfdfe] transition-all duration-500 hover:-translate-y-1 hover:border-[#cfe4f2] hover:bg-white hover:shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
            >
              {/* Glow */}
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#eef7fb] opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-100" />

              {/* Header */}
              <div className="relative border-b border-[#edf3f7] px-6 py-6">
                <div className="flex items-start gap-4">
                  {/* Title */}
                  <div>
                    <h3 className="text-[22px] font-semibold leading-tight text-[#131C15]">
                      {table.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                  {table.items?.map((item, i) => (
                    <div
                      key={i}
                      className="flex min-h-fit items-center gap-3 rounded-2xl border border-[#edf3f7] bg-white px-4 py-3 transition-all duration-300 hover:border-[#d9eaf4] hover:bg-[#fafcfd]"
                    >
                      {/* Icon */}
                      <div className="relative flex h-6 w-6 items-center justify-center shrink-0">
                        {/* Background circle */}
                        <div className="absolute h-4 w-4 rounded-full bg-[#058FD2]/15" />

                        {/* Blue dot */}
                        <div className="relative h-2 w-2 rounded-full bg-[#058FD2]" />
                      </div>

                      {/* Text */}
                      <p className="text-[14px] font-medium leading-6 text-[#4b5563]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TreatmentScope;