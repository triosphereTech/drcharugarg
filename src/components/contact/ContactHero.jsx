"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import DoctorImage from "../../../public/images/ContactCharu.png";
import Link from "next/link";

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

const fadeIn = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.35,
      staggerChildren: 0.2,
    },
  },
};

const badgeFade = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const ContactHero = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-10">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#eef7fb] via-white to-white" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center px-4 py-2 rounded-full bg-[#058FD2]/10 text-[#058FD2] text-sm font-medium mb-5"
            >
              Contact Dr. Charu Garg
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-5xl font-semibold leading-tight text-[#131C15]"
            >
              Let's Discuss Your
              <span className="block text-[#058FD2]">
                Skin, Hair & Nail Concerns
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-[17px] leading-relaxed text-gray-600"
            >
              Whether you have questions about a skin, hair, or nail concern, need expert advice on the right treatment, or wish to schedule a consultation, our team is here to provide compassionate, personalized dermatology care tailored to your unique needs.

            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-8">
              <Link href="/book-appointment" className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#058FD2] text-white font-medium transition-all hover:-translate-y-0.5">
                Book Consultation
                <HiArrowUpRight className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </motion.div>

            {/* Contact Cards */}
           <motion.div variants={staggerContainer} className="mt-10 grid gap-4 sm:grid-cols-2">
  <motion.div variants={fadeUp} className="rounded-3xl border border-slate-200 bg-white p-5">
    <p className="text-sm text-gray-500">Phone</p>
    <a
      href="tel:+918460407471"
      className="mt-1 block font-semibold text-[#131C15] transition-colors hover:text-primary-accent"
    >
      +91 84604 07471
    </a>
  </motion.div>

  <motion.div variants={fadeUp} className="rounded-3xl border border-slate-200 bg-white p-5">
    <p className="text-sm text-gray-500">Email</p>
    <a
      href="mailto:teleconsult.drcharugarg@gmail.com"
      className="mt-1 block max-w-full break-all font-semibold text-[#131C15] transition-colors hover:text-primary-accent"
    >
      teleconsult.drcharugarg@gmail.com
    </a>
  </motion.div>

  <motion.div variants={fadeUp} className="rounded-3xl border border-slate-200 bg-white p-5">
    <p className="text-sm text-gray-500">Clinic Hours</p>
    <p className="mt-1 font-semibold text-[#131C15]">
      Mon - Sat, 10 AM - 7 PM
    </p>
  </motion.div>

  <motion.div variants={fadeUp} className="rounded-3xl border border-slate-200 bg-white p-5">
    <p className="text-sm text-gray-500">Location</p>
    <p className="mt-1 font-semibold text-[#131C15]">
      Ahmedabad, Gujarat
    </p>
  </motion.div>
</motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >

            {/* Glow */}
            <div className="absolute w-[420px] h-[420px] rounded-full bg-[#058FD2]/10 blur-3xl" />

            {/* Main Card */}
            <div className="relative bg-[#eef7fb] rounded-[40px] overflow-hidden max-w-md w-full">

              <Image
                src={DoctorImage}
                alt="Dr Charu Garg"
                className="w-full h-auto object-cover"
                priority
              />

              {/* Floating Cards */}
              <motion.div
                variants={badgeFade}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6 }}
                className="hidden xl:absolute top-8 -left-4 bg-white rounded-2xl px-4 py-3 shadow-sm border border-slate-100"
              >
                <p className="text-sm font-medium text-[#131C15]">
                  ✓ Expert Dermatology Care
                </p>
              </motion.div>

              <motion.div
                variants={badgeFade}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.75 }}
                className="hidden xl:absolute bottom-24 -right-4 bg-white rounded-2xl px-4 py-3 shadow-sm border border-slate-100"
              >
                <p className="text-sm font-medium text-[#131C15]">
                  ✓ Personalized Treatments
                </p>
              </motion.div>

              <motion.div
                variants={badgeFade}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.9 }}
                className="hidden xl:absolute bottom-8 left-6 bg-white rounded-2xl px-4 py-3 shadow-sm border border-slate-100"
              >
                <p className="text-sm font-medium text-[#131C15]">
                  ✓ Skin • Hair • Nail Specialist
                </p>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactHero;