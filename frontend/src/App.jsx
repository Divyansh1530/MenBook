import { useState } from 'react'
import Signup from './pages/Signup'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import HeroSection from './components/Hero'
import NavBar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'

function App() {

  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/home" element={<HeroSection />} /> */}
     </Routes>
     <Footer />
    </BrowserRouter>
  )
}

export default App
