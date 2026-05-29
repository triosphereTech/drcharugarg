// components/services/WhyThisHappen.jsx


"use client";


import React from "react";


import {
 Activity,
 Pill,
 Sparkles,
 Brain,
 ArrowUpRight,
 ShieldCheck,
} from "lucide-react";


const iconMap = {
 hormonal: <Activity size={22} />,
 nutrition: <Pill size={22} />,
 scalp: <Sparkles size={22} />,
 stress: <Brain size={22} />,
};


const WhyThisHappen = ({ data }) => {
 return (
   <section className="relative overflow-hidden bg-linear-to-b from-white to-[#eef7fb] ">
     {/* Background Blur */}
     <div className="absolute left-0 top-30 h-80 w-[320px] rounded-full bg-[#dff2fc] blur-[110px]" />


     <div className="relative mx-auto max-w-7xl px-3 pt-10 md:px-5 md:pt-20">
       <div className="grid gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-center lg:gap-16">
         {/* LEFT */}
         <div>
           {/* Badge */}
           <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-[#dceaf3] bg-white px-4 py-2">
             <div className="h-2 w-2 rounded-full bg-[#058FD2]" />


             <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#058FD2]">
               {data.badge}
             </p>
           </div>


           {/* Heading */}
           <h2 className="max-w-[620px] text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#131C15] md:text-5xl lg:text-[62px]">
             {data.title}
           </h2>


           {/* Paragraph */}
           <p className="mt-7 max-w-[620px] text-[15px] leading-8 text-[#667085] md:text-[17px]">
             {data.description}
           </p>


           {/* Compact Points */}
           <div className="mt-10 grid grid-cols-2 gap-4">
             {data.points?.map((item, index) => (
               <div
                 key={index}
                 className="group flex flex-col items-start gap-4 rounded-[24px] border border-[#dceaf3] bg-white p-4 transition-all duration-500 hover:border-[#cfe4f2] hover:shadow-[0_15px_40px_rgba(15,23,42,0.05)]"
               >
                 <div className="flex items-center gap-4">
                   <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#eef7fb] text-[#058FD2] transition-all duration-500 group-hover:bg-[#058FD2] group-hover:text-white">
                     {iconMap[item.icon]}
                   </div>
                   <h3 className="text-[17px] font-semibold text-[#131C15]">
                     {item.title}
                   </h3>
                 </div>


                 <p className=" text-[14px] leading-7 text-[#667085]">
                   {item.description}
                 </p>
               </div>
             ))}
           </div>


           {/* Highlight Line */}
           <div className="mt-10 overflow-hidden rounded-[30px] border border-[#dceaf3] bg-[#eef7fb]">
             <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
               {/* Left */}
               <div className="flex items-start gap-4">
                 {/* Icon */}
                 <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#058FD2] shadow-[0_10px_30px_rgba(5,143,210,0.08)]">
                   <ShieldCheck size={24} />
                 </div>


                 {/* Content */}
                 <div>
                   <h3 className="max-w-[620px] text-xl font-semibold leading-snug text-[#131C15]">
                     {data.highlightTitle}
                   </h3>


                   <p className="mt-2 max-w-[720px] text-[15px] leading-7 text-[#667085]">
                     {data.highlightDescription}
                   </p>
                 </div>
               </div>
             </div>
             {/* Right */}
             <button className="group w-full flex items-center gap-2 rounded-2xl bg-[#131C15] px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#058FD2] active:scale-95">
               Book Consultation
               <ArrowUpRight
                 size={16}
                 className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
               />
             </button>
           </div>
         </div>


         {/* RIGHT IMAGE */}
         <div className="relative">
           {/* Main Image */}
           <div className="overflow-hidden rounded-[38px] bg-white p-3 shadow-[0_25px_70px_rgba(15,23,42,0.06)]">
             <img
               src={data.image}
               alt={data.title}
               className="h-[340px] w-full rounded-[30px] object-cover md:h-[620px]"
             />
           </div>


           {/* Floating Card */}
           <div className="absolute bottom-5 left-5 max-w-[400px] rounded-[28px] border border-white/70 bg-white/92 p-5 shadow-[0_15px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl md:p-6">
             <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#058FD2]">
               Clinical Observation
             </p>


            


             <p className="mt-3 text-[14px] leading-7 text-[#667085]">
               {data.floatingDescription}
             </p>


            
           </div>
         </div>
       </div>
     </div>
   </section>
 );
};


export default WhyThisHappen;




