import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Star } from 'lucide-react'

function Mentor() {

  const { id } = useParams()
  console.log(id)

  const [mentor, setMentor] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchMentor = async () => {

      try {

        const response = await axios.get(
          `http://localhost:8000/api/v1.1/users/mentors/${id}`
        )

        setMentor(response.data.data)

      } catch (error) {

        console.log(error)

      } finally {
        setLoading(false)
      }
    }

    fetchMentor()

  }, [id])

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center text-3xl font-bold'>
        Loading Mentor...
      </div>
    )
  }

  if (!mentor) {
    return (
      <div className='min-h-screen flex items-center justify-center text-3xl font-bold'>
        Mentor Not Found
      </div>
    )
  }

  return (
    <section className='min-h-screen bg-gray-100 py-24 px-6'>

      <div className='max-w-6xl mx-auto'>

        <div className='bg-white rounded-3xl overflow-hidden shadow-2xl'>

          <div className='grid lg:grid-cols-2'>

            {/* LEFT IMAGE */}
            <div className='h-full'>

              <img
                src={mentor.avatar || 'https://via.placeholder.com/500'}
                alt={mentor.name}
                className='w-full h-full object-cover min-h-125'
              />

            </div>

            {/* RIGHT CONTENT */}
            <div className='p-10 lg:p-14 flex flex-col justify-center'>

              <div className='flex items-center justify-between gap-4'>

                <h1 className='text-5xl font-black text-gray-900'>
                  {mentor.name}
                </h1>

                <div className='flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold'>
                  <Star size={18} fill='currentColor' />
                  {mentor.mentorProfile.avgRating || 5}
                </div>

              </div>

              <p className='text-2xl text-gray-500 font-semibold mt-4'>
                {mentor.mentorProfile.expertise?.join(", ") || 'Mentor'}
              </p>

              <p className='text-gray-600 text-lg leading-relaxed mt-8'>
                {mentor.mentorProfile?.bio || 'No bio available'}
              </p>

              <div className='mt-10 grid sm:grid-cols-2 gap-6'>

                <div className='bg-gray-100 rounded-2xl p-6'>
                  <p className='text-gray-500 mb-2'>
                    Session Price
                  </p>

                  <h2 className='text-4xl font-black text-gray-900'>
                    ₹{mentor.mentorProfile?.pricing || 499}
                  </h2>
                </div>

                <div className='bg-gray-100 rounded-2xl p-6'>
                  <p className='text-gray-500 mb-2'>
                    Expertise
                  </p>

                  <h2 className='text-2xl font-bold text-gray-900'>
                    {mentor.mentorProfile.expertise?.join(", ") || 'General'}
                  </h2>
                </div>

              </div>

              <button className='mt-12 bg-black text-white py-4 rounded-2xl text-lg font-semibold hover:scale-[1.02] transition'>
                Book Session
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Mentor
