"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import JourneyImage from "../../../public/images/journey/DCJ.png";
import BadgeOne from "../../../public/images/journey/j1.png";
import BadgeTwo from "../../../public/images/journey/j2.png";

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

const OurJourney = () => {
  return (
    <section className="py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid md:gap-14 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            <motion.h2
              className="mb-5 text-4xl font-semibold leading-[105%] text-primary-dark md:text-5xl"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              The Journey <br />
              <span className="text-primary-accent">
                Behind My Practice
              </span>
            </motion.h2>

            <motion.div
              className="block md:hidden overflow-hidden rounded-[32px]"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Image
                src={JourneyImage}
                alt="Dr. Charu"
                priority
                className="h-auto w-full max-w-[520px] object-cover"
              />
            </motion.div>

            <motion.div
              className="space-y-2 text-sm md:text-lg mt-3 leading-8 text-gray-600"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p>
                My journey in dermatology began with a fascination for the way
                skin reflects our health, lifestyle, and individuality. I was
                drawn to this field because skin concerns are not only about
                appearance — they often influence confidence, comfort, and
                quality of life.
              </p>

              <p>
                I completed my MBBS from Government Medical College, Surat,
                India (2015–2021), where I developed a strong foundation in
                medicine through extensive clinical learning and patient care. I
                further pursued my MD in Dermatology from Government Medical
                College, Surat, India (2021–2024), strengthening my expertise
                in diagnosing and managing a wide range of skin, hair, and
                aesthetic concerns.
              </p>

              <p>
                To further enhance my skills and stay updated with advanced
                dermatological practices, I completed fellowship training at
                Alok Dermatology Institute, Navi Mumbai, India. My fellowship
                training helped me further develop my skills in advanced
                dermatological procedures and patient-centered care.
              </p>

              <p>
                I believe every patient's skin journey is unique. My aim is to
                provide a comfortable and supportive environment where patients
                feel heard, informed, and confident while working toward
                healthier skin.
              </p>
            </motion.div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col items-center lg:items-end">
            {/* IMAGE */}
            <motion.div
              className="hidden md:block overflow-hidden rounded-[32px]"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Image
                src={JourneyImage}
                alt="Dr. Charu"
                priority
                className="h-auto w-full max-w-[520px] object-cover"
              />
            </motion.div>

            {/* EDUCATION */}
            <motion.div
              className="mt-8 w-full max-w-[520px]"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <h2 className="text-2xl font-semibold text-primary-dark lg:text-3xl">
                Education & Training
              </h2>

              <div className="mt-6 flex items-center justify-center gap-8 lg:justify-start">
                <Image
                  src={BadgeOne}
                  alt="Alok Clinic"
                  className="h-auto w-32 md:w-44 object-contain lg:w-48"
                />

                <Image
                  src={BadgeTwo}
                  alt="GMC Surat"
                  className="h-auto w-32 md:w-44 object-contain lg:w-48"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourney;