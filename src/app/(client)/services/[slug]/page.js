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
 <WhyThisHappen data={data.whyThisHappenSection} />
)}


{data.howTreatmentWorksSection && (
 <HOTW data={data.howTreatmentWorksSection} />
)}

<section className="px-4 pt-0 md:px-5 md:pt-20 bg-white">
<BookingSection/>
</section>

{data.treatmentScopeSection && (
 <TreatmentScope data={data.treatmentScopeSection} />
)}

{data.beforeAfterSection && (
  <BeforeAfter data={data.beforeAfterSection} />
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