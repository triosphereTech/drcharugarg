import { HiArrowUpRight } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";
import Charu from "../../../public/images/DrDesk.jpg";

const AppointmentCTA = () => {
  return (
    <section className="pt-8 md:pt-12">
      <div className="relative overflow-hidden rounded-[36px] border border-[#7DD3FC] bg-white">
        {/* Right Background Image */}
        <div className="absolute inset-y-0 right-0 hidden w-[52%] lg:block">
          <Image
            src={Charu}
            alt="Dr Charu Garg Clinic"
            fill
            priority
            className="object-cover object-center"
          />

          {/* Fade */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/75 via-25% to-transparent" />

          {/* Glows */}
          <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#12D6C5]/20 blur-[90px]" />
          <div className="absolute top-0 left-0 h-56 w-56 rounded-full bg-[#058FD2]/15 blur-[90px]" />
        </div>

        {/* Background Glow */}
        <div className="absolute inset-0">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#058FD2]/10 blur-[110px]" />
          <div className="absolute bottom-0 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-[#12D6C5]/10 blur-[90px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 grid items-center gap-6 px-6 py-7 md:px-8 md:py-8 xl:grid-cols-[1.05fr_0.95fr] xl:px-10 xl:py-8">
          {/* Left */}
          <div className="max-w-[560px]">
            {/* Badge */}
            <div className="inline-flex rounded-full border border-[#BFE9FF] bg-white/90 px-3.5 py-1 backdrop-blur-md">
              <span className="text-[10px] font-semibold uppercase tracking-[2px] text-[#058FD2]">
                Book Your Appointment
              </span>
            </div>

            {/* Heading */}
            <div className="mt-4">
              <h2 className="text-[28px] font-semibold leading-tight text-[#131C15] md:text-[36px]">
                Get Expert Care
                <span className="mt-1 block bg-gradient-to-r from-[#058FD2] via-[#0AB9E6] to-[#16C7B7] bg-clip-text text-transparent">
                Schedule Your Consultation Today
                </span>
              </h2>
            </div>

            {/* Buttons */}
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/book-appointment"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#058FD2] to-[#16C7B7] px-5 py-2.5 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
              >
                <span className="text-sm font-semibold text-white">
                  Book Consultation
                </span>

                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
                  <HiArrowUpRight className="text-[#058FD2] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>

              <Link
                href="/contact"
                className="rounded-full border border-[#A9E7FF] bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#058FD2] backdrop-blur-md transition hover:bg-white"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Spacer for desktop image */}
          <div className="relative hidden h-[320px] lg:block">
            {/* <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#EAFBFF] via-[#EAFBFF]/20 to-transparent" /> */}
          </div>

          {/* Mobile Image */}
          <div className="hidden relative mt-10 h-[130px] overflow-hidden rounded-3xl lg:hidden">
            <Image
              src={Charu}
              alt="Dr Charu Garg Clinic"
              fill
              priority
              className="object-cover object-center"
            />

            <div className="absolute inset-0 bg-linear-to-t from-primary-dark/15 to-transparent" />
          </div>
        </div>

        {/* Border Glow */}
        <div className="pointer-events-none absolute inset-0 rounded-[36px] ring-1 ring-[#7DD3FC]/30" />
      </div>
    </section>
  );
};

export default AppointmentCTA;