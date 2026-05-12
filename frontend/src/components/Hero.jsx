import React, { useEffect, useState } from 'react'
import {
  ArrowRight,
  Star,
  Calendar,
  ShieldCheck,
  Video
} from 'lucide-react'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Hero() {

  const navigate = useNavigate()

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

    <section className='pt-42 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden'>

      <div className='flex flex-col lg:flex-row items-center gap-12 lg:gap-8'>

        {/* LEFT SIDE */}
        <div className='flex-1 text-center'>

          {/* TOP BADGE */}
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-medium text-sm mb-6 shadow-sm'>

            <Star className='w-4 h-4 fill-indigo-600' />

            <span>
              Top rated mentorship platform
            </span>

          </div>

          {/* HEADING */}
          <h1 className='hero-heading text-5xl lg:text-6xl font-semibold text-slate-900  mb-6 tracking-normal '>

            Book Mentors{' '}

            <span className='block text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-indigo-400'>

              Grow Faster

            </span>

          </h1>

          {/* DESCRIPTION */}
          <p className='text-lg text-slate-600 mb-8 max-w-2xl mx-auto px-18 md:px-0 leading-relaxed'>

            Connect with experienced mentors for coding,
            careers, design, business and personal growth.
            Book 1-on-1 sessions instantly.

          </p>

          {/* BUTTONS */}
          <div className='flex flex-col sm:flex-row items-center gap-4 justify-center'>

            <button
              onClick={() => navigate('/mentors')}
              className='w-50 sm:w-auto px-3 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2'
            >

              Explore Mentors

              <ArrowRight className='w-5 h-5' />

            </button>

            <button
              onClick={() => navigate('/signup')}
              className='w-50 sm:w-auto px-3 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-semibold text-lg transition-all shadow-sm'
            >

              Become a Mentor

            </button>

          </div>

          {/* SOCIAL PROOF */}
          <div className='mt-10 flex items-center gap-4 justify-center'>

            <div className='flex -space-x-3'>

              <img
                src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
                alt='user'
                className='w-10 h-10 rounded-full border-2 border-white object-cover'
              />

              <img
                src='https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80'
                alt='user'
                className='w-10 h-10 rounded-full border-2 border-white object-cover'
              />

              <img
                src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'
                alt='user'
                className='w-10 h-10 rounded-full border-2 border-white object-cover'
              />

              <div className='w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600'>

                +{mentorCount}

              </div>

            </div>

            <div className='text-sm text-slate-600'>

              <span className='font-bold text-slate-900'>
                4.9/5
              </span>{' '}

              from thousands of mentorship sessions

            </div>

          </div>

          {/* STATS */}
          <div className='flex items-center justify-center gap-x-24 mt-14 text-center'>
          {/* Stat 1 */}
          <div className="flex flex-col">
          <h2 className='text-3xl font-black text-slate-900 tracking-tight leading-none'>
              {mentorCount}+
          </h2>
          <p className='text-slate-500 mt-2 text-sm font-medium'>
            Mentors
          </p>
        </div>

  {/* Visual Divider (Optional but adds a human touch) */}
  <div className="h-8 w-px bg-slate-200 mx-2" />

  {/* Stat 2 */}
  <div className="flex flex-col">
    <h2 className='text-3xl font-black text-slate-900 tracking-tight leading-none'>
      10k+
    </h2>
    <p className='text-slate-500 mt-2 text-sm font-medium'>
      Sessions
    </p>
  </div>

  {/* Visual Divider */}
  <div className="h-8 w-px bg-slate-200 mx-2" />

  {/* Stat 3 */}
  <div className="flex flex-col">
    <h2 className='text-3xl font-black text-slate-900 tracking-tight leading-none'>
      4.9★
    </h2>
    <p className='text-slate-500 mt-2 text-sm font-medium'>
      Ratings
    </p>
  </div>
</div>

        </div>
       
      </div>

    </section>
  )
}

export default Hero