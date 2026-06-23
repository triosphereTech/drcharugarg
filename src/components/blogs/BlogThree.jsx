"use client";


import Image from "next/image";
import { motion } from "framer-motion";
import {
 HiHeart,
 HiShieldCheck,
 HiSparkles,
 HiBeaker,
 HiUserGroup,
 HiExclamationCircle,
 HiBookOpen,
} from "react-icons/hi2";
import Link from "next/link";


const BlogThree = () => {
 return (
   <main className="bg-[#fafafa] overflow-hidden">


     {/* ================= HERO ================= */}


     <section className="relative h-[80vh] min-h-[650px] overflow-hidden">


       <Image
         src="/images/blogs/pediatric-atopic-dermatitis-banner.jpg"
         alt="Pediatric Atopic Dermatitis"
         fill
         priority
         className="object-cover"
       />


       <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-[#058FD2]/20" />


       <div className="absolute inset-0">
         <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-full">


           <div className="flex items-center h-full">


             <div className="max-w-5xl">


               <motion.span
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl px-4 py-2 text-sm font-medium text-white"
               >
                 Pediatric Dermatology
               </motion.span>


               <motion.h1
                 initial={{ opacity: 0, y: 25 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="mt-6 text-white text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]"
               >
                 Understand Pediatric
                 <br />
                 Atopic Dermatitis
               </motion.h1>


               <motion.p
                 initial={{ opacity: 0, y: 25 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="mt-8 max-w-3xl text-lg md:text-xl leading-8 text-white/80"
               >
                 A practical guide for parents to recognize symptoms,
                 understand triggers, and seek timely treatment for
                 pediatric eczema.
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
                     8 Minutes
                   </p>
                 </div>


                 <div className="hidden sm:block w-px h-10 bg-white/20" />


                 <div>
                   <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                     Category
                   </p>
                   <p className="mt-1 font-medium">
                     Pediatric Skin Care
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


         <div className="rounded-[36px] border border-slate-200 bg-white p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">


           <div className="max-w-6xl">


             <div className="border-l-[3px] border-[#058FD2] pl-6">


               <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#131C15]">
                 One Of The Most Common Childhood Skin Conditions
               </h2>


               <p className="mt-4 text-lg md:text-xl leading-relaxed text-slate-600">
                 Atopic Dermatitis, commonly known as pediatric eczema,
                 causes dry, itchy and inflamed skin. While it is a
                 long-term condition, proper treatment can significantly
                 improve symptoms and quality of life.
               </p>


             </div>


             <div className="mt-10 space-y-7 text-lg leading-8 text-slate-600">


               <p>
                 When we think of skin disorders, we often associate them
                 with adults. However, children and adolescents can also
                 experience a wide range of skin conditions.
               </p>


               <p>
                 One of the most common among them is Atopic Dermatitis,
                 also known as pediatric eczema.
               </p>


               <p>
                 Early recognition and appropriate treatment can help
                 reduce discomfort, improve sleep quality, and prevent
                 repeated flare-ups.
               </p>


             </div>


           </div>


         </div>


       </div>
     </section>


     {/* ================= ARTICLE ================= */}


     <section className="py-20 md:py-28">
       <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">


         {/* ================= WHAT IS ATOPIC DERMATITIS ================= */}


         <section>


           <div className="mb-14">


             <div className="flex items-center gap-3">
               <div className="w-10 h-[2px] bg-[#058FD2]" />


               <span className="text-sm font-medium uppercase tracking-[0.25em] text-[#058FD2]">
                 Section 01
               </span>
             </div>


             <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[#131C15]">
               What Is Atopic Dermatitis?
             </h2>


             <p className="mt-5 max-w-5xl text-lg leading-8 text-slate-600">
               Understanding the condition is the first step toward better
               symptom control and long-term skin comfort.
             </p>


           </div>


           <div className="grid lg:grid-cols-2 gap-8">


             {/* LEFT INFO BLOCK */}


             <div className="rounded-[36px] bg-[#131C15] p-8 md:p-10">


               <div className="space-y-5">


                 {[
                   "Chronic Condition",
                   "Inflammatory Skin Disease",
                   "Intense Itching",
                   "Recurring Flare-Ups",
                 ].map((item) => (
                   <div
                     key={item}
                     className="rounded-2xl bg-white/10 border border-white/10 px-5 py-4"
                   >
                     <span className="text-white font-medium">
                       {item}
                     </span>
                   </div>
                 ))}


               </div>


             </div>


             {/* RIGHT CONTENT */}


             <div className="rounded-[36px] border border-slate-200 bg-white p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">


               <div className="flex items-center gap-3">
                 <HiBookOpen className="text-[#058FD2] text-xl" />


                 <h3 className="text-2xl font-semibold text-[#131C15]">
                   Understanding Eczema
                 </h3>
               </div>


               <div className="mt-6 space-y-5 text-slate-600 leading-8">


                 <p>
                   Atopic Dermatitis is a long-term skin condition that
                   leads to dry, itchy and discolored patches on the skin.
                 </p>


                 <p>
                   It can affect both children and adults, with symptoms
                   that may flare periodically or persist over time.
                 </p>


                 <p>
                   During a flare, intense itching often leads to
                   scratching, which can further worsen inflammation and
                   result in swelling, cracks, crusting and scaling.
                 </p>


                 <p>
                   Atopic dermatitis is the most common form of eczema,
                   which is a broader term used for a group of inflammatory
                   skin conditions.
                 </p>


               </div>


             </div>


           </div>


         </section>


         {/* ================= CAUSES SECTION ================= */}


         <section className="mt-28">


           <div className="mb-14">


             <div className="flex items-center gap-3">
               <div className="w-10 h-[2px] bg-[#058FD2]" />


               <span className="text-sm font-medium uppercase tracking-[0.25em] text-[#058FD2]">
                 Section 02
               </span>
             </div>


             <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[#131C15]">
               What Causes Atopic Dermatitis In Children?
             </h2>


             <p className="mt-5 max-w-5xl text-lg leading-8 text-slate-600">
               Multiple factors contribute to the development of atopic
               dermatitis, often working together rather than as a single
               cause.
             </p>


           </div>


           <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-5">


             {[
               {
                 icon: <HiUserGroup />,
                 title: "Genetics",
               },
               {
                 icon: <HiShieldCheck />,
                 title: "Environmental Factors",
               },
               {
                 icon: <HiSparkles />,
                 title: "Weather Changes",
               },
               {
                 icon: <HiBeaker />,
                 title: "Temperature Variations",
               },
               {
                 icon: <HiHeart />,
                 title: "Allergies",
               },
             ].map((item) => (
               <div
                 key={item.title}
                 className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300"
               >
                 <div className="w-12 h-12 rounded-2xl bg-[#eef7fb] flex items-center justify-center text-[#058FD2] text-xl">
                   {item.icon}
                 </div>


                 <h3 className="mt-5 text-lg font-semibold text-[#131C15]">
                   {item.title}
                 </h3>
               </div>
             ))}


           </div>


           <div className="mt-8 rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,0.03)]">


             <p className="text-slate-600 text-lg leading-8">
               Children with a family history of eczema, asthma or other
               allergic conditions may have a higher risk of developing
               atopic dermatitis.
             </p>


           </div>


         </section>


         {/* ================= SIGNS & SYMPTOMS ================= */}


         <section className="mt-28">


           <div className="mb-14">


             <div className="flex items-center gap-3">
               <div className="w-10 h-[2px] bg-[#058FD2]" />


               <span className="text-sm font-medium uppercase tracking-[0.25em] text-[#058FD2]">
                 Section 03
               </span>
             </div>


             <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[#131C15]">
               Signs Of Pediatric Atopic Dermatitis
             </h2>


             <p className="mt-5 max-w-5xl text-lg leading-8 text-slate-600">
               Symptoms can vary between children, but these are some of the
               most commonly observed signs.
             </p>


           </div>


           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">


             {[
               "Persistent Dry Skin",
               "Intense Itching",
               "Red Inflamed Patches",
               "Fluid-Filled Or Crusted Lesions",
               "Rough Or Bumpy Skin",
               "Occasional Hives",
             ].map((item) => (
               <div
                 key={item}
                 className="rounded-[28px] border border-orange-100 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
               >
                 <div className="flex items-center gap-3">


                   <HiExclamationCircle className="text-orange-500 text-xl" />


                   <span className="font-medium text-[#131C15]">
                     {item}
                   </span>


                 </div>
               </div>
             ))}


           </div>


         </section>


         {/* ================= PART 2 STARTS HERE ================= */}
                   {/* ================= ITCHING HIGHLIGHT SECTION ================= */}


         <section className="mt-28">


           <div className="relative overflow-hidden rounded-[40px] bg-[#131C15] p-10 md:p-16">


             <div className="absolute right-0 top-0 w-96 h-96 bg-[#058FD2]/20 blur-[140px]" />


             <div className="relative max-w-4xl">


               <span className="text-[#6EC6F1] uppercase tracking-[0.25em] text-sm">
                 Important Observation
               </span>


               <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
                 Parents Often Notice
                 <br />
                 The Itching First
               </h2>


               <p className="mt-8 text-lg leading-8 text-white/75">
                 Persistent itching is one of the most troublesome symptoms of
                 atopic dermatitis. Children may scratch repeatedly, especially
                 during the night, leading to worsening inflammation and skin
                 damage.
               </p>


               <p className="mt-5 text-lg leading-8 text-white/75">
                 This itch-scratch cycle can interfere with sleep, increase
                 discomfort, and make flare-ups more difficult to control.
               </p>


             </div>


           </div>


         </section>


         {/* ================= TRIGGERS SECTION ================= */}


         <section className="mt-28">


           <div className="mb-14">


             <div className="flex items-center gap-3">
               <div className="w-10 h-[2px] bg-[#058FD2]" />


               <span className="text-sm font-medium uppercase tracking-[0.25em] text-[#058FD2]">
                 Section 04
               </span>
             </div>


             <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[#131C15]">
               What Triggers Atopic Dermatitis?
             </h2>


             <p className="mt-5 max-w-5xl text-lg leading-8 text-slate-600">
               Flare-ups can occur due to a combination of internal and
               external factors. Understanding triggers helps reduce
               recurrence and improve symptom control.
             </p>


           </div>


           <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-5">


             {[
               "Allergens & Irritants",
               "Hormonal Changes",
               "Skin Infections",
               "Emotional Stress",
               "Temperature Changes",
             ].map((item, index) => (
               <div
                 key={item}
                 className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_15px_40px_rgba(0,0,0,0.04)]"
               >
                 <div className="text-[#058FD2] text-3xl font-bold">
                   0{index + 1}
                 </div>


                 <h3 className="mt-5 text-lg font-semibold text-[#131C15]">
                   {item}
                 </h3>
               </div>
             ))}


           </div>


         </section>


         {/* ================= CONTACT DERMATITIS TRIGGERS ================= */}


         <section className="mt-20">


           <div className="rounded-[36px] border border-slate-200 bg-white p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.04)]">


             <h3 className="text-2xl md:text-3xl font-semibold text-[#131C15]">
               Common Contact Dermatitis Triggers
             </h3>


             <p className="mt-4 text-lg leading-8 text-slate-600">
               When the skin reacts after coming into contact with a specific
               allergen or irritant, it is known as contact dermatitis.
             </p>


             <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-5 gap-4">


               {[
                 "Certain Foods",
                 "Fragranced Products",
                 "Plants",
                 "Cleaning Agents",
                 "Soaps & Detergents",
               ].map((item) => (
                 <div
                   key={item}
                   className="rounded-2xl bg-[#eef7fb] p-5 text-center"
                 >
                   <span className="font-medium text-[#131C15]">
                     {item}
                   </span>
                 </div>
               ))}


             </div>


             <p className="mt-8 text-lg leading-8 text-slate-600">
               In many cases, identifying the exact trigger can be difficult.
               A dermatologist can help evaluate patterns and guide families
               toward identifying and avoiding potential triggers.
             </p>


           </div>


         </section>


         {/* ================= TREATMENT SECTION ================= */}


         <section className="mt-28">


           <div className="mb-14">


             <div className="flex items-center gap-3">
               <div className="w-10 h-[2px] bg-[#058FD2]" />


               <span className="text-sm font-medium uppercase tracking-[0.25em] text-[#058FD2]">
                 Section 05
               </span>
             </div>


             <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[#131C15]">
               How Is Atopic Dermatitis Treated?
             </h2>


             <p className="mt-5 max-w-5xl text-lg leading-8 text-slate-600">
               Treatment is individualized and depends on factors such as the
               child’s age, overall health and severity of symptoms.
             </p>


           </div>


           <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">


             {[
               {
                 title: "Trigger Avoidance",
                 desc: "Avoiding harsh soaps, detergents, allergens and other known triggers."
               },
               {
                 title: "Keeping Nails Short",
                 desc: "Reducing skin damage caused by scratching during flare-ups."
               },
               {
                 title: "Gentle Cleansers",
                 desc: "Using skin-friendly cleansers and moisturizers that support the skin barrier."
               },
               {
                 title: "Topical Corticosteroids",
                 desc: "Helping control inflammation and reduce active flare-ups."
               },
               {
                 title: "Antihistamines",
                 desc: "Reducing itching and improving comfort in selected cases."
               },
               {
                 title: "Phototherapy",
                 desc: "Light-based treatment that may be recommended for some patients."
               },
             ].map((item) => (
               <div
                 key={item.title}
                 className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)]"
               >
                 <HiShieldCheck className="text-[#058FD2] text-2xl" />


                 <h3 className="mt-5 text-xl font-semibold text-[#131C15]">
                   {item.title}
                 </h3>


                 <p className="mt-4 text-slate-600 leading-8">
                   {item.desc}
                 </p>


               </div>
             ))}


           </div>


         </section>


         {/* ================= ADVANCED THERAPIES ================= */}


         <section className="mt-20">


           <div className="rounded-[36px] bg-[#eef7fb] p-8 md:p-10 border border-[#d7eef9]">


             <span className="text-[#058FD2] uppercase tracking-[0.25em] text-sm font-medium">
               Advanced Therapies
             </span>


             <h3 className="mt-4 text-3xl font-semibold text-[#131C15]">
               Biologic Treatments For Severe Cases
             </h3>


             <p className="mt-5 text-lg leading-8 text-slate-600 max-w-4xl">
               For children with severe or treatment-resistant atopic
               dermatitis, advanced therapies such as biologics may be
               considered. These treatments target specific inflammatory
               pathways and are usually recommended after careful evaluation.
             </p>


           </div>


         </section>


         {/* ================= EARLY TREATMENT SECTION ================= */}


         <section className="mt-28">


           <div className="relative overflow-hidden rounded-[40px] bg-[#131C15] p-10 md:p-16">


             <div className="absolute right-0 top-0 w-96 h-96 bg-[#058FD2]/20 blur-[140px]" />


             <div className="relative max-w-4xl">


               <span className="text-[#6EC6F1] uppercase tracking-[0.25em] text-sm">
                 Early Care Matters
               </span>


               <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
                 Early Diagnosis
                 <br />
                 Makes A Difference
               </h2>


               <p className="mt-8 text-lg leading-8 text-white/75">
                 If your child has persistent or recurring skin symptoms,
                 timely evaluation is important.
               </p>


               <p className="mt-5 text-lg leading-8 text-white/75">
                 Early diagnosis and appropriate management can significantly
                 improve symptoms, reduce flare-ups, improve sleep quality,
                 and help prevent long-term complications.
               </p>


             </div>


           </div>


         </section>


         {/* ================= FINAL CTA ================= */}


         <section className="mt-28">


           <div className="relative overflow-hidden rounded-[40px] bg-white border border-slate-200 p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">


             <div className="max-w-3xl">


               <span className="text-[#058FD2] uppercase tracking-[0.25em] text-sm font-medium">
                 Consultation
               </span>


               <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[#131C15] leading-tight">
                 Concerned About
                 <br />
                 Your Child's Skin?
               </h2>


               <p className="mt-6 text-lg leading-8 text-slate-600">
                 Get expert evaluation, accurate diagnosis and a personalized
                 treatment plan designed to keep your child comfortable and
                 reduce future flare-ups.
               </p>


               <div className="mt-10 flex flex-wrap gap-4">


                 <Link href="/book-appointment" className="inline-flex items-center gap-2 rounded-full bg-[#058FD2] px-7 py-4 text-white font-medium transition-all hover:scale-[1.02]">
                   Book Consultation
                 </Link>


                 <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-7 py-4 font-medium text-[#131C15]">
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


export default BlogThree;


