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
    <section className="relative overflow-hidden py-10 md:py-20">

      {/* Right Fade — direct child of <section>, so right-0 always lands on the true edge */}
      <div className="hidden lg:block pointer-events-none absolute right-0 top-0 z-20 h-full w-24 md:w-40 bg-linear-to-l from-[#3eabae] via-[#3eabae]/50 to-transparent" />

      <div className="relative mx-auto px-5 md:px-8 lg:px-0">

        {/* Heading */}
        <div className="mx-auto max-w-full text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-[#d8eaf4]/40 bg-white/30 px-4 py-2">

            <div className="h-2 w-2 rounded-full bg-white" />

            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white">
              Testimonials
            </p>

          </div>

          <h2 className="mt-6 text-3xl font-semibold leading-[1.1] text-white md:text-5xl lg:text-[58px]">
            Words from Our Patients
          </h2>

        </div>

        {/* Reviews */}
        <div className="relative mt-5 md:mt-16">

          {/* Mobile: plain swipeable row, no animation. Desktop (lg+): original auto-scrolling marquee */}
          <div className="marquee-wrap overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none">
            <div className="marquee rounded-2xl flex gap-4 lg:gap-6">

              {duplicatedReviews.map((item, index) => (

                <div
                  key={index}
                  className={`snap-start shrink-0 min-w-[250px] max-w-[250px] lg:min-w-[360px] lg:max-w-[360px] rounded-[20px] lg:rounded-[34px] border border-[#dceaf3] bg-[#fbfdfe] p-4 lg:p-7 shadow-[0_10px_40px_rgba(15,23,42,0.04)] transition-all duration-300 lg:hover:-translate-y-1 ${
                    index >= reviews.length ? "hidden lg:block" : ""
                  }`}
                >

                  {/* Quote Icon */}
                  <div className="flex items-center justify-between">

                    <div className="flex h-7 w-7 lg:h-8 lg:w-8 opacity-40 items-center justify-center rounded-2xl text-[#058FD2]">

                      <Quote className="w-5 h-5 lg:w-[27px] lg:h-[27px]" strokeWidth={2} />

                    </div>

                  </div>

                  {/* Review Text */}
                  <p className="mt-4 lg:mt-6 text-sm leading-6 lg:text-[15px] lg:leading-8 text-[#5f6c82]">
                    "{item.review}"
                  </p>

                  {/* Divider */}
                  <div className="mt-4 lg:mt-6 h-px bg-[#e6eef3]" />

                  {/* Bottom */}
                  <div className="mt-4 lg:mt-6 flex items-center justify-between">

                    <div className="flex items-center gap-3 lg:gap-4">

                      {/* Avatar */}
                      <div className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-[#eef7fb] text-base lg:text-lg font-semibold text-[#058FD2]">
                        {item.name.charAt(0)}
                      </div>

                      <div>

                        <h3 className="text-sm lg:text-base font-semibold text-[#131C15]">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-xs lg:text-sm text-[#667085]">
                          Verified Patient
                        </p>

                      </div>

                    </div>

                    {/* Small Quote */}
                    <div className="text-[#058FD2] opacity-60">

                      <Quote
                        className="w-3.5 h-3.5 lg:w-[18px] lg:h-[18px]"
                        strokeWidth={2}
                      />

                    </div>

                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        .marquee-wrap {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .marquee-wrap::-webkit-scrollbar {
          display: none;
        }

        .marquee {
          width: auto;
        }

        @media (min-width: 1024px) {
          .marquee {
            width: max-content;
            animation: scroll 42s linear infinite;
          }

          .marquee:hover {
            animation-play-state: paused;
          }
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