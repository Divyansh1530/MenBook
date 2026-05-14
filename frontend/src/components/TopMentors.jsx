import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Star,ArrowUpRight,ShieldCheck,ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

function TopMentors() {

  const [mentors, setMentors] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState(
   searchParams.get('search') || ''
)
  
    const [minPrice, setMinPrice] = useState('')
  
    const [maxPrice, setMaxPrice] = useState('')
  
    const [minRating, setMinRating] = useState('')
    

  const navigate = useNavigate()

  useEffect(() => {

   setSearch(
      searchParams.get('search') || ''
   )

}, [searchParams])

  useEffect(() => {

    const fetchMentors = async () => {

      try {

        const response = await axios.get(
          'http://localhost:8000/api/v1.1/users/mentors',
          {
          params:{
            search,
            minPrice,
            maxPrice,
            minRating
          }
        }
        )

        setMentors(response.data.data)

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

    fetchMentors()

  }, [search,minPrice,maxPrice,minRating])

  if (loading) {

    return (

      <div className='py-24 text-center text-2xl font-bold text-slate-900'>

        Loading mentors...

      </div>
    )
  }

  return (

    <section className='py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>

      {/* HEADING */}
      <div className='mb-12 text-center'>

        <h2 className='text-4xl font-black text-slate-900 mb-4'>

          Top Rated Mentors

        </h2>

        <p className='text-slate-600 max-w-2xl mx-auto text-lg'>

          Learn from experienced professionals across
          software engineering, design, business,
          content creation and career growth.

        </p>

      </div>

      {/* GRID */}
      <div>
         <input
          type="text"
          placeholder="Search expertise..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <select
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
        >
          <option value="">All Ratings</option>
          <option value="4">4★ & above</option>
          <option value="4.5">4.5★ & above</option>
        </select>
      </div>
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
        {mentors.map((mentor) => (
          <div
            key={mentor._id}
            onClick={() => navigate(`/mentors/${mentor._id}`)}
            className='group bg-white rounded-3xl border border-slate-100 hover:border-indigo-200 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col sm:flex-row'
          >
            {/* LEFT: IMAGE (Rectangle Aspect) */}
            <div className='relative w-full sm:w-48 lg:w-56 h-64 sm:h-auto overflow-hidden'>
              <img
                src={mentor.avatar || 'https://via.placeholder.com/400'}
                alt={mentor.name}
                className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
              />
              <div className='absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-[11px] font-bold text-slate-900'>
                <Star className='w-3 h-3 fill-amber-400 text-amber-400' />
                {mentor.mentorProfile?.avgRating || 5.0}
              </div>
            </div>

            {/* RIGHT: CONTENT (Structured Typography) */}
            <div className='flex-1 p-6 flex flex-col justify-between'>
              <div>
                <div className='flex items-start justify-between mb-1'>
                  <h3 className='text-xl font-bold text-slate-900 flex items-center gap-2'>
                    {mentor.name}
                    <ShieldCheck className='w-4 h-4 text-indigo-500' />
                  </h3>
                  <div className='text-right'>
                    <span className='block text-[10px] uppercase font-bold text-slate-400 tracking-widest'>Hourly Rate</span>
                    <span className='text-lg font-black text-indigo-600'>
                      ₹{mentor.mentorProfile?.pricing || 499}
                    </span>
                  </div>
                </div>

                {/* Expertise Badges */}
                <div className='flex flex-wrap gap-2 mb-4'>
                  {mentor.mentorProfile?.expertise?.slice(0, 3).map((exp, i) => (
                    <span key={i} className='text-[10px] font-bold px-2 py-1 bg-slate-50 text-slate-500 rounded-md border border-slate-100 uppercase tracking-tighter'>
                      {exp}
                    </span>
                  ))}
                </div>

                {/* Bio - Controlled line clamp for clean UI */}
                <p className='text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6'>
                  {mentor.mentorProfile?.bio || 'An industry veteran dedicated to helping mentees bridge the gap between education and high-level professional execution.'}
                </p>
              </div>

              {/* Action Area */}
              <div className='flex items-center justify-between pt-4 border-t border-slate-50'>
                <span className='text-xs font-semibold text-slate-400'>
                  Available this week
                </span>
                <div className='flex items-center gap-2 text-sm font-bold text-indigo-600 group-hover:translate-x-1 transition-transform'>
                  View Profile <ArrowRight className='w-4 h-4' />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TopMentors