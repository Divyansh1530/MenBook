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

function App() {

  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mentors/:id" element={<Mentor />} />
      <Route path="/mentors" element={<TopMentors />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/home" element={<HeroSection />} /> */}
     </Routes>
     <Footer />
    </BrowserRouter>
  )
}

export default App
