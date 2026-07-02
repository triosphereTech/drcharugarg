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
import AboutCTA from "@/components/about/AboutCTA";
import OurJourney from "@/components/home/OurJourney";

export default function Home() {
  return (
    <>
    <Hero/>
    <div className="">

    <section className="max-w-7xl mx-auto" id="about">
    <About/>
    </section>

<section className="text-center">
  {/* <div className="pt-6 flex flex-col items-center">
    <p className="w-fit mx-auto rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[2px] text-primary-accent">
      Our Services
    </p>

    <h2 className="mt-4 text-4xl font-semibold leading-[105%] tracking-[-2px] text-primary-dark md:text-5xl">
      Built Around
      <span className="block text-primary-accent">
        Care & Clinical Excellence
      </span>
    </h2>
  </div> */}
</section>

<section
  className="mx-auto my-16 max-w-7xl rounded-4xl bg-linear-[120deg] from-[#315e95] via-[#039bd3] to-[#50b1a2] py-10"
  id="services"
>
  <div className="px-8">
    <Services />
  </div>
</section>

    <section className="max-w-7xl mx-auto" id="appointment">
    <AppointmentCTA/>
    </section>

    <section className="max-w-7xl mx-auto" id="whyus">
    <WhyChooseUs/>
    </section>

    {/* <section className="max-w-7xl mx-auto" id="booking">
    <BookingSection/>
    </section> */}

    <section  className="bg-linear-[120deg] from-[#315e95] via-[#039bd3] to-[#50b1a2] py-10 md:my-16 max-w-7xl mx-auto rounded-4xl" id="services">
      <div className="px-8" id="blogs">
    <LatestArticles/>
    </div>
    </section>

    <section className=" bg-linear-to-b from-[#eef7fb] to-white mx-auto" id="history">
    <OurJourney/>
    </section>

   <section className="bg-linear-[120deg] from-[#315e95] via-[#039bd3] to-[#50b1a2]" id="services">
      <div className="px-8">
    <Reviews/>
    </div>
    </section>

    <section className="max-w-7xl mx-auto" id="faqs">
    <OnlineConsultationFAQ/>
    </section>
     <section className="max-w-7xl mx-auto pt-20" id="cta">
      <AboutCTA/>
     </section>
    </div>
    </>
  );
}
