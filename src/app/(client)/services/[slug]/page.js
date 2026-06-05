"use client";
import { notFound } from "next/navigation";


import { servicesData } from "../data";


import ServiceHero from "@/components/services/ServiceHero";
import LookLike from "@/components/services/LookLike";
import WhyThisHappen from "@/components/services/WhyThisHappen";
import HOTW from "@/components/services/HOTW";
import TreatmentScope from "@/components/services/TreatmentScope";
import FollowUpCare from "@/components/services/FollowUpCare";
import DoctorMini from "@/components/services/DoctorMini";
import BookingSection from "@/components/home/Bookingsection";
import BeforeAfter from "@/components/services/BeforeAfter";


const Page = async ({ params }) => {


 const { slug } = await params;


 const data = servicesData[slug];


 if (!data) {
   notFound();
 }


 return (
   <>
   <div className="">
   {data.heroSection && (
 <ServiceHero data={data.heroSection} />
)}


{data.lookLikeSection && (
 <LookLike data={data.lookLikeSection} />
)}


{data.whyThisHappenSection && (
  <section className="bg-[#eef7fb]">
 <WhyThisHappen data={data.whyThisHappenSection} />
 </section>
)}


{data.howTreatmentWorksSection && (
 <HOTW data={data.howTreatmentWorksSection} />
)}

<section className="px-4 md:px-5  bg-white">
<BookingSection/>
</section>

{data.beforeAfterSection && (
  <section className="">
    <BeforeAfter data={data.beforeAfterSection} />
  </section>
)}
{data.treatmentScopeSection && (
 <TreatmentScope data={data.treatmentScopeSection} />
)}




{data.followUpSection && (
 <FollowUpCare data={data.followUpSection} />
)}


{data.doctorMiniSection && (
 <DoctorMini data={data.doctorMiniSection} />
)}
</div>


   </>
 );
};


export default Page;