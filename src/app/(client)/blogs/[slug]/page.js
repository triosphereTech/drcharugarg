import Link from "next/link";
import { notFound } from "next/navigation";

// ─── Import all blog JSON files here ───────────────────────────────────────
import BlogOne   from "@/components/blogs/data/BlogOne.json";
import BlogTwo   from "@/components/blogs/data/BlogTwo.json";
import BlogThree from "@/components/blogs/data/BlogThree.json";

const blogMap = {
  "melasma-explained-causes-treatment-why-it-recurs": BlogOne,
  "the-barrier-first-approach":                       BlogTwo,
  "understand-pediatric-atopic-dermatitis":           BlogThree,
  // Add more: "slug": BlogData
};

export async function generateStaticParams() {
  return Object.keys(blogMap).map((slug) => ({ slug }));
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function BulletList({ items, dark = false }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className={`mt-[10px] shrink-0 w-1.5 h-1.5 rounded-full ${dark ? "bg-cyan-300" : "bg-[#058FD2]"}`} />
          <span className={`leading-[1.85] ${dark ? "text-white/85" : "text-slate-700"}`}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DetailList({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-[9px] shrink-0 w-1.5 h-1.5 rounded-full bg-[#058FD2]" />
          <span className="text-slate-700 leading-[1.85]">
            <strong className="font-semibold text-[#131C15]">{item.label}</strong>
            {item.detail ? ` — ${item.detail}` : ""}
          </span>
        </li>
      ))}
    </ul>
  );
}

// The single shared "highlight card" design used identically across all
// three blogs' key-takeaway sections: a deep navy → teal gradient (the same
// medical-brand gradient already used in the page's closing CTA), with two
// soft ambient glows and an icon-badge eyebrow. Content passed through
// unchanged — only container styling and, where needed, text-color
// utilities are adjusted so copy stays readable on the dark background.
function HighlightBox({ label, children }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#082c62] via-[#0A3C84] to-[#0C7A72] p-7 sm:p-9 shadow-[0_20px_50px_-15px_rgba(8,44,98,0.45)]">
      <div className="pointer-events-none absolute -top-20 -left-20 h-56 w-56 rounded-full bg-[#058FD2]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-cyan-200/20 blur-3xl" />

      <div className="relative z-10">
        {label && (
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/20 pl-2 pr-3.5 py-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
              <svg className="h-3 w-3 text-[#0A3C84]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                />
              </svg>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
              {label}
            </span>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BLOG ONE — fixed section rendering
// Identified by: blog.renderer === "blogone"
// ─────────────────────────────────────────────────────────────────────────────

function BlogOneSections({ blog }) {
  const causesSection     = blog.sections.find((s) => s.id === "causes");
  const treatmentSection  = blog.sections.find((s) => s.id === "treatment");
  const recurrenceSection = blog.sections.find((s) => s.id === "recurrence");
  const whyUsSection      = blog.sections.find((s) => s.id === "why-us");

  return (
    <>
      <p className="text-lg text-slate-700 leading-[1.85] border-l-4 border-[#058FD2] pl-5">
        {blog.intro}
      </p>

      <hr className="my-10 border-slate-200" />

      {causesSection && (
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#131C15]">
            {causesSection.heading}
          </h2>
          <ol className="mt-8 space-y-8 list-none">
            {(causesSection.items ?? []).map((item, i) => (
              <li key={i}>
                <h3 className="text-lg font-semibold text-[#131C15]">
                  <span className="text-[#058FD2] mr-2">{i + 1}.</span>
                  {item.title}
                </h3>
                <p className="mt-2 text-slate-700 leading-[1.85]">{item.content}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      <hr className="my-10 border-slate-200" />

      {treatmentSection && (
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#131C15]">
            {treatmentSection.heading}
          </h2>
          {treatmentSection.intro && (
            <p className="mt-4 text-slate-700 leading-[1.85]">{treatmentSection.intro}</p>
          )}
          <ol className="mt-8 space-y-10 list-none">
            {(treatmentSection.items ?? []).map((item, i) => (
              <li key={i}>
                <h3 className="text-lg font-semibold text-[#131C15]">
                  <span className="text-[#058FD2] mr-2">{i + 1}.</span>
                  {item.title}
                </h3>
                {item.content && (
                  <p className="mt-2 text-slate-700 leading-[1.85]">{item.content}</p>
                )}
                {item.list && <DetailList items={item.list} />}
              </li>
            ))}
          </ol>
        </section>
      )}

      <hr className="my-10 border-slate-200" />

      {recurrenceSection && (
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#131C15]">
            {recurrenceSection.heading}
          </h2>
          <p className="mt-4 text-slate-700 leading-[1.85]">{recurrenceSection.content}</p>
        </section>
      )}

      <hr className="my-10 border-slate-200" />

{whyUsSection && (
  <section>
    <HighlightBox label="Take Home Message">
      <h2 className="text-2xl font-bold text-white">
        {whyUsSection.heading}
      </h2>

      <p className="mt-4 text-white/85 leading-[1.85]">
        {whyUsSection.content}
      </p>

      {(whyUsSection.points ?? []).length > 0 && (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {whyUsSection.points.map((point, i) => (
            <li key={i} className="flex gap-3 rounded-xl bg-white/10 ring-1 ring-white/15 p-4">
              <svg
                className="mt-1 h-5 w-5 shrink-0 text-cyan-200"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                />
              </svg>

              <span className="text-sm leading-6 text-white/85">
                {point}
              </span>
            </li>
          ))}
        </ul>
      )}
    </HighlightBox>
  </section>
)}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DYNAMIC SECTION RENDERER (BlogTwo, BlogThree and beyond)
// ─────────────────────────────────────────────────────────────────────────────

function DynamicSection({ section, dark = false }) {
  switch (section.type) {

    case "text":
      return (
        <section>
          {section.heading && (
            <h2 className="text-2xl sm:text-3xl font-bold text-[#131C15] mb-4">
              {section.heading}
            </h2>
          )}
          {Array.isArray(section.paragraphs) && section.paragraphs.length > 0
            ? section.paragraphs.map((p, i) => (
                <p key={i} className="mt-4 first:mt-0 text-slate-700 leading-[1.85]">{p}</p>
              ))
            : section.content
              ? <p className="text-slate-700 leading-[1.85]">{section.content}</p>
              : null
          }
        </section>
      );

    case "text-with-bullets":
      return (
        <section>
          {section.heading && (
            <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${dark ? "text-white" : "text-[#131C15]"}`}>
              {section.heading}
            </h2>
          )}
          {section.content && (
            <p className={`leading-[1.85] ${dark ? "text-white/85" : "text-slate-700"}`}>{section.content}</p>
          )}
          <BulletList items={section.bullets} dark={dark} />
          {section.closing && (
            <p className={`mt-5 leading-[1.85] ${dark ? "text-white/85" : "text-slate-700"}`}>{section.closing}</p>
          )}
        </section>
      );

    case "triggers":
      return (
        <section>
          {section.heading && (
            <h2 className="text-2xl sm:text-3xl font-bold text-[#131C15] mb-4">
              {section.heading}
            </h2>
          )}
          {section.intro && (
            <p className="text-slate-700 leading-[1.85]">{section.intro}</p>
          )}
          <BulletList items={section.generalTriggers} />
          {section.contactNote && (
            <p className="mt-6 text-slate-700 leading-[1.85]">{section.contactNote}</p>
          )}
          <BulletList items={section.contactTriggers} />
          {section.closing && (
            <p className="mt-5 text-slate-700 leading-[1.85]">{section.closing}</p>
          )}
        </section>
      );

    case "numbered-list":
      return (
        <section>
          {section.heading && (
            <h2 className="text-2xl sm:text-3xl font-bold text-[#131C15]">
              {section.heading}
            </h2>
          )}
          {section.intro && (
            <p className="mt-4 text-slate-700 leading-[1.85]">{section.intro}</p>
          )}
          {(section.items ?? []).map((item, i) => (
            <div key={i}>
              <BulletList items={item.bullets} />
            </div>
          ))}
          {section.additionalContent && (
            <p className="mt-5 text-slate-700 leading-[1.85]">{section.additionalContent}</p>
          )}
          <BulletList items={section.additionalBullets} />
          {section.closingContent && (
            <p className="mt-5 text-slate-700 leading-[1.85]">{section.closingContent}</p>
          )}
          {(section.jobs ?? []).length > 0 && (
            <ol className="mt-6 space-y-6 list-none">
              {section.jobs.map((job, i) => (
                <li key={i}>
                  <h3 className="text-base font-semibold text-[#131C15]">
                    <span className="text-[#058FD2] mr-2">{i + 1}.</span>
                    {job.title}
                  </h3>
                  <p className="mt-1.5 text-slate-700 leading-[1.85]">{job.content}</p>
                </li>
              ))}
            </ol>
          )}
        </section>
      );

    case "image":
      return (
        <figure className="my-2">
          <div className="relative w-full rounded-2xl overflow-hidden">
            <img
              src={section.src}
              alt={section.alt}
              className="w-full h-full object-cover"
            />
          </div>
          {section.caption && (
            <figcaption className="mt-3 text-center text-sm text-slate-400 italic">
              {section.caption}
            </figcaption>
          )}
        </figure>
      );

    case "routine":
      return (
        <section>
          {section.heading && (
            <h2 className={`text-2xl sm:text-3xl font-bold ${dark ? "text-white" : "text-[#131C15]"}`}>
              {section.heading}
            </h2>
          )}
          {section.intro && (
            <p className={`mt-4 leading-[1.85] ${dark ? "text-white/85" : "text-slate-700"}`}>{section.intro}</p>
          )}
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {(section.steps ?? []).map((step, i) => (
              <div
                key={i}
                className={
                  dark
                    ? "rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm"
                    : "rounded-xl border border-slate-200 bg-slate-50 p-5"
                }
              >
                <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${dark ? "text-cyan-200" : "text-[#058FD2]"}`}>
                  {step.time}
                </p>
                <ul className="space-y-2">
                  {(step.items ?? []).map((item, j) => (
                    <li key={j} className="flex gap-2.5">
                      <span className={`mt-[10px] shrink-0 w-1.5 h-1.5 rounded-full ${dark ? "bg-cyan-300" : "bg-[#058FD2]"}`} />
                      <span className={`text-sm leading-[1.8] ${dark ? "text-white/85" : "text-slate-700"}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      );

    default:
      return null;
  }
}

function DynamicBlogSections({ blog }) {
  return (
    <>
      <p className="text-lg text-slate-700 leading-[1.85] border-l-4 border-[#058FD2] pl-5">
        {blog.intro}
      </p>

      {(blog.sections ?? []).map((section, i) => {
        const isImage = section.type === "image";
        const isHighlighted = section.highlight === true;

        return (
          <div key={section.id ?? i}>
            {i > 0 && !isImage && <hr className="my-10 border-slate-200" />}
            {isImage && <div className="my-10" />}

            {isHighlighted ? (
              <HighlightBox label={section.highlightLabel}>
                <DynamicSection section={section} dark />
              </HighlightBox>
            ) : (
              <DynamicSection section={section} />
            )}

            {isImage && <div className="mb-2" />}
          </div>
        );
      })}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const blog = blogMap[slug];
  if (!blog) notFound();

  // Use explicit renderer field in JSON, fallback to checking for BlogOne's
  // unique section IDs ("why-us" and "recurrence" only exist in BlogOne)
  const isBlogOne =
    blog.renderer === "blogone" ||
    blog.sections.some((s) => s.id === "why-us" || s.id === "recurrence");

  return (
    <main className="bg-linear-to-b from-white to-[#eef7fb] min-h-screen pt-10 md:pt-16">

      {/* ─── TITLE BLOCK ──────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-5 pt-14 pb-8">
        <span className="inline-block rounded-full bg-[#eef7fb] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#058FD2]">
          {blog.category}
        </span>

        <h1 className="mt-4 text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-[#131C15] leading-[1.2] tracking-tight">
          {blog.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
          <span className="font-medium text-slate-700">{blog.author}</span>
          <span className="text-slate-300">·</span>
          <span>{blog.publishedDate}</span>
          <span className="text-slate-300">·</span>
          <span>{blog.readTime} read</span>
        </div>
      </div>

      {/* ─── HERO IMAGE ───────────────────────────────────────────────── */}
      {/* Skipped when blog.hideHeroImage is true (e.g. Blog Two, which shows
          its image only in the middle "inline-image" section instead). */}
      {!blog.hideHeroImage && (
        <div className="max-w-3xl mx-auto px-5">
          <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden">
            <img
              src={blog.heroImage}
              alt={blog.heroImageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* ─── ARTICLE BODY ─────────────────────────────────────────────── */}
      <article className="max-w-3xl mx-auto px-5 py-12">

        {isBlogOne
          ? <BlogOneSections blog={blog} />
          : <DynamicBlogSections blog={blog} />
        }

        {/* ─── CTA ──────────────────────────────────────────────────── */}
       <div className="relative mt-16 overflow-hidden rounded-3xl border border-[#058FD2]/10 bg-linear-to-br from-[#082c62] via-[#0A3C84] to-[#0C7A72] p-8 text-center shadow-sm">
  {/* Background Glow */}
  <div className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-[#058FD2]/10 blur-3xl" />
  <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-cyan-200/20 blur-3xl" />

  <div className="relative z-10">
    <h3 className="text-xl font-bold text-white">
      Ready to Start Your Treatment?
    </h3>
    <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Link
        href="/book-appointment"
        className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#047ab8] hover:text-white hover:shadow-lg sm:w-auto"
      >
        Book Your Consultation
      </Link>

      <Link
        href="/contact"
        className="inline-flex w-full items-center justify-center rounded-full border border-[#058FD2] bg-white px-8 py-3.5 text-sm font-semibold text-[#00496d] backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-md sm:w-auto"
      >
        Contact Us
      </Link>
    </div>
  </div>
</div>
      </article>
    </main>
  );
}