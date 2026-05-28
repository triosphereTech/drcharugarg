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
    image: Three,
    title: "Hair & Scalp Care",
    description:
      "Advanced care for hair fall, scalp conditions, and long-term hair health.",

    link: "/services/hair-fall",
  },

  {
    image: Two,
    title: "Acne & Oily Skin",
    description:
      "Personalized treatments for acne, oily skin, and acne scar management.",

    link: "/services/acne",
  },

  {
    image: Three,
    title: "Pigmentation & Skin Tone",
    description:
      "Targeted solutions for uneven skin tone, pigmentation, and dullness.",

    link: "/services/pigmentation",
  },

  {
    image: One,
    title: "Skin Allergy & Infections",
    description:
      "Expert diagnosis and treatment for allergies, fungal infections, and rashes.",

    link: "/services/skin-infection",
  },

  {
    image: Five,
    title: "Nail Disorders",
    description:
      "Specialized treatment for nail infections, damage, and nail disorders.",

    link: "/services/nail-disorders",
  },

  {
    image: Six,
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
<section className="px-3 pt-10 md:px-5 md:pt-20">
  <div className="">
    {/* TOP */}
    <div className="mx-auto text-center">
      {/* LABEL */}
      <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
        <div className="h-2 w-2 rounded-full bg-primary-accent" />

        <p className="text-xs font-semibold uppercase tracking-[2px] text-primary-accent">
          Our Services
        </p>
      </div>

      {/* HEADING */}
      <div className="pt-6">
        <h2 className="text-4xl font-semibold leading-[105%] tracking-[-2px] text-primary-dark md:text-5xl xl:text-6xl">
          Personalized Dermatology
        </h2>

        <h2 className="pt-2 text-4xl font-semibold leading-[105%] tracking-[-2px] text-primary-accent md:text-5xl xl:text-6xl">
          For Healthy Skin & Hair
        </h2>
      </div>

      {/* SUBTEXT */}
      <div className="mx-auto max-w-[620px] pt-6">
        <p className="text-sm font-medium leading-[190%] text-primary-dark/60 md:text-[16px]">
          Comprehensive skin, hair, and nail treatments designed with modern
          dermatology expertise and personalized care.
        </p>
      </div>
    </div>

    {/* SERVICES GRID */}
    <div className="grid gap-5 pt-14 md:grid-cols-2 xl:grid-cols-3">
      {servicesData.map((item, index) => (
  <Link
    href={item.link}
    key={index}
    className="group rounded-[32px] bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
  >
          {/* IMAGE */}
          <div className="overflow-hidden rounded-[26px]">
            <Image
              src={item.image}
              alt={item.title}
              className="h-[240px] w-full object-cover transition-all duration-700 group-hover:scale-105"
            />
          </div>

          {/* CONTENT */}
          <div className="pt-6">
           

            {/* TITLE */}
            <div className="">
              <h3 className="text-3xl font-semibold leading-[115%] tracking-[-1.5px] text-primary-dark">
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
                  Expert Care
                </p>
              </div>

              <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f8f8f5] text-primary-dark transition-all duration-300 group-hover:bg-primary-accent group-hover:text-white">
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
