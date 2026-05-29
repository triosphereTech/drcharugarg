import ContactFormSection from '@/components/contact/ContactFormSection'
import ContactHero from '@/components/contact/ContactHero'
import OnlineConsultationFAQ from '@/components/home/OnlineConsultationFAQ'
import React from 'react'

function page() {
  return (
    <>
        <ContactHero/>
        <ContactFormSection/>
        <OnlineConsultationFAQ/>
    </>
  )
}

export default page
