import { useState } from 'react'
import Signup from './pages/Signup'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import HeroSection from './components/Hero'
import NavBar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import Mentor from './pages/Mentor'
import TopMentors from './components/TopMentors'
import UserDashboard from './pages/UserDashboard'
import MentorDashboard from './pages/MentorDashboard'
import MentorAvailability from './pages/MentorAvailability'
import Profile from './pages/Profile'
import BrowseMentors from './pages/BrowseMentors'

function App() {

  return (
    <BrowserRouter>
    <div className='bg-[#fbf6ee]'>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mentors/:id" element={<Mentor />} />
      <Route path="/mentors" element={<TopMentors />} />
      <Route path="/browse-mentors" element={<BrowseMentors />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/mentor-dashboard" element={<MentorDashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/mentor-availability" element={<MentorAvailability />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/home" element={<HeroSection />} /> */}
     </Routes>
     
     <Footer />
     </div>
    </BrowserRouter>
  )
}

export default App
