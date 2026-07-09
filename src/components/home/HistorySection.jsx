"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import {
  FiAward,
  FiTrendingUp,
  FiCpu,
  FiHome,
  FiStar,
  FiUsers,
  FiHeart,
  FiCheckCircle,
} from "react-icons/fi";

const timelineData = [
  {
    year: "1989",
    title: "Foundation",
    subtitle: "Where It All Began",
    description:
      "Dr. Charu Garg started with a visionary goal — to provide compassionate, quality dermatological care to the people of Pune within a private practice setting.",
    stat: "Year 1",
    statLabel: "of Practice",
    icon: FiAward,
    statIcon: FiCheckCircle,
  },
  {
    year: "1995",
    title: "Expansion",
    subtitle: "Growing Beyond Boundaries",
    description:
      "Expanded services to include advanced hair transplantation and aesthetic procedures, meeting the rising demand for specialized skin and hair care.",
    stat: "2×",
    statLabel: "Services Added",
    icon: FiTrendingUp,
    statIcon: FiTrendingUp,
  },
  {
    year: "2005",
    title: "Technology Upgrade",
    subtitle: "Embracing Innovation",
    description:
      "Introduced state-of-the-art laser treatments and cutting-edge diagnostic equipment, setting new standards for precision dermatological care.",
    stat: "10+",
    statLabel: "New Treatments",
    icon: FiCpu,
    statIcon: FiCpu,
  },
  {
    year: "2015",
    title: "New Facility",
    subtitle: "A Space Worthy of Care",
    description:
      "Relocated to a modern, expansive facility designed to accommodate growing patient needs — blending clinical excellence with comfort and warmth.",
    stat: "3×",
    statLabel: "Larger Space",
    icon: FiHome,
    statIcon: FiHome,
  },
  {
    year: "2024",
    title: "Excellence Continues",
    subtitle: "35 Years & Counting",
    description:
      "Celebrating over three decades of transformative dermatological care, with 50,000+ happy patients and a legacy that continues to inspire.",
    stat: "50K+",
    statLabel: "Happy Patients",
    icon: FiStar,
    statIcon: FiUsers,
  },
];

/* ─── Single timeline item ─────────────────────────────────────── */
function TimelineItem({ item, index, timelineProgress, totalItems }) {
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);
  // Each layout has its own ref so useInView fires correctly on both breakpoints
  const desktopInView = useInView(desktopRef, { once: true, margin: "-15% 0px -15% 0px" });
  const mobileInView = useInView(mobileRef, { once: true, margin: "-15% 0px -15% 0px" });
  const isInView = desktopInView || mobileInView;
  const dotPosition = (index + 0.3) / totalItems;
  const dotScale = useTransform(
    timelineProgress,
    [Math.max(0, dotPosition - 0.07), dotPosition],
    [0, 1],
  );
  const isEven = index % 2 === 0;
  const Icon = item.icon;
  const StatIcon = item.statIcon;

  return (
    <>
      <div
        ref={desktopRef}
        className={`hidden md:flex relative items-center gap-0 min-h-[380px] ${
          isEven ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {/* Card side */}
        <div
          className={`w-[calc(50%-48px)] ${
            isEven ? "pr-14 text-right" : "pl-14 text-left"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, x: isEven ? 60 : -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className={`inline-block ${isEven ? "ml-auto" : "mr-auto"}`}
          >
            <div
              className={`relative bg-white rounded-2xl p-7 shadow-[0_4px_40px_rgba(0,0,0,0.06)] border-2 border-white max-w-sm ${
                isEven ? "ml-auto" : "mr-auto"
              }`}
            >
              {/* glow bg */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              />

              <div className="relative z-10">
                {/* icon + step row */}
                <motion.div
                  className={`flex items-center gap-2 mb-3 ${
                    isEven ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-50 text-primary-accent">
                    <Icon size={14} />
                  </span>
                  <span className="text-xs font-bold tracking-[0.18em] text-primary-accent uppercase">
                    {String(index + 1).padStart(2, "0")} — {item.subtitle}
                  </span>
                </motion.div>

                <motion.h3
                  className="text-2xl font-bold text-slate-900 mb-3 leading-tight"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 }}
                >
                  {item.title}
                </motion.h3>

                <motion.p
                  className="text-slate-500 text-sm leading-relaxed mb-5"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 }}
                >
                  {item.description}
                </motion.p>

                <motion.div
                  className={`flex items-center gap-2 ${
                    isEven ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.45 }}
                >
                  <div className="flex items-center gap-2 bg-primary-accent text-white px-4 py-2 rounded-full">
                    <StatIcon size={13} className="opacity-80" />
                    <span className="text-base font-bold">{item.stat}</span>
                    <span className="text-xs opacity-80">{item.statLabel}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Center dot */}
        <div className="relative w-24 flex-shrink-0 flex justify-center">
          <motion.div
            style={{ scale: dotScale }}
          >
            <motion.div
              className="w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow-[0_0_0_3px_rgba(37,99,235,0.2)]"
              animate={isInView ? { boxShadow: "0 0 0 7px rgba(37,99,235,0.12)" } : {}}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        </div>

        {/* Year side */}
        <div
          className={`w-[calc(50%-48px)] flex items-center ${
            isEven ? "pl-12 justify-start" : "pr-12 justify-end"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative select-none"
          >
            <span
              className="block text-[9rem] lg:text-[11rem] font-black leading-none text-slate-900"
              style={{ opacity: 0.045, letterSpacing: "-0.04em" }}
            >
              {item.year}
            </span>
            <motion.span
              className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-primary-accent"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {item.year}
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* ── MOBILE layout (<md) ────────────────────────────────── */}
      <div
        ref={mobileRef}
        className="md:hidden relative flex gap-4 pb-10"
      >
        {/* Left spine + dot */}
        <div className="flex flex-col items-center">
          <motion.div
            style={{ scale: dotScale }}
            className="mt-1 flex-shrink-0"
          >
            <div className="w-4 h-4 rounded-full bg-blue-600 border-[3px] border-white shadow-[0_0_0_3px_rgba(37,99,235,0.18)]" />
          </motion.div>
          {/* connector line segment */}
          <div className="w-px flex-1 bg-slate-100 mt-2" />
        </div>

        {/* Card */}
        <motion.div
          className="flex-1 pb-2"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {/* Year badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-black text-blue-600">{item.year}</span>
            <span className="flex items-center gap-1 text-[11px] font-bold tracking-widest text-sky-500 uppercase">
              <Icon size={12} />
              {item.title}
            </span>
          </div>

          <div className="relative bg-white rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100">
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
            />
            <div className="relative z-10">
              <p className="text-xs font-bold tracking-[0.15em] text-sky-500 uppercase mb-2">
                {item.subtitle}
              </p>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                {item.description}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm">
                  <StatIcon size={12} className="opacity-80" />
                  <span className="font-bold">{item.stat}</span>
                  <span className="text-xs opacity-80">{item.statLabel}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

/* ─── Main export ───────────────────────────────────────────────── */
export default function HistorySection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const lineScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);
  const startDotScale = useTransform(smoothProgress, [0, 0.06], [0, 1]);
  const endDotScale = useTransform(smoothProgress, [0.92, 1], [0, 1]);

  return (
    <section className="relative px-3 pt-10 md:px-5 md:pt-20 overflow-hidden">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right,#0284C7 1px,transparent 1px),linear-gradient(to bottom,#0284C7 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center mb-16 md:mb-20">
        <motion.div
          className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-sky-500 uppercase mb-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* <FiHeart size={12} /> */}
          5+ Years of Dermatological Excellence
        </motion.div>

        <motion.h2
          className="text-4xl md:text-5xl font-semibold text-slate-900 leading-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          A Legacy of{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-primary-accent">Excellence</span>
            <motion.span
              className="absolute bottom-1 left-0 right-0 h-3 bg-sky-100 -z-[1] rounded"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{ transformOrigin: "left" }}
            />
          </span>{" "}
          in Dermatology
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg text-sky-600 font-semibold mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          The Journey of Dr. Charu Garg
        </motion.p>

        <motion.p
          className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          The journey of Dr. Charu Garg began in 1989, when a visionary dermatologist started
          private practice in Pune. From a humble clinic to a landmark institution, the path has
          been defined by compassion, innovation, and an unwavering commitment to patient care.
        </motion.p>
      </div>

      {/* ── Timeline body ──────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative max-w-5xl mx-auto px-5 sm:px-8"
      >
        {/* Desktop spine track */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-slate-100" />

        {/* Desktop animated fill */}
        <motion.div
          className="hidden md:block absolute left-1/2 top-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-sky-400 to-blue-600 origin-top rounded-full"
          style={{ scaleY: lineScaleY, height: "100%", transformOrigin: "top center" }}
        />

        {/* Desktop spine endpoint dots */}
        <motion.div
          className="hidden md:block absolute left-1/2 top-0 z-20 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 border-[3px] border-white shadow-[0_0_0_3px_rgba(37,99,235,0.18)]"
          style={{ scale: startDotScale }}
        />
        <motion.div
          className="hidden md:block absolute left-1/2 bottom-0 z-20 w-4 h-4 -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-600 border-[3px] border-white shadow-[0_0_0_3px_rgba(37,99,235,0.18)]"
          style={{ scale: endDotScale }}
        />

        {/* Mobile spine track (left-aligned) */}
        <div className="md:hidden absolute left-[6px] top-0 bottom-0 w-px bg-slate-100" />

        <div className="relative z-10 flex flex-col">
          {timelineData.map((item, index) => (
            <TimelineItem
              key={item.year}
              item={item}
              index={index}
              timelineProgress={smoothProgress}
              totalItems={timelineData.length}
            />
          ))}
        </div>
      </div>

      {/* ── Footer CTA ─────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center mt-14 md:mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="inline-flex items-center gap-3 bg-primary-accent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg shadow-blue-200">
          <FiUsers size={18} className="opacity-80" />
          <span className="text-xl sm:text-2xl font-black">50,000+</span>
          <span className="text-xs sm:text-sm font-medium opacity-90">
            Happy Patients &amp; Counting
          </span>
        </div>
      </motion.div>
    </section>
  );
}
