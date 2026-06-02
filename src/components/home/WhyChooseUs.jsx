import {
  HiOutlineShieldCheck,
  HiOutlineLockClosed,
  HiOutlineUserGroup,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { MdOutlineMedication } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";


const valuesData = [
  {
    icon: <HiOutlineShieldCheck />,
    title: "Verified Specialists",
    description:
      "Consult experienced dermatology professionals backed by clinical expertise and evidence-based treatment approaches.",
  },

  {
    icon: <HiOutlineLockClosed />,
    title: "Secure & Private",
    description:
      "Your medical information, consultations, and treatment records are handled with complete confidentiality.",
  },

  {
    icon: <HiOutlineUserGroup />,
    title: "Integrated Care",
    description:
      "Comprehensive dermatology solutions covering skin, hair, nail, cosmetic, and long-term treatment needs.",
  },

  {
    icon: <LuClipboardList />,
    title: "Personalized Follow-Ups",
    description:
      "Structured follow-up plans and ongoing guidance to monitor progress and optimize treatment outcomes.",
  },

  {
    icon: <MdOutlineMedication />,
    title: "Integrated E-Prescriptions",
    description:
      "Receive clear digital prescriptions and treatment instructions for convenient access and continuity of care.",
  },

  {
    icon: <HiOutlineCalendarDays />,
    title: "Easy Scheduling",
    description:
      "Book consultations effortlessly with a streamlined appointment process designed around your convenience.",
  },
];

function WhyChooseUs() {
  return (
    <>
      <section className="px-4 pt-10 md:px-5 md:pt-20">
        <div className="">
          {/* TOP */}
          <div className="text-center">
            {/* LABEL */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2">
              <div className="h-2 w-2 rounded-full bg-primary-accent" />

              <p className="text-xs font-semibold uppercase tracking-[2px] text-primary-accent">
                Why Dr. Charu Garg
              </p>
            </div>

            {/* HEADING */}
            <div className="pt-6">
              <h2 className="text-4xl font-semibold leading-[105%] tracking-[-2px] text-primary-dark md:text-5xl">
                Built Around
                <span className="block text-primary-accent">
                  Care & Clinical Excellence
                </span>
              </h2>
            </div>

            {/* TEXT */}
            <div className="text-center pt-6">
              <p className="text-sm font-medium leading-[190%] text-primary-dark/60 md:text-[16px]">
                Quality dermatology care with a patient-first approach,
                advanced treatments, and trusted clinical expertise.
              </p>
            </div>
          </div>

          {/* CARDS */}
          {/* CARDS */}
<div className="grid gap-4 pt-14 md:grid-cols-2 xl:grid-cols-3">
  {valuesData.map((item, index) => (
    <div
      key={index}
      className="group rounded-[30px] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* TOP */}
      <div className="flex items-center justify-between gap-5">
        {/* TITLE */}
        <div className="max-w-[220px]">
          <h3 className="text-3xl font-semibold leading-[120%]  text-primary-dark">
            {item.title}
          </h3>
        </div>

        {/* ICON */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-[#eef7fb] text-[24px] text-primary-accent transition-all duration-300 group-hover:bg-primary-accent group-hover:text-white">
          {item.icon}
        </div>
      </div>

      {/* LINE */}
      <div className="mt-2 h-px w-full bg-black/5" />

      {/* DESCRIPTION */}
      <p className="pt-6 text-sm font-medium leading-[190%] text-primary-dark/60 md:text-[15px]">
        {item.description}
      </p>
    </div>
  ))}
</div>
        </div>
      </section>
    </>
  );
}

export default WhyChooseUs;