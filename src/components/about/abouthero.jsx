"use client"
import React, { useEffect, useRef } from "react";

const services = [
  { icon: "🔬", label: "Acne & Scar Treatment", sub: "Medical & Surgical Methods", theme: "sky" },
  { icon: "☀️", label: "Skin Brightening", sub: "Pigmentation correction", theme: "cyan" },
  { icon: "💚", label: "Anti-Ageing Care", sub: "Rejuvenation & fillers", theme: "emerald" },
  { icon: "💧", label: "Hydration Therapy", sub: "Skin barrier repair", theme: "sky-solid" },
  { icon: "✨", label: "Laser Treatments", sub: "Advanced light therapy", theme: "emerald-solid" },
  { icon: "🛡️", label: "Skin Cancer Screen", sub: "Early detection", theme: "cyan-solid" },
  { icon: "🌸", label: "Chemical Peels", sub: "Resurfacing & glow", theme: "sky" },
  { icon: "💉", label: "Botox & Fillers", sub: "Cosmetic injectables", theme: "cyan" },
  { icon: "🌿", label: "Hair Loss Therapy", sub: "PRP & scalp care", theme: "emerald" },
  { icon: "🩹", label: "Psoriasis & Eczema", sub: "chronic itch relief", theme: "sky-solid" },
  { icon: "🩺", label: "Wound Care", sub: "Dermal healing", theme: "emerald-solid" },
  { icon: "⏱️", label: "Skin Consultations", sub: "Evidence-based advice", theme: "cyan-solid" },
];

const themeStyles = {
  sky: {
    card: "bg-sky-100",
    icon: "bg-sky-500 text-white",
    title: "text-sky-900",
    sub: "text-sky-700",
  },
  cyan: {
    card: "bg-cyan-100",
    icon: "bg-cyan-500 text-white",
    title: "text-cyan-900",
    sub: "text-cyan-700",
  },
  emerald: {
    card: "bg-emerald-100",
    icon: "bg-emerald-500 text-white",
    title: "text-emerald-900",
    sub: "text-emerald-700",
  },
  "sky-solid": {
    card: "bg-sky-500",
    icon: "bg-white/25 text-white",
    title: "text-white",
    sub: "text-sky-100",
  },
  "cyan-solid": {
    card: "bg-cyan-500",
    icon: "bg-white/25 text-white",
    title: "text-white",
    sub: "text-cyan-100",
  },
  "emerald-solid": {
    card: "bg-emerald-500",
    icon: "bg-white/25 text-white",
    title: "text-white",
    sub: "text-emerald-100",
  },
};

// SVG icon map — swap emojis for proper SVG icons
const IconMap = {
  acne: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  ),
  brightening: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  droplet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  zap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  flower: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <circle cx="12" cy="12" r="3" /><path d="M12 2a4 4 0 0 1 0 8 4 4 0 0 1 0-8zm0 12a4 4 0 0 1 0 8 4 4 0 0 1 0-8zM2 12a4 4 0 0 1 8 0 4 4 0 0 1-8 0zm12 0a4 4 0 0 1 8 0 4 4 0 0 1-8 0z" />
    </svg>
  ),
  needle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path d="M3 3l18 18M10.5 10.5L8 13l3 3 5.5-5.5" /><path d="M14.5 2.5l7 7-2 2-7-7z" />
    </svg>
  ),
  scissors: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
    </svg>
  ),
  bandage: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <rect x="7" y="7" width="10" height="10" rx="2" /><path d="M12 11v2M11 12h2" /><path d="M7 7L3 3M17 7l4-4M7 17l-4 4M17 17l4 4" />
    </svg>
  ),
  activity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
};

const iconKeys = [
  "acne","brightening","heart","droplet","zap","shield",
  "flower","needle","scissors","bandage","activity","clock"
];

const ServiceCard = ({ service, iconKey }) => {
  const t = themeStyles[service.theme];
  return (
    <div
      className={`flex-shrink-0 w-48 rounded-2xl p-5 flex flex-col gap-3 select-none hover:-translate-y-1 transition-transform duration-200 ${t.card}`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.icon}`}>
        {IconMap[iconKey]}
      </div>
      <div>
        <p className={`text-sm font-semibold leading-snug ${t.title}`}>{service.label}</p>
        <p className={`text-xs mt-0.5 leading-relaxed ${t.sub}`}>{service.sub}</p>
      </div>
    </div>
  );
};

const ServicesScroller = () => {
  const doubled = [...services, ...services];
  return (
    <div className="relative mt-16 overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-white to-transparent" />

      <div className="flex gap-4 w-max animate-[scroll-rtl_30s_linear_infinite] hover:[animation-play-state:paused] py-3">
        {doubled.map((s, i) => (
          <ServiceCard key={i} service={s} iconKey={iconKeys[i % services.length]} />
        ))}
      </div>

      <style>{`
        @keyframes scroll-rtl {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background blobs */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 left-0 h-[500px] w-[500px] rounded-full bg-sky-100 blur-3xl opacity-70" />
        <div className="absolute top-20 right-0 h-[450px] w-[450px] rounded-full bg-emerald-100 blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-cyan-100 blur-3xl opacity-50" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center">
          <div className="rounded-full border border-sky-100 bg-white/80 backdrop-blur px-5 py-2 text-sm font-medium text-sky-700 shadow-sm">
            About Dr. Charu Garg
          </div>
        </div>

        {/* Heading */}
        <div className="mx-auto mt-8 max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#082f68] sm:text-5xl md:text-6xl">
            We Prioritize Your
            <span className="block bg-linear-to-r from-sky-700 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              Skin Health With Expertise
            </span>
          </h1>
          {/* <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            Providing personalized dermatological care through advanced
            treatments, evidence-based approaches, and compassionate support
            tailored to your unique needs.
          </p> */}
        </div>

       

        {/* ── RTL Services Scroller ── */}
        <ServicesScroller />
      </div>
    </section>
  );
};

export default AboutHero;