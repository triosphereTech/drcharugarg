import { HiArrowUpRight } from "react-icons/hi2";
import Image from "next/image";
import One from "../../../public/images/services/01.jpeg";
import Two from "../../../public/images/services/02.jpeg";
import Three from "../../../public/images/services/03.jpeg";
import Four from "../../../public/images/services/04.jpeg";
import Five from "../../../public/images/services/05.jpeg";
import Six from "../../../public/images/services/06.jpeg";
import Link from "next/link";

// UPDATED servicesData

const servicesData = [
  {
    image:
      "/images/services/hairfall/hero/hero.png",
    title: "Hair & Scalp Care",
    description:
      "Advanced care for hair fall and scalp health. ",

    link: "/services/hair-fall",
  },

  {
    image:
      "/images/services/acne/home/hero.png",
    title: "Acne & Oily Skin",
    description:
      "Expert solutions for breakouts and acne scars",

    link: "/services/acne-oily",
  },

  {
    image:
      "/images/services/pigmantation/hero/hero.png",
    title: "Pigmentation & Skin Tone",
    description:
      "Dark patches to Dull skin.",

    link: "/services/pigmentation",
  },

  {
    image:
      "/images/services/Infaction/hero/hero.png",
    title: "Skin allergy",
    description:
      "Diagnosis and management of skin infections and dermatitis.",

    link: "/services/skin-infection",
  },

  {
    image:
      "/images/services/nails/hero/hero.png",
    title: "Nail Disorders",
    description:
      "Specialized treatment for all nail related concerns.",

    link: "/services/nail-disorders",
  },

  {
    image:
      "/images/services/followup/hero/hero.png",
    title: "Ongoing Care & Follow-up",
    description:
      "Continuous follow-up care focused on long-term healthy skin results.",

    link: "/services/follow-up-care",
  },
];

function Services() {
  return (
    <>
      {/* SERVICES */}
      <section className="px-4  md:px-5">
        <div className="">
          {/* TOP */}
          <div className="mx-auto text-center">
            <div className="pt-6 flex flex-col items-center">
              {/* <p className="w-fit mx-auto rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[2px] text-primary-accent">
                Our Services
              </p> */}

              <h2 className="mt-4 text-4xl md:text-5xl font-semibold leading-[105%] text-white">
                <span className="block text-white "> Our Services</span>
              </h2>
            </div>
            {/* LABEL */}
            {/* <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 shadow-sm">
              
              <p className="text-xl font-semibold uppercase tracking-[2px] text-white ">
                Our Services
              </p>
            </div> */}

            {/* HEADING */}
            {/* <div className="pt-6">
              <h2 className="text-4xl font-semibold leading-[105%]  text-primary-dark md:text-5xl xl:text-5xl">
                Personalized Dermatology
              </h2>

              <h2 className="pt-2 text-4xl font-semibold leading-[105%]  text-primary-accent md:text-5xl xl:text-5xl">
                For Healthy Skin & Hair
              </h2>
            </div> */}

            {/* SUBTEXT */}
            <div className="mx-auto max-w-[800px] pt-6">
              <p className="text-sm font-medium leading-[190%] text-white/80 md:text-[20px]">
                We provide comprehensive dermatology care, offering expert medical, surgical, and advanced aesthetic treatments tailored to each individual's needs. Our commitment is to deliver personalized, evidence-based care using modern technology and the highest standards in skin, hair, and nail health.
              </p>
            </div>
          </div>

          {/* SERVICES GRID */}
          <div className="grid gap-5 pt-14 md:grid-cols-2 xl:grid-cols-3">
            {servicesData.map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className="group rounded-[32px] bg-white/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* IMAGE */}
                <div className="overflow-hidden rounded-[26px]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[240px] w-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                </div>

                {/* CONTENT */}
                <div className="pt-6">
                  {/* TITLE */}
                  <div className="">
                    <h3 className="text-3xl font-semibold leading-[115%] text-primary-dark">
                      {item.title}
                    </h3>

                    <p className="pt-4 text-sm font-medium leading-[190%] text-primary-dark/60 md:text-[15px]">
                      {item.description}
                    </p>
                  </div>
                  {/* TOP ROW */}
                  <div className="flex items-center justify-between gap-4 pt-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#f8f8f5] px-3 py-2">
                      <div className="h-2 w-2 rounded-full bg-primary-accent" />

                      <p className="text-[10px] font-semibold uppercase tracking-[2px] text-primary-dark/50">
                        Read More
                      </p>
                    </div>

                    <button className="flex h-11 w-11 items-center cursor-pointer justify-center rounded-full bg-[#f8f8f5] text-primary-dark transition-all duration-300 group-hover:bg-primary-accent group-hover:text-white">
                      <HiArrowUpRight className="text-lg" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
