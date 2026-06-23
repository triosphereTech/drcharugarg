import React from "react";
import Image from "next/image";
import Dr from "../../../public/images/drcharu.jpeg";
import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";

function about() {
  return (
    <>
      <section className="px-4 pt-20 md:px-5 md:pt-20">
        <div className="">
          <div className="grid gap-x-12 xl:grid-cols-[0.85fr_1.15fr]">
            {/* IMAGE SIDE */}
            {/* IMAGE SIDE */}
            <div className="relative flex flex-col ">
              {/* IMAGE WRAPPER */}
              <div className="relative overflow-hidden rounded-[30px]">
                <Image
                  src={Dr}
                  alt="Dr Charu Garg"
                  className="h-[420px] w-full object-cover md:h-[520px] xl:h-[620px]"
                />

                {/* EXPERIENCE */}
                <div className="absolute -right-2 top-8 z-20 rounded-[24px] border border-white/20 bg-white/90 px-5 py-4 shadow-xl backdrop-blur-xl md:-right-5 md:top-10">
                  <h3 className="text-4xl font-semibold leading-none tracking-[-2px] text-primary-dark">
                    5+
                  </h3>

                  <p className="pt-2 pr-1 text-xs font-semibold uppercase tracking-[2px] text-primary-dark/50">
                    Years <br /> Experience
                  </p>
                </div>

                {/* EXPERTISE */}
                {/* <div className="absolute bottom-4 left-4 rounded-full border border-white/40 bg-sky-600/80 px-5 py-3 backdrop-blur-xl md:bottom-6 md:left-6">
                  <p className="text-xs font-medium uppercase tracking-[2px] text-white">
                    Skin • Nail • Hair Expert
                  </p>
                </div> */}
              </div>

              {/* DOCTOR INFO */}
              <div className="pt-5">
                <h3 className="text-2xl font-semibold tracking-[-1px] text-primary-dark md:text-3xl">
                  Dr. Charu Garg
                </h3>
                  <p className="text-sm pt-2 font-medium uppercase tracking-[2px] text-black">
                    Skin • Nail • Hair Expert
                  </p>
                {/* <p className="pt-2 text-sm font-medium text-primary-dark/55 md:text-base">
                  Chief Dermatologist & Medical Director
                </p> */}
              </div>
            </div>

            {/* CONTENT SIDE */}
            <div className="flex items-center pt-10 lg:pt-0">
              <div>
                {/* LABEL */}
                {/* <div className="inline-flex items-center rounded-full bg-primary-accent/10 px-4 py-2">
                  <p className="text-xs font-semibold uppercase tracking-[2px] text-primary-accent">
                    About Us
                  </p>
                </div> */}

                {/* TITLE */}
                <div className="max-w-[620px] pt-6">
                  <h2 className="text-3xl font-semibold leading-[110%] tracking-[-1.5px] text-primary-dark md:text-5xl">
                    Dr. Charu Garg
                    <span className="block text-primary-accent">
                     MD DERMATOLOGY
                    </span>
                  </h2>
                </div>

                {/* SHORT DESCRIPTION */}
                <div className="max-w-[720px] pt-7">
                  <p className="text-sm font-medium leading-[190%] text-primary-dark/65 md:text-[17px]">
                    Dr. Garg is a qualified dermatologist with over five years of clinical experience in managing disorders of the skin, hair, and nails. She completed her MD in Dermatology from Government Medical College, Surat, and pursued a fellowship in Advanced Clinical Dermatology and Lasers from Mumbai. She is committed to delivering comprehensive, patient-focused dermatology care, combining in-clinic expertise with seamless digital follow-up support to ensure continuity of care and long-term treatment outcomes.

                  </p>
                  {/* <p className="text-sm font-medium leading-[190%] text-primary-dark/65 md:text-[17px] pt-5">
                    Dr. Garg aims to make dermatology care accessible,
                    reliable, and patient-friendly through a dedicated
                    teleconsultation platform.
                  </p> */}
                </div>

                {/* POINTS */}
                {/* POINTS */}
                <div className="flex flex-wrap gap-3 pt-8">
                  <Link
                      href="#"
                      className="py-3 px-6 2xl:px-8 rounded-full bg-primary-accent text-[#ffffff] transition-all text-md active:scale-95 2xl:text-xl font-semibold flex items-center gap-2 shadow-sm shadow-inner"
                    >
                      Read more
                      <HiArrowUpRight className="text-lg 2xl:text-xl" />
                    </Link>
                    <Link
                      href="/#booking"
                      className="py-3 px-6 2xl:px-8 rounded-full bg-primary-accent text-[#ffffff] transition-all text-md active:scale-95 2xl:text-xl font-semibold flex items-center gap-2 shadow-sm shadow-inner"
                    >
                      Book Appointment
                      <HiArrowUpRight className="text-lg 2xl:text-xl" />
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default about;
