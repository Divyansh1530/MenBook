import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function TopMentors() {

  const [mentors, setMentors] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {

    const fetchMentors = async () => {

      try {

        const response = await axios.get(
          'http://localhost:8000/api/v1.1/users/mentors'
        )

        setMentors(response.data.data)

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

    fetchMentors()

  }, [])

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
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>

        {
          mentors.map((mentor) => (

            <div
              key={mentor._id}
              className='bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-2'
            >

              {/* IMAGE */}
              <div className='relative h-56 overflow-hidden'>

                <img
                  src={
                    mentor.avatar ||
                    'https://via.placeholder.com/400'
                  }
                  alt={mentor.name}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                />

                {/* RATING */}
                <div className='absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl flex items-center gap-1 text-sm font-bold text-slate-900 shadow-sm'>

                  <Star className='w-4 h-4 fill-amber-400 text-amber-400' />

                  {
                    mentor.mentorProfile?.avgRating || 5
                  }

                </div>

              </div>

              {/* CONTENT */}
              <div className='p-6 flex-1 flex flex-col'>

                {/* NAME */}
                <h3 className='text-xl font-black text-slate-900 mb-1'>

                  {mentor.name}

                </h3>

                {/* EXPERTISE */}
                <p className='text-sm text-slate-500 mb-4 line-clamp-1'>

                  {
                    mentor.mentorProfile?.expertise?.join(', ') ||
                    'Professional Mentor'
                  }

                </p>

                {/* TAGS */}
                <div className='flex flex-wrap gap-2 mb-5'>

                  {
                    mentor.mentorProfile?.expertise
                      ?.slice(0, 2)
                      ?.map((tag, index) => (

                        <span
                          key={index}
                          className='text-xs font-medium px-3 py-1 bg-slate-100 text-slate-600 rounded-lg'
                        >

                          {tag}

                        </span>

                      ))
                  }

                </div>

                {/* BIO */}
                <p className='text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3'>

                  {
                    mentor.mentorProfile?.bio ||
                    'Experienced mentor helping students and professionals grow faster.'
                  }

                </p>

                {/* FOOTER */}
                <div className='mt-auto pt-5 border-t border-slate-100 flex items-center justify-between'>

                  {/* PRICE */}
                  <div>

                    <div className='text-xs text-slate-500 mb-1'>

                      Starting from

                    </div>

                    <div className='font-black text-slate-900 text-xl'>

                      ₹{
                        mentor.mentorProfile?.pricing || 499
                      }

                    </div>

                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={() => navigate(`/mentors/${mentor._id}`)}
                    className='px-5 py-2.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl font-semibold text-sm transition-all'
                  >

                    View Profile

                  </button>

                </div>

              </div>

            </div>

          ))
        }

      </div>

    </section>
  )
}

export default TopMentors