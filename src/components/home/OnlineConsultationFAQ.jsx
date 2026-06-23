"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "How can I book an online dermatologist consultation?",
    answer:
      "You can book your online dermatologist consultation by filling in your details on our website and completing the payment. Once confirmed, you will receive all consultation details on your registered email.",
  },
  {
    question: "How does the teleconsultation process work?",
    answer:
      "After booking, you will receive a secure consultation link via email. At your scheduled time, simply click the link to join your online consultation from your phone or laptop.",
  },
  {
    question: "Will I receive confirmation after booking my appointment?",
    answer:
      "Yes, once your booking is successful, a confirmation email with your appointment details and consultation link will be sent to your registered email address.",
  },
  {
    question: "Is my personal and medical data safe?",
    answer:
      "Absolutely. Your information is securely stored and kept confidential, ensuring privacy and continuity of care for future consultations and follow-ups.",
  },
  {
    question: "How will I receive my prescription after consultation?",
    answer:
      "After your consultation, a digital prescription will be generated. You can download your prescription instantly for easy access and future reference.",
  },
  {
    question: "How long is the follow-up consultation valid?",
    answer:
      "Your follow-up consultation is valid for 1 month from your initial appointment. After this period, a new consultation will be required for further evaluation and treatment.",
  },
  {
    question: "Can I contact for follow-up during this period?",
    answer:
      "Yes, you can reach out for follow-up queries within 1 month as guided during your consultation, ensuring proper treatment continuity.",
  },
];

const OnlineConsultationFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative px-4 pt-10 md:px-5 md:pt-20">
      {/* Soft Background */}
      <div className="absolute left-0 top-0 h-[320px] w-[320px] rounded-full bg-[#eef7fb] blur-[90px]" />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid items-start gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 xl:gap-20">
          {/* Left Content */}
          {/* Left Content */}
          <div className="lg:sticky lg:top-24 h-fit">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-[#058FD2]">
              Frequently Asked Questions
            </p>

            <h2 className="max-w-[520px] text-3xl font-semibold leading-tight text-[#131C15] md:text-5xl">
              Online Dermatology Consultation
            </h2>

            <p className="mt-6 max-w-[500px] text-[15px] leading-8 text-[#667085] md:text-base">
              Our online dermatologist consultation service is designed to
              provide convenient, secure, and expert skin, hair, and nail care
              from the comfort of your home.
            </p>

            {/* CTA Main Card */}
            <div className="relative mt-10 overflow-hidden rounded-[32px] border border-[#d9ebf4] bg-linear-to-tr from-primary-accent to-primary-accent/70 p-7">
              {/* Decorative Blur */}
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#058FD2]/10 blur-3xl" />

              <div className="relative z-10">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#058FD2] shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-7 w-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 6.75V4.5m7.5 2.25V4.5M3.75 9.75h16.5M6 3.75h12A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75z"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-semibold leading-snug text-[#ffffff]">
                  Book Your Online Consultation Today
                </h3>

                <p className="mt-4 text-[15px] leading-7 text-[#ffffff]">
                  Connect with Dr. Charu Garg from anywhere for expert
                  dermatology guidance, personalized treatment plans, and secure
                  follow-up care.
                </p>

                {/* Mini Features */}
                {/* <div className="mt-6 flex flex-wrap gap-3">
        <div className="rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-medium text-[#131C15] backdrop-blur-xl">
          Secure Consultation
        </div>

        <div className="rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-medium text-[#131C15] backdrop-blur-xl">
          Digital Prescription
        </div>

        <div className="rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-medium text-[#131C15] backdrop-blur-xl">
          1 Month Follow-Up
        </div>
      </div> */}

                {/* CTA Button */}
                <br/>
                <Link href="/book-appointment" className="mt-7 w-full rounded-full bg-[#131C15] px-6 py-3 text-sm font-medium text-white transition-all duration-300 active:scale-95 cursor-pointer">
                  Book Appointment Now
                </Link>
              </div>
            </div>

            {/* Bottom Floating Stats */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-[#e6edf2] bg-white p-5">
                <p className="text-3xl font-semibold text-[#131C15]">5000+</p>

                <p className="mt-2 text-sm leading-6 text-[#667085]">
                  Successful online consultations with personalized care.
                </p>
              </div>

              <div className="rounded-[24px] border border-[#e6edf2] bg-white p-5">
                <p className="text-3xl font-semibold text-[#131C15]">24/7</p>

                <p className="mt-2 text-sm leading-6 text-[#667085]">
                  Hassle-free appointment booking and secure support.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-4 lg:pr-2">
            {faqs.map((faq, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={index}
                  className={`overflow-hidden rounded-[28px] border transition-all duration-500 ${
                    isActive
                      ? "border-[#cfe9f5] bg-[#eef7fb]"
                      : "border-[#e7edf1] bg-white hover:border-[#d7e7f0]"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left sm:px-6 md:px-7"
                  >
                    <div>
                      <div className="mb-3 flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 ${
                            isActive
                              ? "bg-[#058FD2] text-white"
                              : "bg-[#f4f7f9] text-[#058FD2]"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        {/* <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#7b8794]">
                          Consultation FAQ
                        </span> */}
                      </div>

                      <h3 className="max-w-[92%] text-[17px] font-semibold leading-[1.7] text-[#131C15] sm:text-[18px] md:text-[20px]">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`mt-1 flex h-11 w-11 min-w-[44px] items-center justify-center rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-[#058FD2] text-white"
                          : "bg-[#f4f7f9] text-[#131C15]"
                      }`}
                    >
                      {isActive ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ${
                      isActive
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-[#dcebf3] px-6 pb-7 pt-5 md:px-7">
                        <p className="max-w-full text-[14px] leading-7 text-[#5f6b76] sm:text-[15px] sm:leading-8">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnlineConsultationFAQ;
