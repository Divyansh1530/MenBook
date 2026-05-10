import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Star } from 'lucide-react'

function Mentor() {

  const { id } = useParams()

  const [mentor, setMentor] = useState(null)
  const [loading, setLoading] = useState(true)

  const [selectedDate, setSelectedDate] = useState('')
  const [slots, setSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)

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

  const fetchSlots = async (date) => {

    try {

      const response = await axios.get(
        `http://localhost:8000/api/v1.1/availability/slots/${id}?date=${date}`,
        {
            withCredentials:true
        }
      )

      setSlots(response.data.data)

    } catch (error) {

      console.log(error)

      setSlots([])
    }
  }

  const handleDateChange = async (e) => {

    const date = e.target.value

    setSelectedDate(date)

    await fetchSlots(date)
  }

  const handleBooking = async () => {

    if (!selectedSlot) {
      return alert('Please select a slot')
    }

    try {

      const response = await axios.post(
        'http://localhost:8000/api/v1.1/booking/create',
        {
          mentorId: id,
          startTime: selectedSlot.startTimeISO,
          endTime: selectedSlot.endTimeISO,
        //   amount: mentor.mentorProfile?.pricing
        },
        {
          withCredentials: true
        }
      )

      console.log(response.data)

      alert('Booking created successfully')

    } catch (error) {

      console.log(error.response.data)

      alert(
        error.response?.data?.message ||
        'Booking failed'
      )
    }
  }

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
                  {mentor.mentorProfile?.avgRating || 5}
                </div>

              </div>

              <p className='text-2xl text-gray-500 font-semibold mt-4'>
                {mentor.mentorProfile?.expertise?.join(', ') || 'Mentor'}
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
                    {mentor.mentorProfile?.expertise?.join(', ') || 'General'}
                  </h2>
                </div>

              </div>

              {/* DATE PICKER */}
              <div className='mt-10'>

                <label className='block text-lg font-semibold mb-3'>
                  Select Date
                </label>

                <input
                  type='date'
                  value={selectedDate}
                  onChange={handleDateChange}
                  className='border border-gray-300 rounded-2xl px-5 py-3 w-full outline-none'
                />

              </div>

              {/* AVAILABLE SLOTS */}
              <div className='mt-10'>

                <h2 className='text-2xl font-bold mb-5'>
                  Available Slots
                </h2>

                {
                 !slots || slots.length === 0 ? (
                    <p className='text-gray-500'>
                      No slots available
                    </p>
                  ) : (
                    <div className='flex flex-wrap gap-4'>

                      {
                        slots?.map((slot, index) => (

                          <button
                            key={index}
                            onClick={() => setSelectedSlot(slot)}
                            className={`px-5 py-3 rounded-2xl font-semibold border transition ${
                              selectedSlot?.startTimeISO === slot.startTimeISO
                                ? 'bg-black text-white'
                                : 'bg-white text-black border-gray-300'
                            }`}
                          >
                            {slot.formattedStartTime}
                          </button>
                        ))
                      }

                    </div>
                  )
                }

              </div>

              {/* BOOK BUTTON */}
              <button
                onClick={handleBooking}
                className='mt-12 bg-black text-white py-4 rounded-2xl text-lg font-semibold hover:scale-[1.02] transition'
              >
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
