'use client'


import { motion } from "framer-motion";
import { HiArrowUpRight, HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import Image from "next/image";


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";


import "swiper/css";


import Hero1 from "../../../public/images/HomeHero.png";
import Hero2 from "../../../public/images/SideFaceN.png";
import Hero3 from "../../../public/images/SideFace.png";


const slides = [
 {
   id: 1,
   label: "ADVANCED DERMATOLOGY CARE",
   title: "Expert Skin Solution",
   description:
     "Personalized dermatology treatments focused on skin health, confidence, and long-term wellness through modern and trusted care.",
   image: Hero1,
   stats: [
     { number: "12+", label: "Years Experience" },
     { number: "5k+", label: "Happy Patients" },
     { number: "98%", label: "Patient Satisfaction" },
   ],
 },


 {
   id: 2,
   label: "MODERN SKIN SOLUTIONS",
   title: "Teleconsult Dr.Charu Garg",
   description:
     "Experience premium dermatology care with personalized solutions for healthier, radiant, and naturally balanced skin.",
   image: Hero2,
   stats: [
     { number: "15+", label: "Advanced Treatments" },
     { number: "8k+", label: "Consultations Done" },
     { number: "96%", label: "Trusted Care Rate" },
   ],
 },


 {
   id: 3,
   label: "PERSONALIZED CARE EXPERIENCE",
   title: "Where science and aesthetics work together.",
   description:
     "Comprehensive skin care designed with modern dermatology practices, advanced technologies, and patient-first attention.",
   image: Hero3,
   stats: [
     { number: "10+", label: "Skin Specialists" },
     { number: "4.9★", label: "Average Rating" },
     { number: "24/7", label: "Patient Assistance" },
   ],
 },
];


const HeroSection = () => {
 return (
   <section className="relative overflow-hidden bg-transparent font-sans">
     <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 md:pt-14 lg:pt-16 pb-10 relative">
      
       {/* NAVIGATION */}
       <div className="absolute right-5 top-0 md:top-3 z-20 flex items-center gap-3">
         <button className="hero-prev cursor-pointer active:scale-95 w-11 h-11 rounded-full border border-[#dbe7ee] bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#131C15] hover:bg-white transition-all">
           <HiArrowLeft className="text-lg" />
         </button>


         <button className="hero-next cursor-pointer active:scale-95 w-11 h-11 rounded-full border border-[#dbe7ee] bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#131C15] hover:bg-white transition-all">
           <HiArrowRight className="text-lg" />
         </button>
       </div>


       <Swiper
         modules={[Navigation, Autoplay]}
         navigation={{
           prevEl: ".hero-prev",
           nextEl: ".hero-next",
         }}
         autoplay={{
           delay: 7000,
           disableOnInteraction: false,
         }}
         speed={900}
         loop={true}
         className="w-full"
       >
         {slides.map((slide) => (
           <SwiperSlide key={slide.id}>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
               {/* LEFT CONTENT */}
               <motion.div
                 initial={{ opacity: 0, y: 25 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.7 }}
                 className="max-w-xl"
               >
                 {/* TOP LABEL */}
                 <div className="inline-flex items-center rounded-full border border-[#dcebf3] bg-white/70 backdrop-blur-sm px-4 py-2">
                   <span className="text-sm font-medium text-[#058FD2] tracking-wide">
                     {slide.label}
                   </span>
                 </div>


                 {/* HEADING */}
                 <h1 className="text-4xl sm:text-5xl xl:text-6xl leading-[1.08] font-semibold text-[#131C15] mt-6 tracking-[-0.03em]">
                   {slide.title}
                 </h1>


                 {/* DESCRIPTION */}
                 <p className="text-[#66706b] text-base xl:text-lg leading-8 mt-6 max-w-lg">
                   {slide.description}
                 </p>


                 {/* CTA */}
                 <div className="flex items-center gap-4 mt-9 flex-wrap">
                   <button className="h-[56px] px-7 rounded-full bg-[#058FD2] hover:bg-[#047db7] transition-all text-white text-sm font-medium flex items-center gap-2 shadow-[0_10px_30px_rgba(5,143,210,0.18)]">
                     Book Appointment Now
                     <HiArrowUpRight className="text-lg" />
                   </button>


                   <button className="h-[56px] px-6 rounded-full border border-[#dbe7ee] bg-white/70 backdrop-blur-sm text-[#131C15] text-sm font-medium hover:bg-white transition-all">
                     Explore Treatments
                   </button>
                 </div>


                 {/* STATS */}
                 <div className="flex flex-wrap gap-6 mt-10">
                   {slide.stats.map((item, index) => (
                     <div key={index} className="flex items-center gap-6">
                      
                       <div>
                         <h3 className="text-2xl font-semibold text-[#131C15]">
                           {item.number}
                         </h3>


                         <p className="text-sm text-[#7a8480] mt-1">
                           {item.label}
                         </p>
                       </div>


                       {index !== slide.stats.length - 1 && (
                         <div className="w-px h-12 bg-[#dfe8ec]" />
                       )}
                     </div>
                   ))}
                 </div>
               </motion.div>


               {/* RIGHT IMAGE */}
               <motion.div
                 initial={{ opacity: 0, scale: 0.96 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.8 }}
                 className="relative"
               >
                 <div className="relative rounded-[36px] overflow-hidden">
                   <Image
                     src={slide.image}
                     alt="Dermatology"
                     className="w-auto h-auto object-cover"
                     priority
                   />
                 </div>
               </motion.div>
             </div>
           </SwiperSlide>
         ))}
       </Swiper>
     </div>
   </section>
 );
};


export default HeroSection;


