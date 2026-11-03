import React from 'react'
import Hero from '../components/home/Hero'
import AboutPreview from '../components/home/AboutPreview'
import ProductRange from '../components/home/ProductRange'
import BusinessDivisions from '../components/home/BusinessDivisions'
import IndustriesWeServe from '../components/home/IndustriesWeServe'
import WhyChooseUs from '../components/home/WhyChooseUs'
import BulkOrdersCTA from '../components/home/BulkOrdersCTA'
import Testimonials from '../components/home/Testimonials'

const Home = () => {
  return (
    <div>
      <Hero/>
      <ProductRange/>
      <AboutPreview/>
      <BusinessDivisions/>
      {/* <IndustriesWeServe/> */}
      <WhyChooseUs/>
      <BulkOrdersCTA/>
      <Testimonials/>
    </div>
  )
}

export default Home
