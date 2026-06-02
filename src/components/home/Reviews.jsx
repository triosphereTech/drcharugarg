'use client'

import React from "react";
import { Quote } from "lucide-react";

const reviews = [
  {
    name: "Priya Shah",
    review:
      "Dr. Charu explained my skin condition clearly and the treatment was very effective. The follow-up guidance made a huge difference.",
  },
  {
    name: "Rohan Patel",
    review:
      "Excellent consultation experience. My hair fall reduced significantly after following the prescribed treatment plan.",
  },
  {
    name: "Neha Mehta",
    review:
      "Very professional and knowledgeable. I finally found the right solution for my pigmentation concerns.",
  },
  {
    name: "Karan Desai",
    review:
      "The online consultation was smooth and convenient. Clear diagnosis and practical treatment recommendations.",
  },
  {
    name: "Aarohi Joshi",
    review:
      "Highly satisfied with the care and follow-up support. My skin condition improved steadily over time.",
  },
];

const Reviews = () => {
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="relative overflow-hidden py-20 md:py-28">

      {/* Background */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f8fbfd] to-white" /> */}

      {/* Right Glow */}
      {/* <div className="absolute right-[-120px] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#cdefff] opacity-80 blur-[160px]" /> */}

      <div className="relative mx-auto max-w-[1350px] px-5 md:px-8 lg:px-10">

        {/* Heading */}
        <div className="mx-auto max-w-[820px] text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-[#d8eaf4] bg-white px-4 py-2">

            <div className="h-2 w-2 rounded-full bg-[#058FD2]" />

            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#058FD2]">
              Patient Experiences
            </p>

          </div>

          <h2 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-[#131C15] md:text-5xl lg:text-[58px]">
            Experiences Shared By Our Patients
          </h2>

          <p className="mx-auto mt-6 max-w-[760px] text-[15px] leading-8 text-[#667085] md:text-[17px]">
            Every patient journey is different. These experiences reflect the
            trust patients place in Dr. Charu Garg for thoughtful,
            evidence-based dermatology care.
          </p>

        </div>

        {/* Reviews */}
        <div className="relative mt-16">

          {/* Right Fade Only */}
          <div className="absolute right-[-40] top-0 z-10 h-full w-20    md:w-50 bg-gradient-to-l from-[#EEF7FB] via-[#EEF7FB]/90 to-transparent" />

          <div className="marquee flex gap-6">

            {duplicatedReviews.map((item, index) => (

              <div
                key={index}
                className="
                  min-w-[360px]
                  max-w-[360px]
                  rounded-[34px]
                  border
                  border-[#dceaf3]
                  bg-[#fbfdfe]
                  p-7
                  shadow-[0_10px_40px_rgba(15,23,42,0.04)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
              >

                {/* Quote Icon */}
                <div className="flex items-center justify-between">

                  <div className="flex h-8 w-8 opacity-40 items-center justify-center rounded-2xl text-[#058FD2]">

                    <Quote size={27} strokeWidth={2} />

                  </div>

                </div>

                {/* Review Text */}
                <p className="mt-6 text-[15px] leading-8 text-[#5f6c82]">
                  "{item.review}"
                </p>

                {/* Divider */}
                <div className="mt-6 h-px bg-[#e6eef3]" />

                {/* Bottom */}
                <div className="mt-6 flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    {/* Avatar */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef7fb] text-lg font-semibold text-[#058FD2]">
                      {item.name.charAt(0)}
                    </div>

                    <div>

                      <h3 className="font-semibold text-[#131C15]">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-[#667085]">
                        Verified Patient
                      </p>

                    </div>

                  </div>

                  {/* Small Quote */}
                  <div className="text-[#058FD2] opacity-60">

                    <Quote
                      size={18}
                      strokeWidth={2}
                    />

                  </div>

                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        .marquee {
          width: max-content;
          animation: scroll 42s linear infinite;
        }

        .marquee:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default Reviews;