"use client";

import { HiOutlineMapPin, HiOutlinePhone, HiOutlineEnvelope } from "react-icons/hi2";

const ContactFormSection = () => {
  return (
    <section className="bg-[#f8fbfd] py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#058FD2]/10 text-[#058FD2] text-sm font-medium mb-4">
            Appointment Request
          </span>

          <h2 className="text-3xl md:text-4xl font-semibold text-[#131C15]">
            Send Us a Message
          </h2>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Have questions about a treatment or want to schedule a consultation?
            Fill out the form below and our team will get back to you shortly.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">

          {/* Form Card */}
          <div className="bg-white rounded-[32px] border border-slate-200 p-6 md:p-8">

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
          </div>

          {/* Map + Contact Card */}
          <div className="space-y-6">

            {/* Map */}
            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white h-[400px]">

              <iframe
                title="Clinic Location"
                src="https://www.google.com/maps/embed?pb="
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>

            {/* Info Card */}
            <div className="bg-white rounded-[32px] border border-slate-200 p-6">

              <h3 className="text-xl font-semibold text-[#131C15] mb-5">
                Clinic Information
              </h3>

              <div className="space-y-5">

                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#eef7fb] flex items-center justify-center">
                    <HiOutlineMapPin className="text-[#058FD2] text-xl" />
                  </div>

                  <div>
                    <p className="font-medium text-[#131C15]">Address</p>
                    <p className="text-gray-600 text-sm mt-1">
                      Your Clinic Address Here
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#eef7fb] flex items-center justify-center">
                    <HiOutlinePhone className="text-[#058FD2] text-xl" />
                  </div>

                  <div>
                    <p className="font-medium text-[#131C15]">Phone</p>
                    <p className="text-gray-600 text-sm mt-1">
                      +91 98765 43210
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#eef7fb] flex items-center justify-center">
                    <HiOutlineEnvelope className="text-[#058FD2] text-xl" />
                  </div>

                  <div>
                    <p className="font-medium text-[#131C15]">Email</p>
                    <p className="text-gray-600 text-sm mt-1">
                      care@drcharugarg.com
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;