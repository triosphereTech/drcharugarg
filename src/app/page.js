import Image from "next/image";
import Hero from "@/components/home/hero"
import About from "@/components/home/about"
import Services from "@/components/home/Services";
import AppointmentCTA from "@/components/global/AppointmentCTA";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HistorySection from "@/components/home/HistorySection";
import LatestArticles from "@/components/home/LatestArticles";
import OnlineConsultationFAQ from "@/components/home/OnlineConsultationFAQ";
import BookingSection from "@/components/home/Bookingsection";

export default function Home() {
  return (
    <>
    <div className="max-w-7xl mx-auto">

    
    <Hero/>
    <About/>
    <Services/>
    <AppointmentCTA/>
    <WhyChooseUs/>
    <BookingSection/>
    <HistorySection/>
    <LatestArticles/>
    <OnlineConsultationFAQ/>
    </div>
    </>
  );
}
