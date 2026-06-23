import AboutCTA from '@/components/about/AboutCTA'
import AboutHero from '@/components/about/abouthero'
import DrProfile from '@/components/about/drprofile'
import OnlineConsultationFAQ from '@/components/home/OnlineConsultationFAQ'
import React from 'react'

function page() {
  return (
    <>
    <AboutHero/>
    <DrProfile/>   
    <AboutCTA/>
    <OnlineConsultationFAQ/> 
    </>
  )
}

export default page
