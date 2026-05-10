import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Star, ArrowRight } from 'lucide-react'

function TopMentors() {

  const [mentors, setMentors] = useState([])
  const [loading, setLoading] = useState(true)

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
      <div className='py-24 text-center text-2xl font-bold'>
        Loading mentors...
      </div>
    )
  }

  return (
    <section className='bg-gray-100 py-24 px-6'>

      <div className='max-w-7xl mx-auto'>

        {/* HEADING */}
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16'>

          <div>
            <h2 className='text-4xl md:text-5xl font-black text-gray-900'>
              Top Mentors
            </h2>

            <p className='text-gray-500 mt-4 text-lg max-w-2xl'>
              Learn directly from experienced mentors across software,
              business, design, content creation and more.
            </p>
          </div>

          <button className='flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition'>
            View All
            <ArrowRight size={20} />
          </button>

        </div>

        {/* MENTORS GRID */}
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>

          {
            mentors.map((mentor) => (

              <div
                key={mentor._id}
                className='bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2'
              >

                {/* IMAGE */}
                <div className='h-72 overflow-hidden'>
                  <img
                    src={mentor.avatar || 'https://via.placeholder.com/400'}
                    alt={mentor.name}
                    className='w-full h-full object-cover hover:scale-110 transition duration-500'
                  />
                </div>

                {/* CONTENT */}
                <div className='p-6'>

                  <div className='flex items-center justify-between mb-3'>

                    <h3 className='text-2xl font-bold text-gray-900'>
                      {mentor.name}
                    </h3>

                    <div className='flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold'>
                      <Star size={16} fill='currentColor' />
                      {mentor.rating || 5}
                    </div>

                  </div>

                  <p className='text-gray-500 font-medium mb-3'>
                    {mentor.expertise || 'Mentor'}
                  </p>

                  <p className='text-gray-600 leading-relaxed mb-6'>
                    {mentor.bio || 'Experienced mentor helping students and professionals grow faster.'}
                  </p>

                  <div className='flex items-center justify-between'>

                    <div>
                      <p className='text-gray-400 text-sm'>Starting From</p>

                      <h4 className='text-2xl font-black text-gray-900'>
                        ₹{mentor.pricing || 499}
                      </h4>
                    </div>

                    <button className='bg-black text-white px-5 py-3 rounded-2xl font-semibold hover:scale-105 transition'>
                      Book Now
                    </button>

                  </div>

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </section>
  )
}

export default TopMentors
