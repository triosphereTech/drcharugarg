"use client";

import Image from "next/image";
import { HiArrowUpRight } from "react-icons/hi2";
import DoctorImage from "../../../public/images/ContactCharu.png";
import Link from "next/link";

const ContactHero = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-10">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#eef7fb] via-white to-white" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#058FD2]/10 text-[#058FD2] text-sm font-medium mb-5">
              Contact Dr. Charu Garg
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-5xl font-semibold leading-tight text-[#131C15]">
              Let's Discuss Your
              <span className="block text-[#058FD2]">
                Skin, Hair & Nail Concerns
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-gray-600">
              Whether you have questions about a skin, hair, or nail concern, need expert advice on the right treatment, or wish to schedule a consultation, our team is here to provide compassionate, personalized dermatology care tailored to your unique needs.

            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/book-appointment" className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#058FD2] text-white font-medium transition-all hover:-translate-y-0.5">
                Book Consultation
                <HiArrowUpRight className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>

            {/* Contact Cards */}
           <div className="mt-10 grid gap-4 sm:grid-cols-2">
  <div className="rounded-3xl border border-slate-200 bg-white p-5">
    <p className="text-sm text-gray-500">Phone</p>
    <a
      href="tel:+918460407471"
      className="mt-1 block font-semibold text-[#131C15] transition-colors hover:text-primary-accent"
    >
      +91 84604 07471
    </a>
  </div>

  <div className="rounded-3xl border border-slate-200 bg-white p-5">
    <p className="text-sm text-gray-500">Email</p>
    <a
      href="mailto:chgarg199@gmail.com"
      className="mt-1 block font-semibold text-[#131C15] transition-colors hover:text-primary-accent"
    >
      chgarg199@gmail.com
    </a>
  </div>

  <div className="rounded-3xl border border-slate-200 bg-white p-5">
    <p className="text-sm text-gray-500">Clinic Hours</p>
    <p className="mt-1 font-semibold text-[#131C15]">
      Mon - Sat, 10 AM - 7 PM
    </p>
  </div>

  <div className="rounded-3xl border border-slate-200 bg-white p-5">
    <p className="text-sm text-gray-500">Location</p>
    <p className="mt-1 font-semibold text-[#131C15]">
      Ahmedabad, Gujarat
    </p>
  </div>
</div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end">

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
              <div className="absolute top-8 -left-4 bg-white rounded-2xl px-4 py-3 shadow-sm border border-slate-100">
                <p className="text-sm font-medium text-[#131C15]">
                  ✓ Expert Dermatology Care
                </p>
              </div>

              <div className="absolute bottom-24 -right-4 bg-white rounded-2xl px-4 py-3 shadow-sm border border-slate-100">
                <p className="text-sm font-medium text-[#131C15]">
                  ✓ Personalized Treatments
                </p>
              </div>

              <div className="absolute bottom-8 left-6 bg-white rounded-2xl px-4 py-3 shadow-sm border border-slate-100">
                <p className="text-sm font-medium text-[#131C15]">
                  ✓ Skin • Hair • Nail Specialist
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactHero;