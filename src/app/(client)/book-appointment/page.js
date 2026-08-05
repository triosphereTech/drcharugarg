import Emergency from '@/components/Booking/Emergency'
import BookingSection from '@/components/home/Bookingsection'
import React from 'react'

const page = () => {
  return (
    <>
    <section className='py-10 mt-10 bg-white'>
    <BookingSection/>
    <Emergency/>
    </section>
    </>
  )
}

export default page
