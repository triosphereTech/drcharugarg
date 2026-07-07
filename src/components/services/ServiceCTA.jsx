import React from "react";
import {
  FiArrowRight,
  FiCalendar,
  FiPhone,
} from "react-icons/fi";
import PlusBg from "../../../public/images/PlusBg.png"
import Image from "next/image"
import Link from "next/link";

const ServiceCTA = () => {
  return (
    <section className="px-5 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[20px] md:rounded-[40px] bg-linear-to-br from-[#082c62] via-[#0A3C84] to-[#0C7A72]">
          
          {/* Glow Effects */}
          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

          <Image
                        src={PlusBg}
                        alt=""
                        fill
                        priority
                        className="pointer-events-none object-cover opacity-[0.08]"/>

          <div className="relative px-5 py-8 md:px-14 md:py-20">
            <div className="mx-auto max-w-4xl text-center">
              
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white backdrop-blur md:px-4 md:py-2 md:text-sm">
                Book Now
              </span>

              <h2 className="mt-4 text-2xl font-bold text-white md:mt-6 md:text-4xl lg:text-5xl">
                Your skin needs more than a single visit -
                <span className="block text-cyan-300">
                  get guided care with regular monitoring.
                </span>
              </h2>

             

              {/* Buttons */}
              <div className="mt-6 flex flex-row flex-wrap items-center justify-center gap-2 md:mt-10 md:flex-row md:gap-4">
                <Link href="/book-appointment" className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-xs font-semibold text-[#0A3C84] transition hover:scale-[1.02] md:gap-2 md:rounded-xl md:px-7 md:py-4 md:text-base">
                  <FiCalendar />
                  Book Consultation
                </Link>

                <Link href="/contact" className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/15 md:gap-2 md:rounded-xl md:px-7 md:py-4 md:text-base">
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

export default ServiceCTA;