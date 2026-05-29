"use client";


import Image from "next/image";
import { motion } from "framer-motion";
import {
 HiShieldCheck,
 HiSparkles,
 HiBookOpen,
 HiArrowRight,
 HiHeart,
} from "react-icons/hi2";
import Barrier from "../../../public/images/blog/barrier.png"


const BlogTwo = () => {
 return (
   <main className="bg-[#fafafa] overflow-hidden">


     {/* ================= HERO ================= */}


     <section className="relative h-[80vh] min-h-[650px] overflow-hidden">

{/* 
       <Image
         src="/images/blogs/skin-barrier-banner.jpg"
         alt="The Barrier First Approach"
         fill
         priority
         className="object-cover"
       /> */}


       <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/65 to-[#058FD2]/20" />


       <div className="absolute inset-0">
         <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-full">


           <div className="flex items-center h-full">


             <div className="max-w-5xl">


               <motion.span
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl px-4 py-2 text-sm font-medium text-white"
               >
                 Skin Barrier Health
               </motion.span>


               <motion.h1
                 initial={{ opacity: 0, y: 25 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="mt-6 text-white text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]"
               >
                 The Barrier-First
                 <br />
                 Approach
               </motion.h1>


               <motion.p
                 initial={{ opacity: 0, y: 25 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="mt-8 max-w-3xl text-lg md:text-xl leading-8 text-white/80"
               >
                 Modern skincare often focuses on strong ingredients and quick
                 results. But healthy skin starts with something more
                 fundamental — a strong skin barrier.
               </motion.p>


               <motion.div
                 initial={{ opacity: 0, y: 25 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 }}
                 className="mt-10 inline-flex flex-wrap items-center gap-5 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl px-5 py-4 text-white"
               >
                 <div>
                   <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                     Author
                   </p>
                   <p className="mt-1 font-medium">
                     Dr. Charu Garg
                   </p>
                 </div>


                 <div className="hidden sm:block w-px h-10 bg-white/20" />


                 <div>
                   <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                     Read Time
                   </p>
                   <p className="mt-1 font-medium">
                     7 Minutes
                   </p>
                 </div>


                 <div className="hidden sm:block w-px h-10 bg-white/20" />


                 <div>
                   <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                     Category
                   </p>
                   <p className="mt-1 font-medium">
                     Skincare Fundamentals
                   </p>
                 </div>
               </motion.div>


             </div>


           </div>


         </div>
       </div>
     </section>


     {/* ================= INTRO CARD ================= */}


     <section className="relative -mt-20 z-20">
       <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">


         <div className="rounded-[36px] border border-slate-200 bg-white mt-20 md:mt-0 p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">


           <div className="max-w-5xl">


             <div className="border-l-[3px] border-[#058FD2] pl-6">


               <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#131C15]">
                 Healthy Skin Starts With A Healthy Barrier
               </h2>


               <p className="mt-4 text-lg md:text-xl leading-relaxed text-slate-600">
                 Before adding more active ingredients, your skin needs a
                 strong foundation. Barrier-first skincare focuses on
                 protecting and repairing your skin’s natural defense system.
               </p>


             </div>


             <div className="mt-10 space-y-7 text-lg leading-8 text-slate-600">


               <p>
                 Modern skincare today often focuses on strong ingredients and
                 quick results. People use acids, retinol, and multiple
                 products in the hope of faster transformation.
               </p>


               <p>
                 But one very important thing is often ignored — your skin
                 barrier.
               </p>


               <p>
                 Barrier-first skincare simply means taking care of your skin’s
                 natural protective layer before using strong treatments.
                 Instead of overloading your skin with too many actives, this
                 approach focuses on keeping your skin healthy and protected.
               </p>


             </div>


           </div>


         </div>


       </div>
     </section>


     {/* ================= ARTICLE ================= */}


     <section className="py-20 md:py-28">
       <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">


         {/* ================= WHY IT MATTERS ================= */}


         <div>


           <div className="mb-14">


             <div className="flex items-center gap-3">
               <div className="w-10 h-[2px] bg-[#058FD2]" />


               <span className="text-sm font-medium uppercase tracking-[0.25em] text-[#058FD2]">
                 Section 01
               </span>
             </div>


             <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[#131C15]">
               Why Barrier-First Skincare Matters
             </h2>


             <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">
               When your skin barrier is functioning properly, everything else
               works better. Your skin becomes more resilient, comfortable and
               balanced.
             </p>


           </div>


           <div className="grid md:grid-cols-3 gap-6">


             <motion.div
               whileHover={{ y: -5 }}
               className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)]"
             >
               <div className="w-14 h-14 rounded-2xl bg-[#eef7fb] flex items-center justify-center">
                 <HiSparkles className="text-2xl text-[#058FD2]" />
               </div>


               <h3 className="mt-6 text-xl font-semibold text-[#131C15]">
                 Better Moisture Retention
               </h3>


               <p className="mt-4 text-slate-600 leading-8">
                 A healthy barrier helps your skin hold onto moisture and stay
                 hydrated throughout the day.
               </p>
             </motion.div>


             <motion.div
               whileHover={{ y: -5 }}
               className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)]"
             >
               <div className="w-14 h-14 rounded-2xl bg-[#eef7fb] flex items-center justify-center">
                 <HiShieldCheck className="text-2xl text-[#058FD2]" />
               </div>


               <h3 className="mt-6 text-xl font-semibold text-[#131C15]">
                 Protection From Irritation
               </h3>


               <p className="mt-4 text-slate-600 leading-8">
                 It acts as a protective shield against pollution, irritants,
                 bacteria and environmental stressors.
               </p>
             </motion.div>


             <motion.div
               whileHover={{ y: -5 }}
               className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)]"
             >
               <div className="w-14 h-14 rounded-2xl bg-[#eef7fb] flex items-center justify-center">
                 <HiHeart className="text-2xl text-[#058FD2]" />
               </div>


               <h3 className="mt-6 text-xl font-semibold text-[#131C15]">
                 Balanced Skin Function
               </h3>


               <p className="mt-4 text-slate-600 leading-8">
                 Healthy skin appears smoother, calmer, less reactive and more
                 resistant to damage.
               </p>
             </motion.div>


           </div>


         </div>


         {/* ================= WHAT IS SKIN BARRIER ================= */}


         <section className="mt-28">


           <div className="mb-14">


             <div className="flex items-center gap-3">
               <div className="w-10 h-[2px] bg-[#058FD2]" />


               <span className="text-sm font-medium uppercase tracking-[0.25em] text-[#058FD2]">
                 Section 02
               </span>
             </div>


             <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[#131C15]">
               What The Skin Barrier Actually Is
             </h2>


             <p className="mt-5 max-w-5xl text-lg leading-8 text-slate-600">
               Your skin barrier is the outermost layer of your skin — the part
               that faces the outside world every day.
             </p>


           </div>


           <div className="grid lg:grid-cols-2 gap-8 items-center">


             <div className="rounded-[36px] border border-slate-200 bg-white p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">


               <div className="flex items-center gap-3">
                 <HiBookOpen className="text-[#058FD2] text-xl" />


                 <h3 className="text-2xl font-semibold text-[#131C15]">
                   Think Of It As Your Skin's Shield
                 </h3>
               </div>


               <div className="mt-6 space-y-5 text-slate-600 leading-8">


                 <p>
                   It protects your body from pollution, dirt, bacteria and
                   environmental irritation.
                 </p>


                 <p>
                   Dermatologists often explain it using a simple concept
                   called the <strong>"Brick & Cement"</strong> model.
                 </p>


                 <p>
                   Your skin cells act like bricks, while natural oils act as
                   the cement holding everything together.
                 </p>


               </div>


             </div>


             {/* BRICK & CEMENT VISUAL */}


             <div className="rounded-[36px] bg-[#eef7fb] p-8 md:p-10">


               <div className="space-y-5">


                 <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
                   <p className="text-xs uppercase tracking-[0.2em] text-[#058FD2]">
                     Bricks
                   </p>


                   <h4 className="mt-2 text-2xl font-semibold text-[#131C15]">
                     Skin Cells
                   </h4>
                 </div>


                 <div className="flex justify-center">
                   <div className="w-px h-8 bg-[#058FD2]" />
                 </div>


                 <div className="rounded-3xl bg-white p-6 text-center shadow-sm">


                   <p className="text-xs uppercase tracking-[0.2em] text-[#058FD2]">
                     Cement
                   </p>


                   <h4 className="mt-2 text-2xl font-semibold text-[#131C15]">
                     Natural Lipids
                   </h4>


                   <div className="mt-4 flex flex-wrap justify-center gap-2">


                     <span className="rounded-full bg-[#eef7fb] px-3 py-1 text-sm">
                       Ceramides
                     </span>


                     <span className="rounded-full bg-[#eef7fb] px-3 py-1 text-sm">
                       Cholesterol
                     </span>


                     <span className="rounded-full bg-[#eef7fb] px-3 py-1 text-sm">
                       Fatty Acids
                     </span>


                   </div>


                 </div>


                 <div className="flex justify-center">
                   <div className="w-px h-8 bg-[#058FD2]" />
                 </div>


                 <div className="rounded-3xl bg-[#131C15] p-6 text-center">


                   <h4 className="text-xl font-semibold text-white">
                     Healthy Protective Barrier
                   </h4>


                   <p className="mt-2 text-white/70">
                     Strong • Hydrated • Resilient
                   </p>


                 </div>


               </div>


             </div>


           </div>


         </section>


         {/* ================= IMAGE SECTION ================= */}


         <section className="mt-24">


           <div className="overflow-hidden rounded-[40px]">


             <Image
               src={Barrier}
               alt="Healthy Skin Barrier"
               width={1800}
               height={1000}
               className="w-full h-auto object-contain"
             />


           </div>


         </section>


         {/* ================= PART 2 STARTS HERE ================= */}
                   {/* ================= SKIN BARRIER FUNCTIONS ================= */}


         <section className="mt-28">


           <div className="mb-14">


             <div className="flex items-center gap-3">
               <div className="w-10 h-[2px] bg-[#058FD2]" />


               <span className="text-sm font-medium uppercase tracking-[0.25em] text-[#058FD2]">
                 Section 03
               </span>
             </div>


             <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[#131C15]">
               What Your Skin Barrier Does Every Day
             </h2>


             <p className="mt-5 max-w-5xl text-lg leading-8 text-slate-600">
               Your skin barrier works continuously to keep your skin healthy,
               hydrated and protected from external damage.
             </p>


           </div>


           <div className="grid md:grid-cols-3 gap-6">


             <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)]">
               <div className="text-[#058FD2] text-4xl font-bold">
                 01
               </div>


               <h3 className="mt-5 text-xl font-semibold text-[#131C15]">
                 Prevents Water Loss
               </h3>


               <p className="mt-4 text-slate-600 leading-8">
                 It reduces transepidermal water loss (TEWL), helping your skin
                 stay hydrated and preventing dryness and dehydration.
               </p>
             </div>


             <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)]">
               <div className="text-[#058FD2] text-4xl font-bold">
                 02
               </div>


               <h3 className="mt-5 text-xl font-semibold text-[#131C15]">
                 Blocks Irritants & Germs
               </h3>


               <p className="mt-4 text-slate-600 leading-8">
                 Pollution, harsh chemicals, allergens and microbes are kept
                 from penetrating deeper layers of the skin.
               </p>
             </div>


             <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)]">
               <div className="text-[#058FD2] text-4xl font-bold">
                 03
               </div>


               <h3 className="mt-5 text-xl font-semibold text-[#131C15]">
                 Maintains Strength
               </h3>


               <p className="mt-4 text-slate-600 leading-8">
                 A healthy barrier keeps skin smoother, stronger and more
                 resistant to irritation and environmental stress.
               </p>
             </div>


           </div>


         </section>


         {/* ================= WHAT DAMAGES BARRIER ================= */}


         <section className="mt-28">


           <div className="mb-14">


             <div className="flex items-center gap-3">
               <div className="w-10 h-[2px] bg-[#058FD2]" />


               <span className="text-sm font-medium uppercase tracking-[0.25em] text-[#058FD2]">
                 Section 04
               </span>
             </div>


             <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[#131C15]">
               What Damages The Skin Barrier?
             </h2>


             <p className="mt-5 max-w-5xl text-lg leading-8 text-slate-600">
               Even though your skin barrier is remarkably resilient, certain
               habits and environmental factors can weaken it over time.
             </p>


           </div>


           <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-5">


             {[
               {
                 number: "01",
                 title: "Over-Exfoliation",
                 desc: "Using excessive acids or harsh scrubs can remove protective layers faster than your skin can repair itself."
               },
               {
                 number: "02",
                 title: "Harsh Cleansers",
                 desc: "Some cleansers strip away natural oils that are essential for maintaining barrier integrity."
               },
               {
                 number: "03",
                 title: "Too Many Actives",
                 desc: "Combining multiple strong ingredients may overload the skin and increase irritation."
               },
               {
                 number: "04",
                 title: "Environmental Stress",
                 desc: "Sunlight, pollution, wind and dry climates can gradually weaken the barrier."
               },
               {
                 number: "05",
                 title: "Constant Product Switching",
                 desc: "Changing products too often prevents your skin from adapting and recovering properly."
               },
             ].map((item) => (
               <div
                 key={item.title}
                 className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300"
               >
                 <div className="text-[#058FD2] text-3xl font-bold">
                   {item.number}
                 </div>


                 <h3 className="mt-5 text-lg font-semibold text-[#131C15]">
                   {item.title}
                 </h3>


                 <p className="mt-4 text-sm leading-7 text-slate-600">
                   {item.desc}
                 </p>
               </div>
             ))}


           </div>


         </section>


         {/* ================= WARNING SIGNS ================= */}


         <section className="mt-28">


           <div className="mb-14">


             <div className="flex items-center gap-3">
               <div className="w-10 h-[2px] bg-[#058FD2]" />


               <span className="text-sm font-medium uppercase tracking-[0.25em] text-[#058FD2]">
                 Section 05
               </span>
             </div>


             <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[#131C15]">
               Signs Of A Damaged Skin Barrier
             </h2>


             <p className="mt-5 max-w-5xl text-lg leading-8 text-slate-600">
               When your barrier becomes compromised, your skin often starts
               sending warning signals.
             </p>


           </div>


           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">


             {[
               "Constant Dryness",
               "Redness & Irritation",
               "Burning Or Stinging",
               "Increased Sensitivity",
               "Rough Texture",
               "Sudden Breakouts",
             ].map((item) => (
               <div
                 key={item}
                 className="rounded-[24px] border border-red-100 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
               >
                 <div className="flex items-center gap-3">


                   <div className="w-3 h-3 rounded-full bg-red-400" />


                   <span className="font-medium text-[#131C15]">
                     {item}
                   </span>


                 </div>
               </div>
             ))}


           </div>


         </section>


         {/* ================= DARK INSIGHT SECTION ================= */}


         <section className="mt-28">


           <div className="relative overflow-hidden rounded-[40px] bg-[#131C15] p-10 md:p-16">


             <div className="absolute right-0 top-0 w-96 h-96 bg-[#058FD2]/20 blur-[140px]" />


             <div className="relative max-w-4xl">


               <span className="text-[#6EC6F1] uppercase tracking-[0.25em] text-sm">
                 Key Insight
               </span>


               <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
                 More Products Don't
                 <br />
                 Always Mean Better Skin
               </h2>


               <p className="mt-8 text-lg leading-8 text-white/75">
                 Barrier-first skincare takes a simpler approach. Instead of
                 constantly adding more active ingredients, it focuses on
                 keeping your skin healthy first.
               </p>


               <p className="mt-5 text-lg leading-8 text-white/75">
                 Many skincare routines today involve using multiple strong
                 ingredients at once. While these ingredients can be useful,
                 overdoing them may stress and damage the skin barrier.
               </p>


             </div>


           </div>


         </section>


         {/* ================= SIMPLE ROUTINE ================= */}


         <section className="mt-28">


           <div className="mb-14">


             <div className="flex items-center gap-3">
               <div className="w-10 h-[2px] bg-[#058FD2]" />


               <span className="text-sm font-medium uppercase tracking-[0.25em] text-[#058FD2]">
                 Section 06
               </span>
             </div>


             <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[#131C15]">
               A Simple Barrier-First Routine
             </h2>


             <p className="mt-5 max-w-5xl text-lg leading-8 text-slate-600">
               Barrier-first skincare is about keeping things gentle,
               consistent and sustainable.
             </p>


           </div>


           <div className="grid lg:grid-cols-2 gap-8">


             {/* MORNING */}


             <div className="rounded-[36px] border border-slate-200 bg-white p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">


               <div className="inline-flex items-center rounded-full bg-[#eef7fb] px-4 py-2 text-sm font-medium text-[#058FD2]">
                 ☀ Morning Routine
               </div>


               <div className="mt-8 space-y-4">


                 {[
                   "Light or Gentle Cleanse",
                   "Barrier-Supporting Moisturizer",
                   "Daily Sunscreen",
                 ].map((item) => (
                   <div
                     key={item}
                     className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4"
                   >
                     <HiShieldCheck className="text-[#058FD2]" />
                     <span className="text-[#131C15] font-medium">
                       {item}
                     </span>
                   </div>
                 ))}


               </div>


             </div>


             {/* EVENING */}


             <div className="rounded-[36px] border border-slate-200 bg-white p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">


               <div className="inline-flex items-center rounded-full bg-[#131C15] px-4 py-2 text-sm font-medium text-white">
                 🌙 Evening Routine
               </div>


               <div className="mt-8 space-y-4">


                 {[
                   "Gentle Cleanse",
                   "Barrier-Repairing Moisturizer",
                   "Nourishing Skincare Products",
                 ].map((item) => (
                   <div
                     key={item}
                     className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4"
                   >
                     <HiShieldCheck className="text-[#058FD2]" />
                     <span className="text-[#131C15] font-medium">
                       {item}
                     </span>
                   </div>
                 ))}


               </div>


             </div>


           </div>


         </section>


         {/* ================= FINAL CTA ================= */}


         <section className="mt-28">


           <div className="relative overflow-hidden rounded-[40px] bg-[#131C15] p-10 md:p-16">


             <div className="absolute right-0 top-0 w-96 h-96 bg-[#058FD2]/20 blur-[140px]" />


             <div className="relative max-w-3xl">


               <span className="text-[#6EC6F1] uppercase tracking-[0.25em] text-sm">
                 Consultation
               </span>


               <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
                 Ready To Repair
                 <br />
                 Your Skin Barrier?
               </h2>


               <p className="mt-6 text-lg leading-8 text-white/75">
                 Get a personalized skincare plan designed around your skin's
                 needs, helping you build a stronger, healthier foundation
                 before introducing active treatments.
               </p>


               <div className="mt-10 flex flex-wrap gap-4">


                 <button className="inline-flex items-center gap-2 rounded-full bg-[#058FD2] px-7 py-4 text-white font-medium transition-all hover:scale-[1.02]">
                   Book Consultation
                   <HiArrowRight />
                 </button>


                 <button className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-md px-7 py-4 text-white font-medium">
                   WhatsApp Now
                 </button>


               </div>


             </div>


           </div>


         </section>


       </div>
     </section>


   </main>
 );
};


export default BlogTwo;


