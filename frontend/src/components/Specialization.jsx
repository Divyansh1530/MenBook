import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import {
  HeartPulse,
  PenTool,
  Server,
  Megaphone,
  Briefcase,
  Brain,
  Camera,
  Mic,
  ArrowRight
} from 'lucide-react'

function Specialization() {

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

  /*
    SPECIALIZATIONS
  */

  const categories = [

    {
      id: 1,
      name: 'Therapists',
      icon: HeartPulse,
      count: `${mentorCount}+ Mentors`,
      color: 'bg-rose-100 text-rose-600'
    },

    {
      id: 2,
      name: 'UI/UX Designers',
      icon: PenTool,
      count: `${mentorCount}+ Mentors`,
      color: 'bg-indigo-100 text-indigo-600'
    },

    {
      id: 3,
      name: 'Backend Developers',
      icon: Server,
      count: `${mentorCount}+ Mentors`,
      color: 'bg-emerald-100 text-emerald-600'
    },

    {
      id: 4,
      name: 'Marketing Experts',
      icon: Megaphone,
      count: `${mentorCount}+ Mentors`,
      color: 'bg-amber-100 text-amber-600'
    },

    {
      id: 5,
      name: 'Career Coaches',
      icon: Briefcase,
      count: `${mentorCount}+ Mentors`,
      color: 'bg-blue-100 text-blue-600'
    },

    {
      id: 6,
      name: 'Psychologists',
      icon: Brain,
      count: `${mentorCount}+ Mentors`,
      color: 'bg-purple-100 text-purple-600'
    },

    {
      id: 7,
      name: 'Content Creators',
      icon: Camera,
      count: `${mentorCount}+ Mentors`,
      color: 'bg-pink-100 text-pink-600'
    },

    {
      id: 8,
      name: 'Public Speakers',
      icon: Mic,
      count: `${mentorCount}+ Mentors`,
      color: 'bg-cyan-100 text-cyan-600'
    }

  ]

  return (

    <section className='py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-50 rounded-[40px]'>

      {/* HEADER */}
      <div className='flex flex-col md:flex-row justify-between items-end mb-12 gap-4'>

        <div>

          <h2 className='text-4xl font-black text-slate-900 mb-3'>

            Find your expert

          </h2>

          <p className='text-slate-600 max-w-2xl text-lg'>

            Connect with professionals across various industries
            who are ready to help you navigate your career,
            business, creativity and personal growth journey.

          </p>

        </div>

        {/* VIEW ALL */}
        <button
          onClick={() => navigate('/mentors')}
          className='text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-2 group'
        >

          View all mentors

          <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />

        </button>

      </div>

      {/* GRID */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>

        {
          categories.map((cat) => (

            <div
              key={cat.id}
              onClick={() => navigate('/mentors')}
              className='bg-white rounded-3xl p-7 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group'
            >

              {/* ICON */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${cat.color} group-hover:scale-110 transition-transform`}
              >

                <cat.icon className='w-7 h-7' />

              </div>

              {/* TITLE */}
              <h3 className='font-black text-xl text-slate-900 mb-2'>

                {cat.name}

              </h3>

              {/* COUNT */}
              <p className='text-slate-500 mb-5'>

                {cat.count}

              </p>

              {/* BUTTON */}
              <button className='text-indigo-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all'>

                Explore

                <ArrowRight className='w-4 h-4' />

              </button>

            </div>

          ))
        }

      </div>

    </section>
  )
}

export default Specialization