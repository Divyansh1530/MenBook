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

    <section className='pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden'>

      <div className='flex flex-col lg:flex-row items-center gap-12 lg:gap-8'>

        {/* LEFT SIDE */}
        <div className='flex-1 text-center lg:text-left'>

          {/* TOP BADGE */}
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-medium text-sm mb-6 shadow-sm'>

            <Star className='w-4 h-4 fill-indigo-600' />

            <span>
              Top rated mentorship platform
            </span>

          </div>

          {/* HEADING */}
          <h1 className='text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight'>

            Unlock Your Potential with{' '}

            <span className='text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-indigo-400'>

              1-on-1 Mentorship

            </span>

          </h1>

          {/* DESCRIPTION */}
          <p className='text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed'>

            Accelerate your career growth by connecting
            with industry experts. Get personalized
            guidance, interview preparation, coding help,
            portfolio reviews, and actionable advice to
            reach your goals faster.

          </p>

          {/* BUTTONS */}
          <div className='flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start'>

            <button
              onClick={() => navigate('/mentors')}
              className='w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 hover:-translate-y-0.5'
            >

              Explore Mentors

              <ArrowRight className='w-5 h-5' />

            </button>

            <button
              onClick={() => navigate('/signup')}
              className='w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-semibold text-lg transition-all shadow-sm'
            >

              Become a Mentor

            </button>

          </div>

          {/* SOCIAL PROOF */}
          <div className='mt-10 flex items-center gap-4 justify-center lg:justify-start'>

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
          <div className='grid grid-cols-3 gap-6 mt-14'>

            <div>

              <h2 className='text-3xl font-black text-slate-900'>
                {mentorCount}+
              </h2>

              <p className='text-slate-500 mt-1'>
                Mentors
              </p>

            </div>

            <div>

              <h2 className='text-3xl font-black text-slate-900'>
                10k+
              </h2>

              <p className='text-slate-500 mt-1'>
                Sessions
              </p>

            </div>

            <div>

              <h2 className='text-3xl font-black text-slate-900'>
                4.9★
              </h2>

              <p className='text-slate-500 mt-1'>
                Ratings
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className='flex-1 w-full relative'>

          {/* BACKGROUND */}
          <div className='absolute inset-0 bg-linear-to-tr from-indigo-100 to-white rounded-3xl transform rotate-3 scale-105 -z-10'></div>

          {/* MAIN IMAGE */}
          <img
            src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80'
            alt='workspace'
            className='w-full h-auto rounded-3xl shadow-xl border border-slate-100 object-cover aspect-4/3'
          />

          {/* FLOATING CARD */}
          <div
            className='absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce'
            style={{
              animationDuration: '3s'
            }}
          >

            <div className='w-14 h-14 bg-green-100 rounded-full flex items-center justify-center'>

              <div className='w-4 h-4 bg-green-500 rounded-full'></div>

            </div>

            <div>

              <div className='text-sm font-bold text-slate-900'>
                {mentorCount}+ Mentors
              </div>

              <div className='text-xs text-slate-500'>
                Available online now
              </div>

            </div>

          </div>

          {/* SESSION PREVIEW */}
          <div className='absolute top-6 right-6 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-5 w-72 border border-slate-100 hidden md:block'>

            <div className='flex items-center justify-between mb-5'>

              <div>

                <h3 className='text-lg font-bold text-slate-900'>
                  Upcoming Session
                </h3>

                <p className='text-slate-500 text-sm'>
                  Mentorship Preview
                </p>

              </div>

              <div className='bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold'>

                Live

              </div>

            </div>

            <div className='space-y-4'>

              <div className='flex items-center gap-4 bg-slate-100 rounded-xl p-4'>

                <div className='w-12 h-12 rounded-full bg-linear-to-br from-indigo-500 to-purple-500'></div>

                <div>

                  <h4 className='font-semibold text-slate-900'>
                    Aman Sharma
                  </h4>

                  <p className='text-sm text-slate-500'>
                    Frontend Engineer
                  </p>

                </div>

              </div>

              <div className='grid grid-cols-2 gap-3'>

                <div className='bg-slate-100 rounded-xl p-4'>

                  <Calendar
                    className='mb-2 text-indigo-600'
                    size={20}
                  />

                  <p className='text-xs text-slate-500'>
                    Session Date
                  </p>

                  <h4 className='font-semibold text-slate-900 mt-1'>
                    15 May
                  </h4>

                </div>

                <div className='bg-slate-100 rounded-xl p-4'>

                  <Video
                    className='mb-2 text-indigo-600'
                    size={20}
                  />

                  <p className='text-xs text-slate-500'>
                    Mode
                  </p>

                  <h4 className='font-semibold text-slate-900 mt-1'>
                    Video Call
                  </h4>

                </div>

              </div>

              <div className='bg-slate-100 rounded-xl p-4 flex items-center justify-between'>

                <div className='flex items-center gap-3'>

                  <ShieldCheck
                    className='text-green-500'
                    size={22}
                  />

                  <div>

                    <h4 className='font-semibold text-slate-900'>
                      Secure Payment
                    </h4>

                    <p className='text-xs text-slate-500'>
                      Protected by Razorpay
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Hero