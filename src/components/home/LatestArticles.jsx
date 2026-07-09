"use client";

import { motion } from "framer-motion";
import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.25,
      staggerChildren: 0.18,
    },
  },
};

const cardVariant = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const blogs = [
  {
    category: "Pigmentation",
    title: "Melasma Explained: Causes, Treatment & Why it Recurs?",
    desc: "Melasma is a common pigmentation disorder that causes dark patches on the face. Learn about its causes, treatment options, and why long-term maintenance is essential to prevent recurrence.",
    date: "May 29, 2026",
    image: "/images/blog/b1/front.png",
    slug: "/blogs/melasma-explained-causes-treatment-why-it-recurs",
  },
  {
    category: "Skincare",
    title:
      "The Barrier-First Approach: Why Healthy Skin Starts with a Strong Barrier",
    desc: "Discover why modern skincare should begin with protecting and repairing the skin barrier. Learn what damages the barrier, warning signs to watch for, and a simple barrier-first routine.",
    date: "May 29, 2026",
    image: "/images/blog/b2/front.png",
    slug: "/blogs/the-barrier-first-approach",
  },
  {
    category: "Pediatric Dermatology",
    title:
      "Understand Pediatric Atopic Dermatitis: A Parent's Guide to Childhood Eczema",
    desc: "Learn about pediatric atopic dermatitis, its causes, symptoms, common triggers, and treatment options. A practical guide to help parents recognize and manage childhood eczema effectively.",
    date: "May 29, 2026",
    image: "/images/blog/b3/front.png",
    slug: "/blogs/understand-pediatric-atopic-dermatitis",
  },
];

const LatestArticles = () => {
  return (
    <section className="px-0 mt-10 md:px-5 md:pt-0">
      <div>
        {/* Header */}
        <motion.div
          className="flex flex-col items-center justify-center text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="mb-6 text-4xl md:text-5xl font-semibold leading-tight text-white lg:text-5xl">
            Our Blogs
          </span>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {blogs.map((blog, index) => (
            <motion.div key={index} variants={cardVariant}>
              <Link
                href={blog.slug}
                className="group min-h-[600px] block rounded-[32px] border border-[#e7edf1] bg-white/70 p-3 transition-all duration-500 hover:-translate-y-1 hover:border-[#d6eaf5] hover:shadow-[0_25px_70px_rgba(16,24,40,0.07)]"
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
                      <ArrowRight size={16} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 line-clamp-3 text-[24px] font-semibold leading-[1.45] tracking-[-0.02em] text-[#131C15] transition-colors duration-300 group-hover:text-[#058FD2]">
                    {blog.title}
                  </h3>

                  {/* Desc */}
                  <p className="mb-0 line-clamp-3 text-[14px] leading-7 text-[#667085]">
                    {blog.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LatestArticles;