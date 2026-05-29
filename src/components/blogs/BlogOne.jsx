"use client";


import Image from "next/image";
import { motion } from "framer-motion";
import {
 HiArrowRight,
 HiCheckCircle,
 HiShieldCheck,
 HiSun,
 HiSparkles,
 HiHeart,
 HiBookOpen,
} from "react-icons/hi2";


const BlogOne = () => {
 return (
   <main className="bg-[#fafafa] overflow-hidden">


     {/* ================= HERO ================= */}
     <section className="relative h-[80vh] min-h-[620px] overflow-hidden">


       <image
         src="https://www.skinalaya.com/img/blog/laser-treatment-for-melasma-in-delhi.jpg"
         alt="Melasma Explained"
         fill
         priority
         className="object-cover"
       />


       <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/65 to-[#058FD2]/20" />


       <div className="absolute inset-0">
         <div className="max-w-7xl mx-auto h-full px-5 sm:px-6 lg:px-8">


           <div className="flex items-center h-full">


             <div className="max-w-4xl">


               <motion.span
                 initial={{ opacity: 0, y: 15 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5 }}
                 className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl px-4 py-2 text-sm font-medium text-white"
               >
                 Pigmentation Disorders
               </motion.span>


               <motion.h1
                 initial={{ opacity: 0, y: 25 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="mt-6 text-white text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]"
               >
                 Melasma Explained:
                 <br />
                 Causes, Treatment &
                 <br />
                 Why it Recurs?
               </motion.h1>


               <motion.div
                 initial={{ opacity: 0, y: 25 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="mt-10 inline-flex flex-wrap items-center gap-5 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl px-5 py-4 text-white"
               >
                 <div>
                   <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                     Author
                   </p>
                   <p className="font-medium mt-1">
                     Dr. Charu Garg
                   </p>
                 </div>


                 <div className="hidden sm:block w-px h-10 bg-white/20" />


                 <div>
                   <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                     Read Time
                   </p>
                   <p className="font-medium mt-1">
                     8 Minutes
                   </p>
                 </div>


                 <div className="hidden sm:block w-px h-10 bg-white/20" />


                 <div>
                   <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                     Category
                   </p>
                   <p className="font-medium mt-1">
                     Melasma
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
       <div className="max-w-7xl mx-auto px-5">


         <div className="max-w-47xl mx-auto rounded-[36px] border border-slate-200 bg-white p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">


           <div className="border-l-[3px] border-[#058FD2] pl-6">
             <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#131C15] leading-tight">
               Understanding Melasma Beyond Surface Pigmentation
             </h2>


             <p className="mt-4 text-lg md:text-xl text-slate-600 leading-relaxed">
               Melasma is a chronic pigmentation disorder that often improves
               with treatment but commonly recurs without long-term sun
               protection and maintenance care.
             </p>
           </div>


           <div className="mt-10 space-y-7 text-lg leading-8 text-slate-600">


             <p>
               Melasma is a common skin condition where dark patches appear on
               the face, usually on both sides in a similar pattern. These
               patches are typically seen on areas exposed to the sun, like
               the cheeks, forehead, upper lip, and jawline.
             </p>


             <p>
               It is a long-term skin condition that often comes back even
               after it improves. That’s why maintaining results and
               preventing recurrence is just as important as treating the
               pigmentation in the first place.
             </p>


             <p>
               Without regular sunscreen use and ongoing care, the improvement
               is usually temporary. Understanding the underlying triggers
               helps create a more sustainable and effective treatment plan.
             </p>


           </div>


         </div>


       </div>
     </section>


     {/* ================= ARTICLE CONTENT ================= */}
     <section className="py-20 md:py-28">
       <div className="max-w-7xl mx-auto px-5">


         <div className="">


           {/* SECTION HEADER */}
           <div className="mb-14">


             <div className="flex items-center gap-3">
               <div className="w-10 h-[2px] bg-[#058FD2]" />


               <span className="text-sm font-medium uppercase tracking-[0.25em] text-[#058FD2]">
                 Section 01
               </span>
             </div>


             <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[#131C15]">
               Real Reasons Behind Melasma
             </h2>


             <p className="mt-5 text-lg text-slate-600 leading-8">
               Understanding the underlying causes helps achieve better
               long-term control and reduces the chances of recurrence.
             </p>


           </div>


           {/* CAUSE CARDS */}
           <div className="grid md:grid-cols-3 gap-6">


             {/* CARD 1 */}
             <motion.div
               whileHover={{ y: -5 }}
               transition={{ duration: 0.2 }}
               className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)]"
             >
               <div className="w-14 h-14 rounded-2xl bg-[#eef7fb] flex items-center justify-center">
                 <HiSun className="text-2xl text-[#058FD2]" />
               </div>


               <h3 className="mt-6 text-xl font-semibold text-[#131C15]">
                 Light Exposure
               </h3>


               <p className="mt-4 text-slate-600 leading-8">
                 Sunlight is the most important and controllable trigger for
                 melasma.
               </p>


               <p className="mt-4 text-slate-600 leading-8">
                 Even visible light such as blue light from screens and
                 daylight can worsen pigmentation, especially in Indian skin
                 types.
               </p>
             </motion.div>


             {/* CARD 2 */}
             <motion.div
               whileHover={{ y: -5 }}
               transition={{ duration: 0.2 }}
               className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)]"
             >
               <div className="w-14 h-14 rounded-2xl bg-[#eef7fb] flex items-center justify-center">
                 <HiHeart className="text-2xl text-[#058FD2]" />
               </div>


               <h3 className="mt-6 text-xl font-semibold text-[#131C15]">
                 Hormonal Influence
               </h3>


               <p className="mt-4 text-slate-600 leading-8">
                 Hormones play a major role in melasma and are one of the
                 reasons why the condition commonly appears during pregnancy.
               </p>


               <p className="mt-4 text-slate-600 leading-8">
                 Hormonal medications such as oral contraceptives can also
                 trigger or worsen pigmentation in susceptible individuals.
               </p>
             </motion.div>


             {/* CARD 3 */}
             <motion.div
               whileHover={{ y: -5 }}
               transition={{ duration: 0.2 }}
               className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)]"
             >
               <div className="w-14 h-14 rounded-2xl bg-[#eef7fb] flex items-center justify-center">
                 <HiSparkles className="text-2xl text-[#058FD2]" />
               </div>


               <h3 className="mt-6 text-xl font-semibold text-[#131C15]">
                 Deeper Skin Changes
               </h3>


               <p className="mt-4 text-slate-600 leading-8">
                 Melasma is not simply a surface pigment problem.
               </p>


               <p className="mt-4 text-slate-600 leading-8">
                 Deeper skin damage and increased blood vessel activity
                 continue stimulating pigment production, making recurrence
                 common.
               </p>
             </motion.div>


           </div>


           {/* ADDITIONAL EXPLANATION */}
           <div className="mt-14 rounded-[30px] border border-slate-200 bg-white p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">


             <div className="flex items-center gap-3">
               <HiBookOpen className="text-[#058FD2] text-xl" />


               <h3 className="text-xl font-semibold text-[#131C15]">
                 Important Clinical Insight
               </h3>
             </div>


             <p className="mt-5 text-slate-600 leading-8 text-lg">
               Pigmentation from visible light can often persist longer than
               pigmentation caused by UV exposure. This is one of the reasons
               why proper sun protection, particularly tinted sunscreens with
               iron oxides, plays such an important role in preventing
               recurrence.
             </p>


           </div>


           {/* ================= KEY TAKEAWAY ================= */}


           <section className="mt-24">


             <div className="relative overflow-hidden rounded-[40px] bg-[#131C15] p-10 md:p-16">


               <div className="absolute right-0 top-0 w-80 h-80 bg-[#058FD2]/20 blur-[120px]" />


               <span className="relative text-[#6EC6F1] uppercase tracking-[0.25em] text-sm">
                 Key Takeaway
               </span>


               <h2 className="relative mt-5 text-white text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
                 Melasma Is More Than
                 <br />
                 Surface Pigmentation
               </h2>


               <p className="relative mt-6 max-w-3xl text-white/75 text-lg leading-8">
                 Melasma is a chronic condition influenced by sunlight,
                 visible light exposure, hormonal changes and deeper skin
                 alterations. Successful treatment requires a combination of
                 medical therapy, sun protection and long-term maintenance.
               </p>


             </div>


           </section>


           {/* ================= NEXT PART STARTS HERE ================= */}
           {/* Treatment Modalities Section */}


                       {/* ================= TREATMENT MODALITIES ================= */}


           <div className="mt-28">


             <div className="mb-14">


               <div className="flex items-center gap-3">
                 <div className="w-10 h-[2px] bg-[#058FD2]" />


                 <span className="text-sm font-medium uppercase tracking-[0.25em] text-[#058FD2]">
                   Section 02
                 </span>
               </div>


               <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[#131C15]">
                 Treatment Modalities
               </h2>


               <p className="mt-5 text-lg text-slate-600 leading-8">
                 Melasma is best managed like a long-term condition, not
                 something that can be permanently cured. Treatment focuses on
                 avoiding triggers, reducing pigmentation and maintaining
                 long-term control.
               </p>


             </div>


             <div className="grid md:grid-cols-2 gap-6">


               {/* SUNSCREEN */}
               <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300">


                 <div className="w-14 h-14 rounded-2xl bg-[#eef7fb] flex items-center justify-center">
                   <HiSun className="text-2xl text-[#058FD2]" />
                 </div>


                 <h3 className="mt-6 text-2xl font-semibold text-[#131C15]">
                   Sunscreens
                 </h3>


                 <p className="mt-5 text-slate-600 leading-8">
                   Tinted sunscreens containing iron oxides are especially
                   useful because they protect against both UV rays and
                   visible light.
                 </p>


                 <p className="mt-4 text-slate-600 leading-8">
                   Correct quantity and reapplication every 3–4 hours are
                   essential for maintaining treatment results.
                 </p>


               </div>


               {/* TOPICALS */}
               <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300">


                 <div className="w-14 h-14 rounded-2xl bg-[#eef7fb] flex items-center justify-center">
                   <HiCheckCircle className="text-2xl text-[#058FD2]" />
                 </div>


                 <h3 className="mt-6 text-2xl font-semibold text-[#131C15]">
                   Topical Treatments
                 </h3>


                 <div className="mt-6 grid md:grid-cols-2 gap-3">


                   {[
                     "Hydroquinone",
                     "Retinoids",
                     "Triple Combination Therapy",
                     "Azelaic Acid",
                     "Tranexamic Acid",
                     "Kojic Acid",
                     "Vitamin C",
                     "Niacinamide",
                     "Arbutin",
                   ].map((item) => (
                     <div
                       key={item}
                       className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3"
                     >
                       <HiCheckCircle className="text-[#058FD2] shrink-0" />
                       <span className="text-slate-700">
                         {item}
                       </span>
                     </div>
                   ))}


                 </div>


               </div>


               {/* ORAL */}
               <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300">


                 <div className="w-14 h-14 rounded-2xl bg-[#eef7fb] flex items-center justify-center">
                   <HiShieldCheck className="text-2xl text-[#058FD2]" />
                 </div>


                 <h3 className="mt-6 text-2xl font-semibold text-[#131C15]">
                   Oral Treatment
                 </h3>


                 <p className="mt-5 text-slate-600 leading-8">
                   In severe and resistant cases, oral treatment can be
                   considered under proper medical supervision.
                 </p>


                 <div className="mt-6 space-y-3">


                   {[
                     "Tranexamic Acid",
                     "Glutathione",
                     "Antioxidants",
                   ].map((item) => (
                     <div
                       key={item}
                       className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3"
                     >
                       <HiCheckCircle className="text-[#058FD2]" />
                       <span className="text-slate-700">
                         {item}
                       </span>
                     </div>
                   ))}


                 </div>


               </div>


               {/* PROCEDURES */}
               <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300">


                 <div className="w-14 h-14 rounded-2xl bg-[#eef7fb] flex items-center justify-center">
                   <HiSparkles className="text-2xl text-[#058FD2]" />
                 </div>


                 <h3 className="mt-6 text-2xl font-semibold text-[#131C15]">
                   Procedural Treatments
                 </h3>


                 <div className="mt-6 space-y-6">


                   <div>
                     <h4 className="font-semibold text-[#131C15]">
                       Chemical Peels
                     </h4>


                     <p className="mt-2 text-slate-600 leading-7">
                       Glycolic acid, lactic acid and retinoic acid peels
                       help with exfoliation and support pigmentation
                       management.
                     </p>
                   </div>


                   <div>
                     <h4 className="font-semibold text-[#131C15]">
                       Laser & Light Therapy
                     </h4>


                     <p className="mt-2 text-slate-600 leading-7">
                       Laser toning and related devices may improve outcomes
                       when combined with medical management.
                     </p>
                   </div>


                   <div>
                     <h4 className="font-semibold text-[#131C15]">
                       Microneedling
                     </h4>


                     <p className="mt-2 text-slate-600 leading-7">
                       Helps collagen induction and improves topical drug
                       delivery.
                     </p>
                   </div>


                 </div>


               </div>


             </div>


           </div>


           {/* ================= RECURRENCE SECTION ================= */}


           <section className="mt-28">


             <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#131C15] to-[#102A36] p-10 md:p-16">


               <div className="absolute right-0 top-0 w-80 h-80 bg-[#058FD2]/20 blur-[120px]" />


               <span className="relative text-[#6EC6F1] uppercase tracking-[0.25em] text-sm">
                 Section 03
               </span>


               <h2 className="relative mt-5 text-white text-4xl md:text-5xl font-semibold tracking-tight">
                 Why Does Melasma
                 <br />
                 Keep Coming Back?
               </h2>


               <div className="relative mt-8 space-y-6 text-lg leading-8 text-white/75">


                 <p>
                   Melasma has a strong tendency to recur because sunlight,
                   visible light exposure, hormonal influences and deeper
                   skin changes continue to stimulate pigment production even
                   after improvement.
                 </p>


                 <p>
                   Consistent sun protection, maintenance skincare and
                   regular follow-up play a crucial role in keeping
                   pigmentation under long-term control.
                 </p>


               </div>


             </div>


           </section>


           {/* ================= WHY US ================= */}


           <section className="mt-28">


             <div className="mb-14">


               <div className="flex items-center gap-3">
                 <div className="w-10 h-[2px] bg-[#058FD2]" />


                 <span className="text-sm font-medium uppercase tracking-[0.25em] text-[#058FD2]">
                   Section 04
                 </span>
               </div>


               <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[#131C15]">
                 Why Take Treatment From Us?
               </h2>


             </div>


             <div className="rounded-[36px] border border-slate-200 bg-white p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">


               <div className="grid md:grid-cols-2 gap-8">


                 <div className="space-y-4">


                   {[
                     "Evidence-Based Treatments",
                     "Personalized Treatment Plans",
                     "Indian Skin Expertise",
                     "Long-Term Follow-up Care",
                   ].map((item) => (
                     <div
                       key={item}
                       className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4"
                     >
                       <HiCheckCircle className="text-[#058FD2]" />
                       <span className="font-medium text-[#131C15]">
                         {item}
                       </span>
                     </div>
                   ))}


                 </div>


                 <div>


                   <p className="text-lg text-slate-600 leading-8">
                     We focus on treating melasma as a long-term condition,
                     not just temporary pigmentation.
                   </p>


                   <p className="mt-5 text-lg text-slate-600 leading-8">
                     Our approach is personalized to your skin type and
                     triggers, using evidence-based treatments that are safe
                     for Indian skin.
                   </p>


                   <p className="mt-5 text-lg text-slate-600 leading-8">
                     Along with effective treatment, we guide you on proper
                     skincare, sun protection and maintenance strategies to
                     reduce recurrence and improve long-term outcomes.
                   </p>


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


                 <h2 className="mt-5 text-white text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
                   Ready To Start Your
                   <br />
                   Melasma Treatment Journey?
                 </h2>


                 <p className="mt-6 text-white/75 text-lg leading-8">
                   Get a personalized assessment, evidence-based treatment
                   recommendations and long-term maintenance guidance tailored
                   to your skin.
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
       </div>
     </section>


   </main>
 );
};


export default BlogOne;


