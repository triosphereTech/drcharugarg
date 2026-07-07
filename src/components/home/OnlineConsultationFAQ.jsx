"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Faq from "../../../public/images/Faq.png";

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
          <div className="lg:sticky lg:top-24 h-fit">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-[#058FD2]">
              FAQs
            </p>

            <h2 className="max-w-[520px] text-3xl font-semibold leading-tight text-[#131C15] md:text-5xl">
              Frequently Asked Questions
            </h2>

            {/* Doctor Image */}
            <div className="mt-8 overflow-hidden rounded-[34px]">
              <Image
                src={Faq}
                alt="Online Consultation"
                className="h-[420px] w-full object-cover"
                priority
              />
            </div>

            {/* CTA Card */}
            <div className=" mt-6 rounded-[34px] bg-[#0F3D73] px-8 py-8">
              <h3 className="text-3xl font-semibold text-white">
                Any Inquiries?
              </h3>

              <p className="mt-3 text-[17px] text-white/75">
                Reach out for expert care
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/book-appointment"
                  className="flex-1 rounded-full bg-[#57C3BE] px-6 py-4 text-center text-base font-medium text-white transition hover:bg-[#49b3ae]"
                >
                  Make Booking
                </Link>

                <Link
                  href="/contact"
                  className="flex-1 rounded-full border border-white/25 bg-white/10 px-6 py-4 text-center text-base font-medium text-white backdrop-blur transition hover:bg-white hover:text-[#0F3D73]"
                >
                  Contact Us
                </Link>
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
