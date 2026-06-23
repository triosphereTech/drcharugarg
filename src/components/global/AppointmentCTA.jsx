import { HiArrowUpRight } from "react-icons/hi2";
import Image from "next/image"
import Charu from "../../../public/images/ContactCharu.png"
import Link from "next/link";

function AppointmentCTA() {
  return (
    <section className="px-0 pt-10 md:px-0 md:pt-20">
      <div className="relative overflow-hidden rounded-[36px] border border-sky-400 bg-gradient-to-br from-cyan-50 via-white to-emerald-50">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute -left-20 -top-20 h-[350px] w-[350px] rounded-full bg-sky-100 blur-3xl opacity-70" />

          <div className="absolute -bottom-20 -right-20 h-[350px] w-[350px] rounded-full bg-emerald-100 blur-3xl opacity-70" />

          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100 blur-3xl opacity-40" />
        </div>

        {/* MAIN */}
        <div className="relative z-10 grid gap-10 p-5 md:p-8 xl:grid-cols-[1fr_0.8fr] xl:items-center xl:p-12">
          {/* LEFT CONTENT */}
          <div className="max-w-[760px]">
            {/* LABEL */}
            <div className="inline-flex items-center rounded-full border border-sky-200 bg-white/80 px-4 py-2 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[2px] text-sky-700">
                Book Your Appointment
              </p>
            </div>

            {/* TITLE */}
            <div className="pt-6">
              <h2 className="text-4xl font-semibold leading-[105%] tracking-[-2px] text-slate-900 md:text-5xl xl:text-6xl">
                Get Expert Care -
                <span className="block bg-gradient-to-r from-sky-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                  Book Your Consultation Today
                </span>
              </h2>
            </div>

            {/* SUBTEXT */}
            <div className="max-w-[580px] pt-6">
              <p className="text-sm font-medium leading-[190%] text-slate-600 md:text-[17px]">
                Personalized dermatology treatments focused on healthy
                skin, hair, and long-term wellness with expert clinical
                care and patient-centered treatment plans.
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-3 pt-8">
              {/* PRIMARY BUTTON */}
              <Link href="/book-appointment" className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-cyan-500 px-5 py-3 transition-all duration-300 hover:scale-[1.02]">
                <span className="text-sm font-semibold text-white md:text-[15px]">
                  Make a Booking
                </span>

                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
                  <HiArrowUpRight className="text-[15px] text-sky-700 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>

              {/* SECONDARY BUTTON */}
              {/* <button className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-sky-200 hover:bg-sky-50 md:text-[15px]">
                Our Facilities
              </button> */}
            </div>
          </div>

          {/* RIGHT IMAGE AREA */}
{/* RIGHT IMAGE AREA */}
<div className="relative flex min-h-[350px] items-end justify-center md:min-h-[450px]">
  {/* Decorative Rings — centered absolutely */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[280px] w-[280px] rounded-full border-[2px] border-sky-300/60 md:h-[340px] md:w-[340px]" />
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-[340px] rounded-full border border-emerald-300/50 md:h-[420px] md:w-[420px]" />
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[240px] w-[240px] rounded-full bg-gradient-to-br from-sky-100 to-emerald-100 md:h-[300px] md:w-[300px]" />

  {/* Doctor Image — sits at bottom */}
  <Image
    src={Charu}
    alt="Dr Charu Garg"
    className="relative z-10 h-[320px] w-auto object-contain object-bottom md:h-[450px]"
  />

  {/* Floating Specialization Pills — z-20 so they sit above the image */}
  <div className="absolute left-0 top-8 z-20 rounded-full bg-white px-4 py-2 text-sm font-medium text-sky-700 shadow-lg">
    Acne & Scars
  </div>
  <div className="absolute right-0 top-20 z-20 rounded-full bg-white px-4 py-2 text-sm font-medium text-emerald-700 shadow-lg">
    Hair Loss
  </div>
  <div className="absolute left-4 bottom-20 z-20 rounded-full bg-white px-4 py-2 text-sm font-medium text-sky-700 shadow-lg">
    Vitiligo
  </div>
  <div className="absolute right-4 bottom-8 z-20 rounded-full bg-white px-4 py-2 text-sm font-medium text-emerald-700 shadow-lg">
    Pediatric Care
  </div>

  {/* Accent Dots — also above image */}
  <div className="absolute left-10 top-1/2 z-20 h-3 w-3 rounded-full bg-sky-500" />
  <div className="absolute right-10 top-12 z-20 h-4 w-4 rounded-full bg-emerald-500" />
</div>
        </div>
      </div>
    </section>
  );
}

export default AppointmentCTA;