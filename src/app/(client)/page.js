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
    <div className="">

    <section className="max-w-7xl mx-auto" id="about">
    <About/>
    </section>

    <section className="bg-linear-[120deg] from-[#315e95] via-[#039bd3] to-[#50b1a2] py-10 md:my-16 mx-5 rounded-4xl" id="services">
      <div className="max-w-7xl mx-auto">
        <Services/>
      </div>
    </section>

    <section className="max-w-7xl mx-auto" id="appointment">
    <AppointmentCTA/>
    </section>

    <section className="max-w-7xl mx-auto" id="whyus">
    <WhyChooseUs/>
    </section>

    <section className="max-w-7xl mx-auto" id="booking">
    <BookingSection/>
    </section>

    <section className="bg-linear-[120deg] from-[#315e95] via-[#039bd3] to-[#50b1a2] py-10 md:my-16 mx-5 rounded-4xl" id="services">
      <div className="max-w-7xl mx-auto">
    <LatestArticles/>
    </div>
    </section>

    <section className="max-w-7xl mx-auto" id="history">
    <HistorySection/>
    </section>

   <section className="bg-linear-[120deg] from-[#315e95] via-[#039bd3] to-[#50b1a2] py-10 md:my-16 mx-5 rounded-4xl" id="services">
      <div className="max-w-7xl mx-auto">
    <Reviews/>
    </div>
    </section>

    <section className="max-w-7xl mx-auto" id="faqs">
    <OnlineConsultationFAQ/>
    </section>
    </div>
    </>
  );
}
