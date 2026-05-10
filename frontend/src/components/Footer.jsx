import React from 'react'
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope
} from "react-icons/fa"

function Footer() {
  return (
    <footer className='bg-black text-white pt-24 pb-10 px-6'>

      <div className='max-w-7xl mx-auto'>

        {/* TOP SECTION */}
        <div className='grid lg:grid-cols-4 gap-14 border-b border-white/10 pb-16'>

          {/* BRAND */}
          <div>
            <h2 className='text-4xl font-black'>
              MenBook
            </h2>

            <p className='text-gray-400 mt-6 leading-relaxed'>
              Connect with expert mentors for career guidance,
              coding mentorship, interview preparation and
              professional growth.
            </p>

            <div className='flex items-center gap-4 mt-8'>

              <a
                href='#'
                className='w-11 h-11 rounded-full bg-white/10 hover:bg-white hover:text-black flex items-center justify-center transition'
              >
                <FaGithub size={20} />
              </a>

              <a
                href='#'
                className='w-11 h-11 rounded-full bg-white/10 hover:bg-white hover:text-black flex items-center justify-center transition'
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href='#'
                className='w-11 h-11 rounded-full bg-white/10 hover:bg-white hover:text-black flex items-center justify-center transition'
              >
                <FaTwitter size={20} />
              </a>

              <a
                href='#'
                className='w-11 h-11 rounded-full bg-white/10 hover:bg-white hover:text-black flex items-center justify-center transition'
              >
                <FaEnvelope size={20} />
              </a>

            </div>

          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className='text-2xl font-bold mb-6'>
              Quick Links
            </h3>

            <div className='flex flex-col gap-4 text-gray-400'>
              <a href='#' className='hover:text-white transition'>Home</a>
              <a href='#' className='hover:text-white transition'>Mentors</a>
              <a href='#' className='hover:text-white transition'>Bookings</a>
              <a href='#' className='hover:text-white transition'>Dashboard</a>
            </div>
          </div>

          {/* SPECIALIZATIONS */}
          <div>
            <h3 className='text-2xl font-bold mb-6'>
              Specializations
            </h3>

            <div className='flex flex-col gap-4 text-gray-400'>
              <a href='#' className='hover:text-white transition'>Software Engineering</a>
              <a href='#' className='hover:text-white transition'>Therapy</a>
              <a href='#' className='hover:text-white transition'>Career Guidance</a>
              <a href='#' className='hover:text-white transition'>Business Coaching</a>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className='text-2xl font-bold mb-6'>
              Stay Updated
            </h3>

            <p className='text-gray-400 mb-6'>
              Get updates about new mentors and upcoming sessions.
            </p>

            <div className='flex items-center bg-white/10 rounded-2xl overflow-hidden border border-white/10'>

              <input
                type='email'
                placeholder='Enter email'
                className='bg-transparent w-full px-5 py-4 outline-none text-white placeholder:text-gray-500'
              />

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-gray-500 text-sm'>

          <p>
            © 2026 MenBook. All rights reserved.
          </p>

          <div className='flex items-center gap-6'>
            <a href='#' className='hover:text-white transition'>Privacy Policy</a>
            <a href='#' className='hover:text-white transition'>Terms of Service</a>
            <a href='#' className='hover:text-white transition'>Contact</a>
          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer
