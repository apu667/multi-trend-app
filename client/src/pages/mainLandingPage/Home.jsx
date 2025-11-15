import CTASection from '@/components/mainLandingPage/CTASection'
import Footer from '@/components/mainLandingPage/Footer'
import Hero from '@/components/mainLandingPage/Hero'
import Navbar from '@/components/mainLandingPage/Navbar'
import Pricing from '@/components/mainLandingPage/Pricing'
import React from 'react'

const Home = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <Pricing />
            <CTASection />
            <Footer />
        </div>
    )
}

export default Home
