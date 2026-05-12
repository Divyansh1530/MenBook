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

  const categories = [
    { id: 1, name: 'Therapists', icon: HeartPulse, count: `${mentorCount}+ Mentors`, color: 'bg-rose-50 text-rose-600 border-rose-100' },
    { id: 2, name: 'UI/UX Designers', icon: PenTool, count: `${mentorCount}+ Mentors`, color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
    { id: 3, name: 'Backend Developers', icon: Server, count: `${mentorCount}+ Mentors`, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { id: 4, name: 'Marketing Experts', icon: Megaphone, count: `${mentorCount}+ Mentors`, color: 'bg-amber-50 text-amber-600 border-amber-100' },
    { id: 5, name: 'Career Coaches', icon: Briefcase, count: `${mentorCount}+ Mentors`, color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { id: 6, name: 'Psychologists', icon: Brain, count: `${mentorCount}+ Mentors`, color: 'bg-purple-50 text-purple-600 border-purple-100' },
    { id: 7, name: 'Content Creators', icon: Camera, count: `${mentorCount}+ Mentors`, color: 'bg-pink-50 text-pink-600 border-pink-100' },
    { id: 8, name: 'Public Speakers', icon: Mic, count: `${mentorCount}+ Mentors`, color: 'bg-cyan-50 text-cyan-600 border-cyan-100' }
  ]

  return (
    <section className='py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-50 rounded-lg border border-white shadow-inner'>
      
      {/* HEADER - NOW CENTERED */}
      <div className='relative mb-16'>
        <div className='text-center max-w-3xl mx-auto'>
          <h2 className='text-5xl font-extrabold text-slate-900 mb-4 tracking-tight'>
            Find your expert
          </h2>
          <p className='text-slate-500 text-lg leading-relaxed'>
            Connect with professionals across various industries who are ready to help 
            you navigate your career, business, creativity and personal growth journey.
          </p>
        </div>

        {/* VIEW ALL - REMAINS RIGHT ALIGNED/ABSOLUTE FOR DESKTOP */}
        <div className='md:absolute md:right-0 md:bottom-0 mt-6 text-center'>
            <button
            onClick={() => navigate('/mentors')}
            className='text-indigo-600 font-bold hover:text-indigo-800 flex items-center justify-center gap-2 group transition-colors'
            >
            View all mentors
            <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
            </button>
        </div>
      </div>

      {/* GRID */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate('/mentors')}
            className='group relative bg-white/70 backdrop-blur-sm rounded-4xl p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] hover:bg-white transition-all duration-500 cursor-pointer overflow-hidden'
          >
            {/* SUBTLE BACKGROUND ACCENT */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity blur-2xl ${cat.color}`}></div>

            {/* ICON STYLING */}
            <div
              className={`w-16 h-16 rounded-[22px] flex items-center justify-center mb-6 border ${cat.color} shadow-sm group-hover:rotate-6 transition-all duration-300`}
            >
              <cat.icon className='w-8 h-8' />
            </div>

            {/* CONTENT */}
            <h3 className='font-bold text-xl text-slate-800 mb-1 tracking-tight'>
              {cat.name}
            </h3>

            <p className='text-slate-400 text-sm font-medium mb-6'>
              {cat.count}
            </p>

            <div className='flex items-center gap-2 text-indigo-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0'>
              Explore Specialty
              <ArrowRight className='w-4 h-4' />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Specialization