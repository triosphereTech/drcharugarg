// components/services/WhyThisHappen.jsx


"use client";


import React from "react";
import { motion } from "framer-motion";


import {
 Activity,
 Pill,
 Sparkles,
 Brain,
 ArrowUpRight,
 ShieldCheck,
} from "lucide-react";
import Link from "next/link";


const iconMap = {
 hormonal: <Activity size={22} />,
 nutrition: <Pill size={22} />,
 scalp: <Sparkles size={22} />,
 stress: <Brain size={22} />,
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 70,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeIn = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};


const WhyThisHappen = ({ data }) => {
 return (
   <section className="relative overflow-hidden bg-linear-[120deg] from-[#315e95] via-[#039bd3] to-[#50b1a2] py-4 md:my-5 mx-5 rounded-2xl lg:rounded-4xl">
     {/* Background Blur */}
     {/* <div className="absolute left-0 top-30 h-80 w-[320px] rounded-full bg-[#dff2fc] blur-[110px]" /> */}


     <div className="relative mx-auto max-w-7xl px-5 pt-0 md:px-5 lg:pt-10">
       <div className="grid gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-center lg:gap-16">
         {/* LEFT */}
         <motion.div
           variants={staggerContainer}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 0.25 }}
         >
           {/* Badge */}
           <motion.div
             variants={fadeUp}
             className="mb-5 flex w-fit items-center gap-2 rounded-full border border-[#dceaf3] bg-white/20 px-4 py-2"
           >
             <div className="h-2 w-2 rounded-full bg-white" />


             <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white">
              {data.badge}
             </p>
           </motion.div>


           {/* Heading */}
           <motion.h2
             variants={fadeUp}
             className="max-w-[620px] text-3xl font-semibold leading-[1.05] text-white md:text-4xl lg:text-5xl"
           >
             {data.title}
           </motion.h2>


           {/* Paragraph */}
           {/* <p className="mt-7 max-w-[620px] text-[15px] leading-8 text-white md:text-[17px]">
             {data.description}
           </p> */}


           {/* Compact Points */}
           <motion.div
             variants={staggerContainer}
             className="mt-10 grid gird-cols-1 md:grid-cols-2 gap-4"
           >
             {data.points?.map((item, index) => (
               <motion.div
                 key={index}
                 variants={fadeUp}
                 className="group flex flex-col items-start gap-4 rounded-[24px] border border-[#dceaf3] bg-white/70 p-4 transition-all duration-500 hover:border-[#cfe4f2] hover:shadow-[0_15px_40px_rgba(15,23,42,0.05)]"
               >
                 <div className="flex items-center gap-4">
                   <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#eef7fb] text-[#058FD2] transition-all duration-500 group-hover:bg-[#058FD2] group-hover:text-white">
                     {iconMap[item.icon]}
                   </div>
                   <h3 className="text-[17px] font-semibold text-[#131C15]">
                     {item.title}
                   </h3>
                 </div>


                 <p className="text-[14px] leading-7 text-[#272727]">
                   {item.description}
                 </p>
               </motion.div>
             ))}
           </motion.div>


           

           <motion.div variants={fadeUp}>
             <Link href="/book-appointment" className="group mt-10 w-fit flex items-center gap-2 rounded-2xl bg-[#131C15] px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#e6f7ff] hover:text-blue-600 active:scale-95">
                 Book Consultation
                 <ArrowUpRight
                   size={16}
                   className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                 />
               </Link>
           </motion.div>
         </motion.div>


         {/* RIGHT IMAGE */}
         <motion.div
           className="relative"
           variants={fadeIn}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 0.3 }}
         >
           {/* Main Image */}
           <div className="overflow-hidden rounded-[38px] bg-white p-3 shadow-[0_25px_70px_rgba(15,23,42,0.06)]">
             <img
  src={data.image}
  alt={data.title}
  className="block h-auto w-full rounded-[30px]"
/>
           </div>
         </motion.div>
       </div>
     </div>
   </section>
 );
};


export default WhyThisHappen;