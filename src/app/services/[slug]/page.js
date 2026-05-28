// app/services/[slug]/page.js

import { notFound } from "next/navigation";

import { servicesData } from "../data";

import ServiceHero from "@/components/services/ServiceHero";
import LookLike from "@/components/services/LookLike";
import WhyThisHappen from "@/components/services/WhyThisHappen";
import HOTW from "@/components/services/HOTW";
import TreatmentScope from "@/components/services/TreatmentScope";
import FollowUpCare from "@/components/services/FollowUpCare";
import DoctorMini from "@/components/services/DoctorMini";

const Page = async ({ params }) => {

  const { slug } = await params;

  const data = servicesData[slug];

  if (!data) {
    notFound();
  }

  return (
    <>
    <div className="">
    {data.slides && <ServiceHero data={data} />}

{data.lookLikeSection && (
  <LookLike data={data.lookLikeSection} />
)}

{data.whyThisHappenSection && (
  <WhyThisHappen data={data.whyThisHappenSection} />
)}

{data.howTreatmentWorksSection && (
  <HOTW data={data.howTreatmentWorksSection} />
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