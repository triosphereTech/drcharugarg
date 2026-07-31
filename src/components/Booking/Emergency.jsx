"use client";

import Link from "next/link";
import {
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineExclamationCircle,
} from "react-icons/hi2";

export default function Emergency() {
  return (
    <section className="px-4 py-10 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-gradient-to-r from-[#0D8CE9] via-[#169BD7] to-[#1E6EB5] p-8 shadow-[0_25px_60px_rgba(13,140,233,0.18)] md:p-12">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          {/* Left */}
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 backdrop-blur-sm">
              <HiOutlineExclamationCircle className="text-xl text-white" />
              <span className="text-sm font-medium tracking-wide text-white">
                Emergency Support
              </span>
            </div>

            <h2 className="text-3xl font-bold leading-tight text-white md:text-5xl">
              Need Immediate
              <br />
              Dermatology Assistance?
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-white/90 md:text-lg">
              If you are experiencing a severe skin reaction, sudden swelling,
              allergic symptoms, or any urgent dermatological concern, please
              contact our clinic immediately. Our team will guide you with the
              appropriate next steps and arrange priority consultation whenever
              possible.
            </p>
          </div>

          {/* Right */}
          <div className="w-full max-w-md rounded-[30px] bg-white p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-primary-dark">
              Emergency Contact
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Reach us directly for urgent assistance during clinic hours.
            </p>

            <div className="mt-6 space-y-4">
              <Link
                href="tel:+919876543210"
                className="flex items-center gap-4 rounded-2xl border border-gray-200 px-5 py-4 transition hover:border-[#0D8CE9] hover:bg-[#F4FAFF]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF6FF]">
                  <HiOutlinePhone className="text-xl text-[#0D8CE9]" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    Emergency Phone
                  </p>

                  <p className="font-semibold text-primary-dark">
                    +91 98765 43210
                  </p>
                </div>
              </Link>

              <Link
                href="mailto:teleconsult.drcharugarg@gmail.com"
                className="flex items-center gap-4 rounded-2xl border border-gray-200 px-5 py-4 transition hover:border-[#0D8CE9] hover:bg-[#F4FAFF]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF6FF]">
                  <HiOutlineEnvelope className="text-xl text-[#0D8CE9]" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    Email Support
                  </p>

                  <p className="font-semibold text-primary-dark">
                    teleconsult.drcharugarg@gmail.com
                  </p>
                </div>
              </Link>
            </div>

            <p className="mt-6 text-xs leading-6 text-gray-500">
              For life-threatening medical emergencies, please contact your
              nearest emergency medical services immediately.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}