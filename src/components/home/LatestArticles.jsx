import React from "react";
import { ArrowRight } from "lucide-react";

const blogs = [
  {
    category: "Nail Care",
    title:
      "Step Into Comfort: Comprehensive Care for Ingrown Toenails at Dr. Charu Garg",
    desc:
      "An ingrown toenail, or onychocryptosis, occurs when the edge of the toenail grows into the surrounding skin. It is a common condition...",
    date: "Dec 15, 2024",
    image:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    category: "Hair Care",
    title:
      "Hair Fall Unveiled: Understanding Causes, Conditions, and Advanced Treatments",
    desc:
      "Hair fall is one of the most common concerns that brings patients to dermatology clinics. Whether it is gradual thinning or sudden...",
    date: "Dec 10, 2024",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
  },
  {
    category: "Skin Care",
    title:
      "From Scars to Confidence: Cutting-Edge Scar Management at Dr. Charu Garg",
    desc:
      "Scars tell a story — a story of healing, survival, or even transformation. While some scars are embraced as symbols of strength...",
    date: "Dec 5, 2024",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
  },
];

const LatestArticles = () => {
  return (
    <section className="px-3 pt-10 md:px-5 md:pt-20">
      <div>
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-[#058FD2]">
              Latest Articles
            </p>

            <h2 className="max-w-[620px] text-3xl font-semibold leading-tight text-[#131C15] md:text-5xl">
              Our Blogs
            </h2>
          </div>

          <button className="group flex w-fit items-center gap-2 rounded-full border border-[#dbe5ea] bg-white px-5 py-3 text-sm font-medium text-[#131C15] transition-all duration-300 hover:border-[#058FD2] hover:text-[#058FD2]">
            View All Articles

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="group rounded-[32px] border border-[#e7edf1] bg-white p-3 transition-all duration-500 hover:-translate-y-1 hover:border-[#d6eaf5] hover:shadow-[0_25px_70px_rgba(16,24,40,0.07)]"
            >
              {/* Image Wrapper */}
              <div className="relative overflow-hidden rounded-[24px]">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-[250px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                {/* Category */}
                <div className="absolute left-4 top-4 rounded-full border border-white/40 bg-white/80 px-4 py-2 backdrop-blur-xl">
                  <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#058FD2]">
                    {blog.category}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="px-3 pb-3 pt-6">
                {/* Meta */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef7fb] text-sm font-semibold text-[#058FD2]">
                      CG
                    </div>

                    <div>
                      <p className="text-sm font-medium text-[#131C15]">
                        Dr. Charu Garg
                      </p>

                      <p className="text-xs text-[#7b8794]">{blog.date}</p>
                    </div>
                  </div>

                  <div className="flex h-10 w-10 -rotate-30 items-center justify-center rounded-full bg-[#eef7fb] text-[#058FD2] transition-all duration-300 group-hover:bg-[#058FD2] group-hover:text-white">
                    <ArrowRight  size={16} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="mb-4 line-clamp-3 text-[24px] font-semibold leading-[1.45] tracking-[-0.02em] text-[#131C15] transition-colors duration-300 group-hover:text-[#058FD2]">
                  {blog.title}
                </h3>

                {/* Desc */}
                <p className="mb-7 line-clamp-3 text-[15px] leading-7 text-[#667085]">
                  {blog.desc}
                </p>

               
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;