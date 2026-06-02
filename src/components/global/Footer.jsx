import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

import { HiOutlineArrowUpRight } from "react-icons/hi2";

function Footer() {
  return (
    <>
      <footer className="px-3 pt-20 pb-3 md:px-5 md:pt-10">
        <div className="overflow-hidden rounded-[36px] bg-primary-dark">
          {/* TOP */}
          <div className="border-b border-white/10 p-5 md:p-7 xl:p-10">
            <div className="grid gap-12 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
              {/* LEFT */}
              <div>
                {/* LABEL */}
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-xl">
                  <div className="h-2 w-2 rounded-full bg-primary-accent" />

                  <p className="text-xs font-semibold uppercase tracking-[2px] text-primary-accent">
                    Book Consultation
                  </p>
                </div>

                {/* TITLE */}
                <div className="max-w-[700px] pt-6">
                  <h2 className="text-4xl font-semibold leading-[105%]  text-white md:text-5xl xl:text-6xl">
                    Healthy Skin Starts
                    <span className="block text-primary-accent">
                      With Expert Care
                    </span>
                  </h2>
                </div>
              </div>

              {/* RIGHT */}
              <div className="xl:pl-16">
                <p className="max-w-[520px] text-sm font-medium leading-[190%] text-white/60 md:text-[16px]">
                  Personalized dermatology treatments focused on skin, hair,
                  and nail care with modern clinical expertise and compassionate
                  patient support.
                </p>

                {/* BUTTONS */}
                <div className="flex flex-wrap gap-3 pt-7">
                  <button className="group flex items-center gap-3 rounded-full bg-primary-accent px-5 py-3 transition-all duration-300 hover:bg-white">
                    <p className="text-sm font-semibold text-white transition-all duration-300 group-hover:text-primary-dark">
                      Make a Booking
                    </p>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary-dark transition-all duration-300 group-hover:bg-primary-dark group-hover:text-white">
                      <HiOutlineArrowUpRight className="text-lg" />
                    </div>
                  </button>

                  <button className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-primary-dark">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE */}
          <div className="grid grid-cols-2 gap-12 p-5 md:grid-cols-2 md:p-7 xl:grid-cols-[1fr_0.7fr_0.7fr_0.8fr] xl:p-10">
            {/* BRAND */}
            <div className="col-span-2 md:col-span-1">
              {/* LOGO */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-accent">
                  <p className="text-2xl font-semibold text-white">
                    C
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold tracking-[-1px] text-white">
                    Dr Charu Garg
                  </h3>

                  <p className="pt-1 text-sm font-medium text-white/45">
                    MD Dermatologist
                  </p>
                </div>
              </div>

              {/* TEXT */}
              <p className="max-w-[360px] pt-7 text-sm font-medium leading-[190%] text-white/55">
                Dedicated dermatology care with advanced treatments and a
                patient-first approach focused on healthy skin and confidence.
              </p>

              {/* SOCIALS */}
              <div className="flex gap-3 pt-8">
                <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-all duration-300 hover:bg-primary-accent hover:border-primary-accent">
                  <FaInstagram className="text-lg" />
                </button>

                <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-all duration-300 hover:bg-primary-accent hover:border-primary-accent">
                  <FaFacebookF className="text-base" />
                </button>

                <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-all duration-300 hover:bg-primary-accent hover:border-primary-accent">
                  <FaYoutube className="text-lg" />
                </button>

                <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-all duration-300 hover:bg-primary-accent hover:border-primary-accent">
                  <FaLinkedinIn className="text-base" />
                </button>
              </div>
            </div>

            {/* LINKS */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                Quick Links
              </h3>

              <div className="grid gap-4 pt-7">
                {[
                  "Home",
                  "About Us",
                  "Services",
                  "Our Journey",
                  "Contact Us",
                ].map((item, index) => (
                  <button
                    key={index}
                    className="w-fit text-sm font-medium text-white/55 transition-all duration-300 hover:text-primary-accent"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* SERVICES */}
            <div>
              <h3 className="text-lg font-semibold text-white">
                Treatments
              </h3>

              <div className="grid gap-4 pt-7">
                {[
                  "Hair & Scalp Care",
                  "Acne Treatment",
                  "Pigmentation",
                  "Skin Allergy",
                  "Nail Disorders",
                ].map((item, index) => (
                  <button
                    key={index}
                    className="w-fit text-left text-sm font-medium text-white/55 transition-all duration-300 hover:text-primary-accent"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* CONTACT */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-lg font-semibold text-white">
                Contact Info
              </h3>

              <div className="grid gap-6 pt-7">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[2px] text-white/30">
                    Phone
                  </p>

                  <p className="pt-2 text-sm font-medium text-white/60">
                    +91 98765 43210
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[2px] text-white/30">
                    Email
                  </p>

                  <p className="pt-2 text-sm font-medium text-white/60">
                    info@drcharugarg.com
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[2px] text-white/30">
                    Location
                  </p>

                  <p className="pt-2 text-sm font-medium leading-[180%] text-white/60">
                    Pune, Maharashtra, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="flex flex-col gap-5 border-t border-white/10 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-7 xl:px-10">
            <p className="text-sm font-medium text-white/40">
              © 2026 Dr Charu Garg. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-5">
              <button className="text-sm font-medium text-white/40 transition-all duration-300 hover:text-primary-accent">
                Privacy Policy
              </button>

              <button className="text-sm font-medium text-white/40 transition-all duration-300 hover:text-primary-accent">
                Terms & Conditions
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
