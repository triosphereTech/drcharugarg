"use client";

import { motion } from "framer-motion";

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
    <>
    <div className="bg-linear-to-b from-white to-[#eef7fb] mx-auto">
      {/* Section Header */}
      <motion.div
        className="text-center max-w-2xl mx-auto pt-5 mb-12"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <p className="text-sm font-medium uppercase tracking-wider text-[#058FD2] mb-3">
          Appointment Request
        </p>

        <h2 className="text-3xl md:text-4xl font-semibold text-[#131C15]">
          Send Us a Message
        </h2>
      </motion.div>

      {/* Map and form */}
      <motion.div
        className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
        <motion.div
          variants={fadeUp}
          className="overflow-hidden rounded-[32px] border border-slate-200 bg-white p-3 shadow-sm"
        >
          <iframe
            title="Map to R-119, New Colony, Palwal"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14074.142302568447!2d77.31848154215658!3d28.130179672559585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cd255e30636d1%3A0x8fec3b19fe3d825e!2sNew%20Colony%2C%20Palwal%2C%20Haryana%20121102!5e0!3m2!1sen!2sin!4v1793019625479!5m2!1sen!2sin"
            className="h-[320px] w-full rounded-3xl border-0 sm:h-[400px] lg:h-full lg:min-h-[620px]"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </motion.div>
        <motion.div
          variants={fadeUp}
          className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8 lg:p-10"
        >
          <form className="space-y-5">
            {/* Name + Phone */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#131C15] mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full h-12 px-4 rounded-2xl border border-slate-200 outline-none focus:border-[#058FD2] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#131C15] mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full h-12 px-4 rounded-2xl border border-slate-200 outline-none focus:border-[#058FD2] transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#131C15] mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter email address"
                className="w-full h-12 px-4 rounded-2xl border border-slate-200 outline-none focus:border-[#058FD2] transition-colors"
              />
            </div>

            {/* Concern */}
            <div>
              <label className="block text-sm font-medium text-[#131C15] mb-2">
                Concern
              </label>

              <select className="w-full h-12 px-4 rounded-2xl border border-slate-200 outline-none focus:border-[#058FD2] transition-colors bg-white">
                <option>Select your concern</option>
                <option>Skin Concern</option>
                <option>Hair Fall</option>
                <option>Nail Disorder</option>
                <option>Cosmetic Treatment</option>
                <option>Follow-up Consultation</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-[#131C15] mb-2">
                Message
              </label>

              <textarea
                rows={5}
                placeholder="Tell us about your concern..."
                className="w-full p-4 rounded-2xl border border-slate-200 outline-none resize-none focus:border-[#058FD2] transition-colors"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3.5 rounded-full bg-[#058FD2] text-white font-medium hover:opacity-90 transition"
            >
              Submit Request
            </button>
          </form>
        </motion.div>
        </div>
      </motion.div>
      </div>
    </>
  );
};

export default ContactFormSection;
