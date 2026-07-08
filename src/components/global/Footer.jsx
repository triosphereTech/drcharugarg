import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import Logo from "../../../public/images/brand/WebsiteFooterLogo.png";
import Link from "next/link";
import localFont from "next/font/local";
// import F from "../../../public/font/"

const appleChancery = localFont({
  src: "../../../public/font/AppleChancery.ttf",
  variable: "--font-apple-chancery",
});

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Our Facilities",
    href: "/#services",
  },
  {
    label: "FAQs",
    href: "/#faqs",
  },
  {
    label: "Blogs",
    href: "/#blogs",
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
];

import { HiOutlineArrowUpRight } from "react-icons/hi2";

function Footer() {
  const socialLinks = [
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/dr.charugarg_md/",
      label: "Instagram",
    },
    {
      icon: FaYoutube,
      href: "https://www.youtube.com/@dr.charugarg_md",
      label: "YouTube",
    },
    {
      icon: FaLinkedinIn,
      href: "https://www.linkedin.com/in/charu-garg-166b311a1?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      label: "LinkedIn",
    },
  ];

  return (
    <>
      <footer className="px-3 pt-5 pb-3 md:px-5 md:pt-10">
        <div className="overflow-hidden rounded-[36px] bg-white border border-gray-100">
          {/* MIDDLE */}
          <div className="grid gap-12 p-5 md:p-7 lg:grid-cols-[1fr_1fr] lg:p-10">
            {/* BRAND */}
            <div>
              {/* LOGO */}
              <div className="flex items-center gap-4">
                <img
                  src={Logo.src}
                  alt="Dr Charu Garg"
                  className="h-52 w-fit object-cover"
                />
              </div>
              <p
                className={`${appleChancery.className} mt-3 text-xl text-[#007997]`}
              >
                Where skin finds its true balance
              </p>
              {/* SOCIALS */}
              <div className="grid w-fit grid-cols-4 gap-3 pt-5 ml-14 lg:ml-10">
                {socialLinks.map(({ icon: Icon, href, label }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-400 text-gray-700 transition-all duration-300 hover:border-primary-accent hover:bg-primary-accent hover:text-white">
                    <Icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="grid grid-cols-2 gap-6 md:gap-12 md:grid-cols-2">
              {/* QUICK LINKS */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Quick Links
                </h3>

                <div className="grid gap-4 pt-7">
                  {navLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="w-fit text-md font-medium text-gray-600 transition-all duration-300 hover:text-primary-accent"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* CONTACT */}
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

      <a
        href="tel:+918460407471"
        className="pt-2 text-md font-medium text-gray-600 transition-colors hover:text-primary-accent"
      >
        +91 84604 07471
      </a>
    </div>

    <div>
  <p className="text-sm font-semibold uppercase tracking-[2px] text-gray-400">
    Email
  </p>

  <a
    href="mailto:teleconsult.drcharugarg@gmail.com"
    className="mt-2 block max-w-full break-all text-md font-medium text-gray-600 transition-colors hover:text-primary-accent"
  >
    teleconsult.drcharugarg@gmail.com
  </a>
</div>

    <div>
      <p className="text-sm font-semibold uppercase tracking-[2px] text-gray-400">
        Location
      </p>

      <p className="pt-2 text-md font-medium leading-[180%] text-gray-600">
        Ahmedabad, Gujarat
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