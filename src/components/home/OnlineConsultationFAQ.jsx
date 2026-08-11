"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Faq from "../../../public/images/NurseF.png";


const faqs = [
  {
    question: "How do I book an online consultation?",
    answer:
      "To book an online consultation, click Book Appointment and sign up using your Google account. During registration, you will be asked to provide your full name, mobile number, and email address. Once you sign up, your secure patient portal will be created, allowing you to book appointments and manage your consultation details. After selecting your preferred consultation service and completing the payment, your appointment will be confirmed.",
  },
  {
    question: "When is my appointment confirmed?",
    answer:
      "Your appointment is confirmed once the payment is successfully completed. You will receive a confirmation on your email.",
  },
  {
    question: "Can I choose between a video and telephone consultation?",
    answer:
      "Yes. Consultations can be conducted via video call or telephone call, depending on your preference and availability.\n\nFor most skin, hair, and nail conditions, video consultation is recommended, as it allows for a better visual assessment. If a video call is not feasible, a telephone consultation can be arranged. You may also be requested to share clear photographs of the affected area before or during the consultation to assist in evaluation.",
  },
  {
    question: "How will I receive the consultation link?",
    answer:
      "Our team will contact you before your scheduled appointment and share the consultation link via WhatsApp. If your registered mobile number is not available on WhatsApp, the consultation link will be shared through SMS or another suitable method.",
  },
  {
    question: "What details do I need while booking?",
    answer:
      "Please keep the following information ready:\n\n● Full Name\n● Mobile Number\n● Email Address (Google account)\nProviding accurate contact details ensures smooth communication regarding your appointment.",
  },
  {
    question: "What should I keep ready before my consultation?",
    answer:
      "For the best consultation experience, please:\n\n● Ensure you have a stable internet connection.\n● Join from a quiet, well-lit place.\n● Keep previous prescriptions and  investigation reports ready for review.",
  },
  {
    question: "What if I face issues while making the payment or booking my appointment?",
    answer:
      "If you experience any difficulty with payment, booking, or accessing your consultation, please contact us using the phone number or email provided on the website. We will be happy to assist you.",
  },
  {
    question: "Can I reschedule my appointment?",
    answer:
      "If you need to reschedule, please contact us as early as possible. Rescheduling requests will be accommodated subject to availability.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Yes. Your personal information and medical details are handled confidentially and are used only for providing your consultation and related healthcare services.",
  },
  {
    question: "How will I receive my prescription?",
    answer:
      "Once your consultation is complete, your prescription  will be uploaded to your patient portal. You can view and download it anytime from your account.",
  },
  {
    question: "Should I upload photographs or medical reports before my consultation?",
    answer:
      "Yes. For the best assessment, we recommend uploading clear photographs of the affected area taken in good natural or bright lighting before your consultation. If you have any previous prescriptions, laboratory reports, biopsy reports, or relevant medical records, please upload them as well. This helps the dermatologist better understand your condition and provide appropriate advice.",
  },
  {
    question: "Does the doctor also provide in-person consultations?",
    answer:
      "Yes. In-person consultations may be available by prior appointment at designated consultation locations. If you wish to schedule a physical consultation, please contact us using the phone number or email provided on the website for availability and appointment details.",
  },
];


const fadeUp = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.25,
    },
  },
};

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
          <motion.div
            className="lg:sticky lg:top-24 h-fit"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p
              className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-[#058FD2]"
              variants={fadeUp}
            >
              FAQs
            </motion.p>

            <motion.h2
              className="max-w-[520px] text-3xl font-semibold leading-tight text-[#131C15] md:text-5xl"
              variants={fadeUp}
            >
              Frequently Asked Questions
            </motion.h2>

            {/* Doctor Image */}
            <motion.div
              className="mt-8 overflow-hidden rounded-[34px]"
              variants={fadeUp}
            >
              <Image
                src={Faq}
                alt="Online Consultation"
                className="h-[420px] w-full object-cover"
                priority
              />
            </motion.div>

            {/* CTA Card */}
            <motion.div
              className=" mt-6 rounded-[34px] bg-[#0F3D73] px-8 py-8"
              variants={fadeUp}
            >
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
            </motion.div>
          </motion.div>

          {/* FAQ List */}
          <motion.div
            className="space-y-4 lg:pr-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {faqs.map((faq, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
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
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OnlineConsultationFAQ;