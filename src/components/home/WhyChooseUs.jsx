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
    title: "Ethics",
    description:
      "Trust, transparency, and patient-first practice.",
  },

  {
    icon: <HiOutlineLockClosed />,
    title: "Secure & Private",
    description:
      "Complete confidentiality and secure handling of your personal information",
  },

  {
    icon: <HiOutlineUserGroup />,
    title: "Evidence-based Practise",
    description:
      "Scientifically guided treatments based on latest medical evidence.",
  },

  {
    icon: <LuClipboardList />,
    title: "Trustworthiness",
    description:
      "Your confidence and well-being remain at the center of our approach.",
  },

  {
    icon: <MdOutlineMedication />,
    title: "Integrated E-Prescriptions",
    description:
      "Convenient e-prescriptions for a seamless treatment experience.",
  },

  {
    icon: <HiOutlineCalendarDays />,
    title: "Easy Scheduling",
    description:
      "Simple and hassle-free appointment scheduling for timely care.",
  },
];

function WhyChooseUs() {
  return (
    <>
      <section className="px-4 py-10 md:px-5 md:py-0 md:pt-20">
        <div className="">
          {/* TOP */}
          <div className="text-center">
            {/* LABEL */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2">
              <div className="h-2 w-2 rounded-full bg-primary-accent" />

              <p className="text-xs md:text-xs font-semibold uppercase tracking-[2px] text-primary-accent">
                Why Choose Us
              </p>
            </div>

            {/* HEADING */}
            <div className="pt-6">
              <h2 className="text-3xl md:text-5xl font-semibold leading-[105%] text-primary-dark">
                Built Around
                <span className="block text-primary-accent">
                  Care & Clinical Excellence
                </span>
              </h2>
            </div>
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-2 gap-3 pt-8 md:grid-cols-2 md:gap-4 md:pt-14 xl:grid-cols-3">
            {valuesData.map((item, index) => (
              <div
                key={index}
                className="group rounded-[18px] bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:rounded-[30px] md:p-5"
              >
                {/* TOP */}
                <div className="flex items-center justify-between gap-2 md:gap-5">
                  {/* TITLE */}
                  <div className="max-w-[220px]">
                    <h3 className="text-sm font-semibold leading-[120%] text-primary-dark md:text-2xl">
                      {item.title}
                    </h3>
                  </div>

                  {/* ICON */}
                  <div className="hidden md:flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[#eef7fb] text-[16px] text-primary-accent transition-all duration-300 group-hover:bg-primary-accent group-hover:text-white md:h-14 md:w-14 md:rounded-[20px] md:text-[24px]">
                    {item.icon}
                  </div>
                </div>

                {/* LINE */}
                <div className="mt-2 h-px w-full bg-black/5" />

                {/* DESCRIPTION */}
                <p className="pt-2 text-xs font-medium leading-[160%] text-primary-dark/60 md:pt-6 md:text-[15px] md:leading-[190%] md:text-md">
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