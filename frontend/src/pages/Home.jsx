import React from 'react'
import NavBar from '../components/Navbar'
import Hero from '../components/Hero'
import Specialization from '../components/Specialization'
import TopMentors from '../components/TopMentors'
import MentorCTA from '../components/MentorCTA'

function Home() {
  return (
    <>
        <Hero />
        <Specialization />
        <TopMentors />
        <MentorCTA />
    </>
  )
}

export default Home