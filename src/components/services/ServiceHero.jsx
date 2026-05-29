// components/services/ServiceHero.jsx


'use client'
import React from "react";
import { ArrowRight } from "lucide-react";


const ServiceHero = ({ data }) => {
 return (
   <section className="relative overflow-hidden bg-[#f4f5f7] pt-5 pb-14 md:pb-20 md:pt-10">
     {/* Background Blur */}
     <div className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-[#dff2fc] blur-[100px]" />


     <div className="relative mx-auto grid max-w-[1350px] gap-10 px-5 md:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16 lg:px-10">
      
       {/* Left Content */}
       <div>
         {/* Badge */}
         <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-[#d8eaf4] bg-white px-4 py-2">
           <div className="h-2 w-2 rounded-full bg-[#058FD2]" />


           <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#058FD2]">
             {data.badge}
           </p>
         </div>


         {/* Heading */}
         <h1 className="max-w-[700px] text-4xl font-semibold leading-[1.15] tracking-[-0.03em] text-[#131C15] md:text-5xl lg:text-6xl">
           {data.title}
         </h1>


         {/* Description */}
         <p className="mt-6 max-w-[620px] text-[15px] leading-8 text-[#667085] md:text-base">
           {data.description}
         </p>


         {/* Features */}
         <div className="mt-8 flex flex-wrap gap-3">
           {data.features?.map((item, index) => (
             <div
               key={index}
               className="rounded-full border border-[#dbe7ee] bg-white px-4 py-2 text-sm font-medium text-[#131C15]"
             >
               {item}
             </div>
           ))}
         </div>


         {/* Buttons */}
         <div className="mt-10 flex flex-wrap gap-4">
           <button className="rounded-full bg-[#131C15] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#058FD2] active:scale-95">
             Book Appointment
           </button>


           <button className="group flex items-center gap-2 rounded-full border border-[#dbe7ee] bg-white px-6 py-3.5 text-sm font-medium text-[#131C15] transition-all duration-300 hover:border-[#058FD2] hover:text-[#058FD2]">
             Learn More


             <ArrowRight
               size={16}
               className="transition-transform duration-300 group-hover:translate-x-1"
             />
           </button>
         </div>


         {/* Bottom Stats */}
         <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
           {data.stats?.map((item, index) => (
             <div
               key={index}
               className="rounded-[20px] border border-[#e5edf2] bg-white px-5 py-4"
             >
               <h3 className="text-2xl font-semibold text-[#131C15]">
                 {item.number}
               </h3>


               <p className="mt-2 text-sm leading-6 text-[#667085]">
                 {item.label}
               </p>
             </div>
           ))}
         </div>
       </div>


       {/* Right Image */}
       <div className="relative">
         {/* Main Image */}
         <div className="relative overflow-hidden rounded-[34px] border border-white/60 bg-white p-3 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
           <img
             src={data.image}
             alt={data.title}
             className="h-[380px] w-full rounded-[28px] object-cover md:h-[520px]"
           />
         </div>


         {/* Floating Card */}
         <div className="absolute -bottom-6 left-6 rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl md:left-10 md:p-6">
           <div className="flex items-center gap-4">
             <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef7fb] text-[#058FD2]">
               {data.icon}
             </div>


             <div>
               <h3 className="text-lg font-semibold text-[#131C15]">
                 {data.cardTitle}
               </h3>


               <p className="mt-1 text-sm text-[#667085]">
                 {data.cardDesc}
               </p>
             </div>
           </div>
         </div>
       </div>
     </div>
   </section>
 );
};


export default ServiceHero;


