import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


export const blogs = [
 {
   category: "Pigmentation",
   title:
     "Melasma Explained: Causes, Treatment & Why it Recurs?",
   desc:
     "Melasma is a common pigmentation disorder that causes dark patches on the face. Learn about its causes, treatment options, and why long-term maintenance is essential to prevent recurrence.",
   date: "May 29, 2026",
   image: "https://dermatologyclinics.com.au/wp-content/uploads/2025/06/Enlighten_Pico_Laser_Melasma.webp",
   slug: "melasma-explained",
 },


 {
   category: "Skincare",
   title:
     "The Barrier-First Approach: Why Healthy Skin Starts with a Strong Barrier",
   desc:
     "Discover why modern skincare should begin with protecting and repairing the skin barrier. Learn what damages the barrier, warning signs to watch for, and a simple barrier-first routine.",
   date: "May 29, 2026",
   image: "https://knottstdermatology.com/wp-content/uploads/2023/06/shutterstock_1377024203-scaled.jpg",
   slug: "barrier-first-approach",
 },


 {
   category: "Pediatric Dermatology",
   title:
     "Understand Pediatric Atopic Dermatitis: A Parent's Guide to Childhood Eczema",
   desc:
     "Learn about pediatric atopic dermatitis, its causes, symptoms, common triggers, and treatment options. A practical guide to help parents recognize and manage childhood eczema effectively.",
   date: "May 29, 2026",
   image: "https://www.aap.org/globalassets/patient-care/atopic-dermatitis/atopic-dermatits-image.jpg",
   slug: "understand-pediatric-atopic-dermatitis",
 },
];


const LatestArticles = () => {
 return (
   <section className="px-4 pt-10 md:px-5 md:pt-20">
     <div>
       {/* Header */}
       <div className="mb-10 flex flex-col items-center justify-center gap-6 text-center md:mb-14 md:flex-row md:items-center md:justify-center">
  <div className="flex flex-col gap-5">
    <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-[#058FD2]">
      Latest Articles
    </p>

    <h2 className="text-3xl lg:text-5xl font-semibold leading-tight text-[#131C15]">
      Our Blogs
    </h2>
     <button className="group flex items-center gap-2 rounded-full border border-[#dbe5ea] bg-white px-5 py-3 text-sm font-medium text-[#131C15] transition-all duration-300 hover:border-[#058FD2] hover:text-[#058FD2]">
    View All Articles

    <ArrowRight
      size={16}
      className="transition-transform duration-300 group-hover:translate-x-1"
    />
  </button>
  </div>

 
</div>


       {/* Cards */}
       <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
         {blogs.map((blog, index) => (
           <Link
             href={blog.slug}
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
                 <Link href={blog.slug} > <ArrowRight  size={16} /> </Link>
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
           </Link>
         ))}
       </div>
     </div>
   </section>
 );
};


export default LatestArticles;