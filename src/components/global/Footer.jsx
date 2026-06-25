import Link from "next/link";
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
        <div className="overflow-hidden rounded-[36px] bg-white border border-gray-100">
          {/* TOP */}
          <div className="border-b border-gray-100 px-10 pb-10">
            <div className="grid gap-12 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
              {/* LEFT */}
            
                {/* TITLE */}
               <h2 className="text-4xl font-semibold leading-[105%] text-gray-900 md:text-2xl xl:text-4xl">
  Healthy Skin Starts With{" "}
  <span className="text-primary-accent">Expert Care</span>
</h2>
             

              {/* RIGHT */}
              <div className="xl:pl-16">
               

                {/* BUTTONS */}
                <div className="flex flex-wrap gap-3 pt-7">
                  <Link href="/book-appointment" className="group flex items-center gap-3 rounded-full bg-primary-accent px-5 py-3 transition-all duration-300 hover:bg-primary-dark">
                    <p className="text-md font-semibold text-white">
                      Make a Booking
                    </p>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary-accent transition-all duration-300 group-hover:bg-primary-dark group-hover:text-white">
                      <HiOutlineArrowUpRight className="text-lg" />
                    </div>
                  </Link>

                  <Link href="/contact" className="rounded-full border border-gray-200 px-5 py-3 text-lg items-center font-semibold text-gray-800 transition-all duration-300 hover:bg-gray-900 hover:text-white">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE */}
          <div className="grid gap-12 p-5 md:p-7 xl:grid-cols-[1fr_1fr] xl:p-10">
  {/* BRAND */}
  <div>
    {/* LOGO */}
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-accent">
        <p className="text-2xl font-semibold text-white">C</p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold tracking-[-1px] text-gray-900">
          Dr Charu Garg
        </h3>

        <p className="pt-1 text-sm font-medium text-gray-400">
          MD Dermatologist
        </p>
      </div>
    </div>

   

    {/* SOCIALS */}
    <div className="grid w-fit grid-cols-4 gap-3 pt-8">
      {[FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn].map(
        (Icon, i) => (
          <button
            key={i}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-400 text-gray-700 transition-all duration-300 hover:border-primary-accent hover:bg-primary-accent hover:text-white"
          >
            <Icon className="text-lg" />
          </button>
        )
      )}
    </div>
  </div>

  {/* RIGHT SIDE */}
  <div className="grid gap-12 md:grid-cols-2">
    {/* QUICK LINKS */}
    <div>
      <h3 className="text-xl font-semibold text-gray-900">
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
            className="w-fit text-md font-medium text-gray-600 transition-all duration-300 hover:text-primary-accent"
          >
            {item}
          </button>
        ))}
      </div>
    </div>

    {/* CONTACT */}
    <div>
      <h3 className="text-xl font-semibold text-gray-900">
        Contact Info
      </h3>

      <div className="grid gap-6 pt-7">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[2px] text-gray-400">
            Phone
          </p>

          <p className="pt-2 text-md font-medium text-gray-600">
            +91 98765 43210
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[2px] text-gray-400">
            Email
          </p>

          <p className="pt-2 text-md font-medium text-gray-600">
            info@drcharugarg.com
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[2px] text-gray-400">
            Location
          </p>

          <p className="pt-2 text-md font-medium leading-[180%] text-gray-600">
            Pune, Maharashtra, India
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

          {/* BOTTOM */}
          <div className="flex flex-col gap-5 border-t border-gray-100 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-7 xl:px-10">
            <p className="text-sm font-medium text-gray-300">
              © 2026 Dr Charu Garg. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-5">
              <button className="text-sm font-medium text-gray-300 transition-all duration-300 hover:text-primary-accent">
                Privacy Policy
              </button>
              <button className="text-sm font-medium text-gray-300 transition-all duration-300 hover:text-primary-accent">
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