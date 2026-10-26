import React from 'react'

const page = () => {
  return (
    <main className="min-h-screen bg-linear-to-b from-white to-[#eef7fa] px-4 pt-34  sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl rounded-2xl p-6 sm:p-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#058FD2]">Patient information</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Privacy Policy</h1>

        <section className="mt-10 border-t border-slate-100 pt-8" aria-labelledby="cancellation-policy">
          <h2 id="cancellation-policy" className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Appointment Cancellation &amp; Refund Policy
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
            Refund eligibility depends on how far in advance you cancel your scheduled appointment:
          </p>
          <ul className="mt-5 space-y-3">
            <li className="flex gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700 sm:text-base">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#058FD2]" />
              <span><strong className="font-semibold text-slate-900">More than 24 hours before:</strong> 100% refund.</span>
            </li>
            <li className="flex gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700 sm:text-base">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#058FD2]" />
              <span><strong className="font-semibold text-slate-900">12–24 hours before:</strong> 50% refund.</span>
            </li>
            <li className="flex gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700 sm:text-base">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#058FD2]" />
              <span><strong className="font-semibold text-slate-900">Less than 12 hours before:</strong> No refund (0%).</span>
            </li>
          </ul>
          <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
            Refunds, where applicable, will be processed to the original payment method.
          </p>
        </section>
      </article>
    </main>
  )
}

export default page
