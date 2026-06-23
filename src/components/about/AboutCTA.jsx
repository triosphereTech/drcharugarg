import React from "react";
import {
  FiArrowRight,
  FiCalendar,
  FiPhone,
} from "react-icons/fi";
import PlusBg from "../../../public/images/PlusBg.png"
import Image from "next/image"
import Link from "next/link";

const AboutCTA = () => {
  return (
    <section className="px-5 lg:px-10 pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#082c62] via-[#0A3C84] to-[#0C7A72]">
          
          {/* Glow Effects */}
          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

          <Image
                        src={PlusBg}
                        alt=""
                        fill
                        priority
                        className="pointer-events-none object-cover opacity-[0.08]"/>

          <div className="relative px-8 py-16 md:px-14 md:py-20">
            <div className="mx-auto max-w-4xl text-center">
              
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
                Dedicated To Your Health Care
              </span>

              <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
                Your Skin Deserves
                <span className="block text-cyan-300">
                  Expert Care & Attention
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-blue-100">
                Whether you're seeking treatment for skin conditions,
                hair loss concerns, nail disorders, or cosmetic
                dermatology solutions, we're here to provide
                personalized care tailored to your needs.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/book-appointment" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-[#0A3C84] transition hover:scale-[1.02]">
                  <FiCalendar />
                  Book Consultation
                </Link>

                <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/15">
                  <FiPhone />
                  Contact Us
                </Link>
              </div>

            </div>
          </div>

         
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;