import { HiArrowUpRight } from "react-icons/hi2";

function AppointmentCTA() {
  return (
    <>
      <section className="px-4 pt-10 md:px-5 md:pt-20">
        <div className="relative overflow-hidden rounded-[36px] bg-primary-dark">
          {/* BACKGROUND GLOW */}
          <div className="absolute left-[-120px] top-[-120px] h-[260px] w-[260px] rounded-full bg-primary-accent/20 blur-3xl" />

          <div className="absolute bottom-[-160px] right-[-120px] h-[320px] w-[320px] rounded-full bg-primary-accent/10 blur-3xl" />

          {/* MAIN */}
          <div className="relative z-10 grid gap-10 p-5 md:p-8 xl:grid-cols-[1fr_0.7fr] xl:items-center xl:p-12">
            {/* LEFT CONTENT */}
            <div className="max-w-[760px]">
              {/* LABEL */}
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[2px] text-primary-accent">
                  Book Your Appointment
                </p>
              </div>

              {/* TITLE */}
              <div className="pt-6">
                <h2 className="text-4xl font-semibold leading-[105%] tracking-[-2px] text-white md:text-5xl xl:text-6xl">
                  Get Expert Care —
                  <span className="block text-primary-accent">
                    Book Your Consultation Today
                  </span>
                </h2>
              </div>

              {/* SUBTEXT */}
              <div className="max-w-[580px] pt-6">
                <p className="text-sm font-medium leading-[190%] text-white/65 md:text-[17px]">
                  Personalized dermatology treatments focused on healthy skin,
                  hair, and long-term wellness with expert clinical care.
                </p>
              </div>

              {/* BUTTONS */}
              {/* BUTTONS */}
<div className="flex flex-wrap gap-3 pt-8">
  {/* PRIMARY BUTTON */}
  <button className="group flex items-center gap-2 rounded-full bg-primary-accent px-5 py-3 transition-all duration-300 hover:scale-[1.02]">
    <span className="text-sm font-semibold text-white md:text-[15px]">
      Make a Booking
    </span>

    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
      <HiArrowUpRight className="text-[15px] text-primary-dark transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </div>
  </button>

  {/* SECONDARY BUTTON */}
  <button className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/10 md:text-[15px]">
    Our Facilities
  </button>
</div>
            </div>

            {/* RIGHT IMAGE AREA */}
            <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl md:min-h-[420px]">
              {/* PLACEHOLDER */}
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-white/20">
                  <div className="h-3 w-3 rounded-full bg-primary-accent" />
                </div>

                <p className="pt-5 text-sm font-medium uppercase tracking-[2px] text-white/40">
                  Add Image Here
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AppointmentCTA;