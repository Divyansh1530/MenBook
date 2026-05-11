import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope
} from 'react-icons/fa'

function Footer() {

  const [mentorCount, setMentorCount] = useState(0)

  useEffect(() => {

    const fetchMentors = async () => {

      try {

        const response = await axios.get(
          'http://localhost:8000/api/v1.1/users/mentors'
        )

        setMentorCount(response.data.data.length)

      } catch (error) {

        console.log(error)
      }
    }

    fetchMentors()

  }, [])

  return (

    <footer className='bg-white border-t border-slate-200 pt-20 pb-8'>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

        {/* TOP SECTION */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14'>

          {/* BRAND */}
          <div>

            <div className='flex items-center gap-3 mb-6'>

              <div className='w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md'>

                <span className='text-white font-black text-xl'>
                  M
                </span>

              </div>

              <span className='font-black text-2xl tracking-tight text-slate-900'>

                MenBook

              </span>

            </div>

            <p className='text-slate-500 text-sm leading-relaxed'>

              Empowering professionals through accessible,
              high-quality 1-on-1 mentorship. Connect with
              {` ${mentorCount}+ `}
              expert mentors and accelerate your career growth.

            </p>

            {/* SOCIALS */}
            <div className='flex items-center gap-4 mt-8'>

              <a
                href='#'
                className='w-10 h-10 rounded-full bg-slate-100 hover:bg-indigo-100 hover:text-indigo-600 text-slate-500 flex items-center justify-center transition-colors'
              >

                <FaGithub size={18} />

              </a>

              <a
                href='#'
                className='w-10 h-10 rounded-full bg-slate-100 hover:bg-indigo-100 hover:text-indigo-600 text-slate-500 flex items-center justify-center transition-colors'
              >

                <FaLinkedin size={18} />

              </a>

              <a
                href='#'
                className='w-10 h-10 rounded-full bg-slate-100 hover:bg-indigo-100 hover:text-indigo-600 text-slate-500 flex items-center justify-center transition-colors'
              >

                <FaTwitter size={18} />

              </a>

              <a
                href='#'
                className='w-10 h-10 rounded-full bg-slate-100 hover:bg-indigo-100 hover:text-indigo-600 text-slate-500 flex items-center justify-center transition-colors'
              >

                <FaEnvelope size={18} />

              </a>

            </div>

          </div>

          {/* PLATFORM */}
          <div>

            <h4 className='font-black text-slate-900 mb-6 text-lg'>

              Platform

            </h4>

            <ul className='space-y-4'>

              <li>

                <Link
                  to='/mentors'
                  className='text-slate-500 hover:text-indigo-600 text-sm transition-colors'
                >

                  Browse Mentors

                </Link>

              </li>

              <li>

                <Link
                  to='/signup'
                  className='text-slate-500 hover:text-indigo-600 text-sm transition-colors'
                >

                  Become a Mentor

                </Link>

              </li>

              <li>

                <Link
                  to='/dashboard'
                  className='text-slate-500 hover:text-indigo-600 text-sm transition-colors'
                >

                  My Bookings

                </Link>

              </li>

              <li>

                <Link
                  to='/mentor-dashboard'
                  className='text-slate-500 hover:text-indigo-600 text-sm transition-colors'
                >

                  Mentor Dashboard

                </Link>

              </li>

            </ul>

          </div>

          {/* SUPPORT */}
          <div>

            <h4 className='font-black text-slate-900 mb-6 text-lg'>

              Support

            </h4>

            <ul className='space-y-4'>

              <li>

                <a
                  href='#'
                  className='text-slate-500 hover:text-indigo-600 text-sm transition-colors'
                >

                  Help Center

                </a>

              </li>

              <li>

                <a
                  href='#'
                  className='text-slate-500 hover:text-indigo-600 text-sm transition-colors'
                >

                  Terms of Service

                </a>

              </li>

              <li>

                <a
                  href='#'
                  className='text-slate-500 hover:text-indigo-600 text-sm transition-colors'
                >

                  Privacy Policy

                </a>

              </li>

              <li>

                <a
                  href='#'
                  className='text-slate-500 hover:text-indigo-600 text-sm transition-colors'
                >

                  Contact Us

                </a>

              </li>

            </ul>

          </div>

          {/* NEWSLETTER */}
          <div>

            <h4 className='font-black text-slate-900 mb-6 text-lg'>

              Stay in the loop

            </h4>

            <p className='text-slate-500 text-sm mb-5 leading-relaxed'>

              Get career advice, mentorship tips and
              platform updates directly in your inbox.

            </p>

            <div className='flex gap-2'>

              <input
                type='email'
                placeholder='Enter your email'
                className='w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm'
              />

              <button
                className='px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm transition-colors'
              >

                Subscribe

              </button>

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className='pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4'>

          <p className='text-slate-400 text-sm'>

            © {new Date().getFullYear()} MenBook Platform.
            All rights reserved.

          </p>

          {/* SOCIALS */}
          <div className='flex gap-4'>

            <a
              href='#'
              className='w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-indigo-100 hover:text-indigo-600 transition-colors'
            >

              <FaTwitter size={16} />

            </a>

            <a
              href='#'
              className='w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-indigo-100 hover:text-indigo-600 transition-colors'
            >

              <FaLinkedin size={16} />

            </a>

            <a
              href='#'
              className='w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-indigo-100 hover:text-indigo-600 transition-colors'
            >

              <FaGithub size={16} />

            </a>

          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer