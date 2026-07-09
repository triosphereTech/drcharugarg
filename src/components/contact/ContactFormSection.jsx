"use client";

import { motion } from "framer-motion";
import { HiOutlineMapPin, HiOutlinePhone, HiOutlineEnvelope } from "react-icons/hi2";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 70,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.35,
      staggerChildren: 0.22,
    },
  },
};

const ContactFormSection = () => {
  return (
    <section className="bg-[#f8fbfd] py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#058FD2]/10 text-[#058FD2] text-sm font-medium mb-4">
            Appointment Request
          </span>

          <h2 className="text-3xl md:text-4xl font-semibold text-[#131C15]">
            Send Us a Message
          </h2>

         
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >

          {/* Form Card */}
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-[32px] border border-slate-200 p-6 md:p-8"
          >

            <form className="space-y-5">

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#131C15] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full h-12 px-4 rounded-2xl border border-slate-200 outline-none focus:border-[#058FD2]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#131C15] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    className="w-full h-12 px-4 rounded-2xl border border-slate-200 outline-none focus:border-[#058FD2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#131C15] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full h-12 px-4 rounded-2xl border border-slate-200 outline-none focus:border-[#058FD2]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#131C15] mb-2">
                  Concern
                </label>

                <select className="w-full h-12 px-4 rounded-2xl border border-slate-200 outline-none focus:border-[#058FD2]">
                  <option>Select your concern</option>
                  <option>Skin Concern</option>
                  <option>Hair Fall</option>
                  <option>Nail Disorder</option>
                  <option>Cosmetic Treatment</option>
                  <option>Follow-up Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#131C15] mb-2">
                  Message
                </label>

                <textarea
                  rows={5}
                  placeholder="Tell us about your concern..."
                  className="w-full p-4 rounded-2xl border border-slate-200 outline-none resize-none focus:border-[#058FD2]"
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3.5 rounded-full bg-[#058FD2] text-white font-medium hover:opacity-90 transition"
              >
                Submit Request
              </button>

            </form>
          </motion.div>

          {/* Map + Contact Card */}
          <motion.div variants={fadeUp} className="space-y-6">

            {/* Map */}
            <div className="h-[400px] overflow-hidden rounded-[32px] border border-slate-200 bg-white">
  <iframe
    title="Clinic Location"
    src="https://www.google.com/maps?q=Ahmedabad,Gujarat&output=embed"
    className="h-full w-full border-0"
    loading="lazy"
    allowFullScreen
  />
</div>

            {/* Info Card */}
           <div className="rounded-[32px] border border-slate-200 bg-white p-6">
  <h3 className="mb-5 text-xl font-semibold text-[#131C15]">
    Clinic Information
  </h3>

  <div className="space-y-5">
    <div className="flex gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef7fb]">
        <HiOutlineMapPin className="text-xl text-[#058FD2]" />
      </div>

      <div>
        <p className="font-medium text-[#131C15]">Address</p>
        <p className="mt-1 text-sm text-gray-600">
          Ahmedabad, Gujarat, India
        </p>
      </div>
    </div>

    <div className="flex gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef7fb]">
        <HiOutlinePhone className="text-xl text-[#058FD2]" />
      </div>

      <div>
        <p className="font-medium text-[#131C15]">Phone</p>
        <a
          href="tel:+918460407471"
          className="mt-1 block text-sm text-gray-600 transition-colors hover:text-primary-accent"
        >
          +91 84604 07471
        </a>
      </div>
    </div>

    <div className="flex gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef7fb]">
        <HiOutlineEnvelope className="text-xl text-[#058FD2]" />
      </div>

      <div>
        <p className="font-medium text-[#131C15]">Email</p>
        <a
          href="mailto:teleconsult.drcharugarg@gmail.com"
          className="mt-1 block text-sm text-gray-600 transition-colors hover:text-primary-accent"
        >
          teleconsult.drcharugarg@gmail.com
        </a>
      </div>
    </div>
  </div>
</div>

          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default ContactFormSection;