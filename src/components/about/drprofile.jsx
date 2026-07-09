"use client";

import React from "react";
import Image from "next/image"
import Charu from "../../../public/images/drcharu.jpeg"
import { motion } from "framer-motion";
import {
  GiHairStrands,
  GiNails,
  GiScalpel,
} from "react-icons/gi";

import {
  FaRegSmile,
  FaAllergies,
  FaShieldVirus,
  FaLeaf,
  FaChild,
} from "react-icons/fa";

import {
  MdOutlineFaceRetouchingNatural,
  MdOutlineHealthAndSafety,
} from "react-icons/md";

import {
  BsScissors,
  BsEar,
} from "react-icons/bs";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeIn = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.25,
      staggerChildren: 0.18,
    },
  },
};

const DrProfile = () => {
const expertise = [
  {
    title: "Acne and acne scars",
    icon: <MdOutlineFaceRetouchingNatural />,
  },
  {
    title: "Eczema and dermatitis",
    icon: <FaAllergies />,
  },
  {
    title: "Psoriasis",
    icon: <FaShieldVirus />,
  },
  {
    title: "Infectious Skin Disorders",
    icon: <MdOutlineHealthAndSafety />,
  },
  {
    title: "Medical and Surgical management of vitiligo",
    icon: <FaLeaf />,
  },
  {
    title: "Hair loss disorders",
    icon: <GiHairStrands />,
  },
  {
    title: "PRP and Regenerative therapies",
    icon: <GiHairStrands />,
  },
  {
    title: "Dermatosurgery",
    icon: <BsScissors />,
  },
  {
    title: "Keloid and hypertrophic scar management",
    icon: <GiScalpel />,
  },
  {
    title: "Pediatric dermatology",
    icon: <FaChild />,
  },
];

  const publications = [
    {
      title:
        "Dual-Mode Carbon Dioxide Laser with 1540nm Non-Ablative Fractional Laser and Topical Sirolimus in Lymphangioma Circumscriptum",
      journal: "Journal of Cutaneous and Aesthetic Surgery",
    },
    {
      title:
        "Lichen Planus at the Recipient Site Following Suction Blister Epidermal Grafting for Lower Lip Vitiligo: Possible Role of Local Adhesive-Induced Immune Activation : Journal of Cutaneous and Aesthetic Surgery",
      journal: "Journal of Cutaneous and Aesthetic Surgery",
    },
    {
      title:
        "A Case Series of Dowling Degos Disease with Dermoscopic Findings",
      journal: "Pigment International",
    },
    {
      title: "Bleomycin-induced Flagellate Dermatitis",
      journal: "Indian Journal of Pediatric Dermatology",
    },
    {
      title:
        "Infantile Systemic Hyalinosis: A Clinical Masquerader for Clinicians",
      journal: "Indian Journal of Pediatric Dermatology",
    },
  ];

  return (
    <section className="relative bg-linear-to-b from-white to-[#eef7fb]">
      {/* ========================= */}
      {/* Doctor Profile Section */}
      {/* ========================= */}

      <div className="px-2 lg:px-10 py-0 md:py-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] md:rounded-[40px] bg-linear-to-br from-[#082c62] via-[#0A3C84] to-[#0C7A72]">
          <div className="grid lg:grid-cols-[1.2fr_.8fr]">
            {/* Left Content */}
            <motion.div
              className="px-4 lg:px-10 p-0 md:p-12 lg:p-16 text-white"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-sm">
                  Consultant Dermatologist
                </span>
              </div> */}

              <motion.h2 variants={fadeUp} className="mt-5 text-4xl md:text-5xl font-bold">
                Dr. Charu Garg
              </motion.h2>

              <motion.p variants={fadeUp} className="mt-3 text-lg text-blue-100">
                MBBS, M.D. (Dermatology)
              </motion.p>

              <motion.div variants={fadeUp} className="mt-3 text-sm md:text-base space-y-5 pb-5 text-blue-50 leading-relaxed">
                <p>
                  A Consultant Dermatologist graduated from Government Medical College, Surat. She excelled in dermatology, securing the top position at Government Medical College,Surat and New Civil Hospital  and completed a fellowship in Clinical Dermatology & Lasers at Alok Dermatology Institute,Mumbai.
                </p>

                <p>
                  Her expertise has been recognized with awards, including her  paper presentations at various dermatology conferences,  being a finalist in the prestigious ACSICON Quiz and  securing first place in the National COSDERMINDIA Quiz held in Mumbai in 2024.
                </p>

                
              </motion.div>

              {/* Stats */}
              {/* <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur p-4">
                  <h4 className="text-2xl font-bold">5+</h4>
                  <p className="text-xs text-blue-100 mt-1">
                    Years Experience
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur p-4">
                  <h4 className="text-2xl font-bold">MD</h4>
                  <p className="text-xs text-blue-100 mt-1">
                    Dermatology
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur p-4">
                  <h4 className="text-2xl font-bold">Laser</h4>
                  <p className="text-xs text-blue-100 mt-1">
                    Fellowship
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur p-4">
                  <h4 className="text-2xl font-bold">2024</h4>
                  <p className="text-xs text-blue-100 mt-1">
                    Quiz Winner
                  </p>
                </div>
              </div> */}
            </motion.div>

            {/* Right Image */}
            <motion.div
              className="relative min-h-[450px] lg:min-h-full"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />

              <Image
                src={Charu}
                alt="Dr Charu Garg"
                className="h-full w-full object-cover"
              />

              {/* Floating Badge */}
             
            </motion.div>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* Expertise + Contact */}
      {/* ========================= */}

      <div className="px-5 lg:px-10 py-10">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-[1fr_420px] gap-10">
          {/* Left Content */}
          <div>
            {/* Expertise */}
            <div className="rounded-[32px] border border-slate-200 bg-white px-5 py-5 md:py-5">
              <motion.div
                className="mb-4"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
              >
                {/* <span className="text-sm font-medium text-cyan-700">
                  Areas of Expertise
                </span> */}

                <span className="mt-2 text-3xl font-bold text-slate-900">
                  Areas of Expertise
                </span>
              </motion.div>

                <motion.div
                  className="grid md:grid-cols-2 gap-3"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
  {expertise.map((item, index) => (
    <motion.div
      key={index}
      variants={fadeUp}
      className="group rounded-2xl border border-slate-200 p-3 transition-all hover:border-cyan-300 hover:shadow-md hover:-translate-y-1"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 text-lg transition-all group-hover:bg-cyan-100">
          {item.icon}
        </div>

        <p className="text-sm md:text-md lg:text-lg text-slate-700">
          {item.title}
        </p>
      </div>
    </motion.div>
  ))}
</motion.div>
            </div>

            {/* Publications */}
            <div className="mt-5 rounded-[32px] border border-slate-200 bg-white px-5 md:px-8 py-5 md:py-8">
              <motion.div
                className="mb-5"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
              >
                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  Notable publications
                </h3>
              </motion.div>

              <motion.div
                className="space-y-5"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {publications.map((publication, index) => (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    className="rounded-2xl border border-slate-200 p-5 transition-all hover:shadow-md"
                  >
                    <h4 className="font-semibold text-sm md:text-base text-slate-900 leading-relaxed">
                      {publication.title}
                    </h4>

                    <p className="mt-3 text-sm text-cyan-700 font-medium">
                      {publication.journal}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Sticky Form */}
          <div className="relative">
            <div className="lg:sticky lg:top-24">
              <motion.div
                className="overflow-hidden rounded-[32px] border border-emerald-100 bg-linear-to-br from-[#082c62] via-[#0A3C84] to-[#0C7A72] p-8"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                  ✉️
                </div>

                <h3 className="mt-6 text-4xl font-bold leading-tight text-white">
                  Message Our Medical Team
                </h3>

                <p className="mt-4 text-gray-200">
                  Have questions regarding skin, hair or nail
                  treatments? Send us a message and our team will
                  get back to you.
                </p>

                <div className="mt-8 space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                      Name
                    </label>

                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                      Phone
                    </label>

                    <input
                      type="text"
                      placeholder="Phone Number"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                      Email
                    </label>

                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                      Message
                    </label>

                    <textarea
                      rows={5}
                      placeholder="Write your message..."
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-cyan-400 resize-none"
                    />
                  </div>

                  <button className="w-full rounded-xl bg-white px-5 py-4 font-medium text-black transition hover:opacity-90">
                    Send Message
                  </button>

                  <p className="text-center text-xs text-slate-300">
                    Usually responds within 24 hours
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DrProfile;