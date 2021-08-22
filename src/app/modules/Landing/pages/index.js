import React from 'react'

import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Wave from '../components/Wave'
import Wave2 from '../components/Wave2'
import Section1 from '../components/Section1'
import Section2 from '../components/Section2'
import Section3 from '../components/Section3'

import '../../../../assets/scss/landing.scss'
import StartNow from '../components/StartNow'
import Footer from '../components/Footer'

const Landing = () => {
    return (
      <div
        className="landing"
      >
        <Navbar />
        <HeroSection />
        <Wave />
        <Section1 />
        <Wave2 />
        <Section2 />
        <Wave />
        <Wave2 />
        <StartNow />
        <Footer />
      </div>
    );
}

export default Landing