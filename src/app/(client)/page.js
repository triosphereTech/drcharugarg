import Hero from "@/components/home/hero"
import About from "@/components/home/about"
import Services from "@/components/home/Services";
import AppointmentCTA from "@/components/global/AppointmentCTA";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HistorySection from "@/components/home/HistorySection";
import LatestArticles from "@/components/home/LatestArticles";
import OnlineConsultationFAQ from "@/components/home/OnlineConsultationFAQ";
import BookingSection from "@/components/home/Bookingsection";
import Reviews from "@/components/home/Reviews";

export default function Home() {
  return (
    <>
    <Hero/>
    <div className="max-w-7xl mx-auto">
    <section id="about">
    <About/>
    </section>
    <section id="services">
    <Services/>
    </section>
    <AppointmentCTA/>
    <section id="whyus">
    <WhyChooseUs/>
    </section>
    <section id="booking">
    <BookingSection/>
    </section>
    <section id="achievements">
    <HistorySection/>
    </section>
    <LatestArticles/>
    <Reviews/>
    <section id="faqs">
    <OnlineConsultationFAQ/>
    </section>
    </div>
    </>
  );
}
