"use client";

import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import Link from "next/link";

// UPDATED servicesData

const servicesData = [
  {
    image: "/images/services/hairfall/hero/hero.png",
    title: "Hair & Scalp Care",
    description: "Advanced care for hair fall and scalp health. ",

    link: "/services/hair-fall",
  },

  {
    image: "/images/services/acne/home/hero.png",
    title: "Acne & Oily Skin",
    description: "Expert solutions for breakouts and acne scars",

    link: "/services/acne-oily",
  },

  {
    image: "/images/services/pigmantation/hero/hero.png",
    title: "Pigmentation & Skin Tone",
    description: "Dark patches to Dull skin.",

    link: "/services/pigmentation",
  },

  {
    image: "/images/services/Infaction/hero/hero.png",
    title: "Skin allergy",
    description: "Diagnosis and management of skin infections and dermatitis.",

    link: "/services/skin-infection",
  },

  {
    image: "/images/services/nails/hero/hero.png",
    title: "Nail Disorders",
    description: "Specialized treatment for all nail related concerns.",

    link: "/services/nail-disorders",
  },

  {
    image: "/images/services/followup/hero/hero.png",
    title: "Ongoing Care & Follow-up",
    description:
      "Continuous follow-up care focused on long-term healthy skin results.",

    link: "/services/follow-up-care",
  },
];
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

function Services() {
  return (
    <>
      {/* SERVICES */}
      <section className="px-0 md:px-5">
        <div className="">
          {/* TOP */}
          <motion.div
            className="mx-auto text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <div className="pt-6 flex flex-col items-center">
              {/* <p className="w-fit mx-auto rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[2px] text-primary-accent">
                Our Services
              </p> */}

              <h2 className="mt-4 text-4xl md:text-5xl font-semibold leading-[105%] text-white">
                <span className="block text-white "> Our Services</span>
              </h2>
            </div>

            {/* SUBTEXT */}
            <div className="mx-auto max-w-[800px] pt-6">
              <p className="text-sm font-medium leading-[190%] text-white/80 md:text-[20px]">
                We provide comprehensive dermatology care, offering expert
                medical, surgical, and advanced aesthetic treatments tailored to
                each individual's needs. Our commitment is to deliver
                personalized, evidence-based care using modern technology and
                the highest standards in skin, hair, and nail health.
              </p>
            </div>
          </motion.div>

          {/* SERVICES GRID */}
          <motion.div
            className="grid gap-5 pt-5 md:pt-14 md:grid-cols-2 xl:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {servicesData.map((item, index) => (
              <motion.div key={index} variants={fadeUp}>
               <Link
  href={item.link}
  className="group flex h-full min-h-[470px] flex-col rounded-[32px] bg-white/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
>
  {/* IMAGE */}
  <div className="overflow-hidden rounded-[26px]">
    <img
      src={item.image}
      alt={item.title}
      className="h-[240px] w-full object-cover transition-all duration-700 group-hover:scale-105"
    />
  </div>

  {/* CONTENT */}
  <div className="flex flex-1 flex-col pt-6">
    {/* TITLE */}
    <div>
      <h3 className="text-2xl font-semibold leading-[115%] text-primary-dark">
        {item.title}
      </h3>

      <p className="pt-4 text-sm font-medium leading-[190%] text-primary-dark/60 md:text-[15px]">
        {item.description}
      </p>
    </div>

    {/* BOTTOM STRIPE */}
    <div className="mt-auto flex items-center justify-between gap-4 pt-5">
      <div className="inline-flex items-center gap-2 rounded-full bg-[#f8f8f5] px-3 py-2">
        <div className="h-2 w-2 rounded-full bg-primary-accent" />

        <p className="text-[10px] font-semibold uppercase tracking-[2px] text-primary-dark/50">
          Read More
        </p>
      </div>

      <button className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#f8f8f5] text-primary-dark transition-all duration-300 group-hover:bg-primary-accent group-hover:text-white">
        <HiArrowUpRight className="text-lg" />
      </button>
    </div>
  </div>
</Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Services;
