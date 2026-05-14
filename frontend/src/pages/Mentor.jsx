import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Star, CalendarDays } from 'lucide-react'

function Mentor() {

  const { id } = useParams()

  const [mentor, setMentor] = useState(null)

  const [reviews, setReviews] = useState([])

  const [selectedDate, setSelectedDate] = useState('')

  const [slots, setSlots] = useState([])

  const [loading, setLoading] = useState(true)

  
  /*
      FETCH MENTOR
  */

  const fetchMentor = async () => {

    try {

      const response = await axios.get(
        `http://localhost:8000/api/v1.1/users/mentors/${id}`
        
      )

      setMentor(response.data.data)

    } catch (error) {

      console.log(error)
    }
  }

  /*
      FETCH REVIEWS
  */

  const fetchReviews = async () => {

    try {

      const response = await axios.get(
        `http://localhost:8000/api/v1.1/review/mentors/${id}`
      )

      setReviews(response.data.data)

    } catch (error) {

      console.log(error)
    }
  }

  /*
      FETCH AVAILABLE SLOTS
  */

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
    }
  }

  useEffect(() => {

    const loadData = async () => {

      setLoading(true)

      await Promise.all([
        fetchMentor(),
        fetchReviews()
      ])

      setLoading(false)
    }

    loadData()

  }, [id])

  /*
      HANDLE DATE CHANGE
  */

  const handleDateChange = async (e) => {

    const date = e.target.value

    setSelectedDate(date)

    await fetchSlots(date)
  }

  /*
      BOOK SESSION
  */

  const handleBookSession = async (slot) => {

    try {

      /*
          CREATE BOOKING
      */

      const bookingResponse = await axios.post(
        'http://localhost:8000/api/v1.1/booking/create',
        {
          mentorId:id,
          startTime: slot.startTimeISO,
          endTime: slot.endTimeISO
        },
        {
          withCredentials: true
        }
      )
      

      const booking =
        bookingResponse.data.data

      /*
          CREATE ORDER
      */

      const paymentResponse =
        await axios.post(
          'http://localhost:8000/api/v1.1/payment/create-order',
          {
            bookingId: booking._id
          },
          {
            withCredentials: true
          }
        )

      const {
        order
      } = paymentResponse.data.data

      /*
          OPEN RAZORPAY
      */

      const options = {

        key:
          import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: 'MenBook',

        description: 'Mentorship Session',

        order_id: order.id,

        handler: async function (response) {

          try {

            await axios.post(
              'http://localhost:8000/api/v1.1/payment/verify-payment',
              {
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature
              },
              {
                withCredentials: true
              }
            )

            alert(
              'Payment successful'
            )
            await fetchSlots(selectedDate)

          } catch (error) {

            console.log(error)

            alert(
              'Payment verification failed'
            )
          }
        },

        theme: {
          color: '#4f46e5'
        }
      }

      const razor =
        new window.Razorpay(options)

      razor.open()

    } catch (error) {

      console.log(error)

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
        Mentor not found
      </div>
    )
  }

  return (

    <section className='min-h-screen bg-slate-50 py-24 px-6'>

      <div className='max-w-7xl mx-auto'>
       

        {/* TOP SECTION */}
        <div className='grid lg:grid-cols-3 gap-10'>

          {/* LEFT */}
          <div className='lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-10 shadow-sm'>

            <div className='flex flex-col md:flex-row gap-8'>

              <img
                src={
                  mentor.avatar 
                }
                alt={mentor.name}
                className='w-52 h-52 rounded-3xl object-cover border border-slate-200'
              />

              <div className='flex-1'>

                <div className='flex items-center gap-4 mb-4'>

                  <h1 className='text-5xl font-black text-slate-900'>

                    {mentor.name}

                  </h1>

                  <div className='flex items-center gap-1 bg-amber-100 text-amber-700 px-4 py-2 rounded-xl font-bold'>

                    <Star
                      size={18}
                      fill='currentColor'
                    />

                    {
                      mentor.mentorProfile
                        ?.avgRating || 5
                    }

                  </div>

                </div>

                <p className='text-xl text-slate-500 mb-6'>

                  {
                    mentor.mentorProfile
                      ?.bio
                  }

                </p>

                {/* EXPERTISE */}
                <div className='flex flex-wrap gap-3 mb-8'>

                  {
                    mentor.mentorProfile
                      ?.expertise
                      ?.map((item, index) => (

                        <div
                          key={index}
                          className='bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl font-medium'
                        >

                          {item}

                        </div>
                      ))
                  }

                </div>

                {/* STATS */}
                <div className='flex flex-wrap gap-8'>

                  <div>

                    <p className='text-slate-400 text-sm mb-1'>
                      Pricing
                    </p>

                    <h3 className='text-3xl font-black text-slate-900'>

                      ₹{
                        mentor.mentorProfile
                          ?.pricing
                      }

                    </h3>

                  </div>

                  <div>

                    <p className='text-slate-400 text-sm mb-1'>
                      Reviews
                    </p>

                    <h3 className='text-3xl font-black text-slate-900'>

                      {
                        mentor.mentorProfile
                          ?.totalReviews || 0
                      }

                    </h3>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className='bg-white border border-slate-200 rounded-3xl p-8 shadow-sm h-fit'>

            <div className='flex items-center gap-3 mb-6'>

              <CalendarDays
                className='text-indigo-600'
              />

              <h2 className='text-2xl font-bold text-slate-900'>
                Book Session
              </h2>

            </div>

            <input
              type='date'
              value={selectedDate}
              onChange={handleDateChange}
              className='w-full border border-slate-300 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-indigo-500 mb-6'
            />

            <div className='space-y-4 max-h-100 overflow-y-auto'>

              {
                slots.length > 0 ? (

                  slots.map((slot, index) => (

                    <button
                      key={index}
                      onClick={() =>
                        handleBookSession(slot)
                      }
                      className='w-full bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-4 rounded-2xl font-semibold transition'
                    >

                      {
                        slot.formattedStartTime
                      }

                    </button>
                  ))

                ) : (

                  <div className='text-slate-500 text-center py-10'>
                    No available slots
                  </div>
                )
              }

            </div>

          </div>

        </div>

        {/* REVIEWS */}
        <div className='mt-16'>

          <div className='flex items-center justify-between mb-10'>

            <h2 className='text-4xl font-black text-slate-900'>
              Reviews
            </h2>

            <div className='text-slate-500 font-medium'>

              {reviews.length} Reviews

            </div>

          </div>

          {
            reviews.length === 0 ? (

              <div className='bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm text-slate-500'>
                No reviews yet
              </div>

            ) : (

              <div className='grid md:grid-cols-2 gap-8'>

                {
                  reviews.map((review) => (

                    <div
                      key={review._id}
                      className='bg-white border border-slate-200 rounded-3xl p-8 shadow-sm'
                    >

                      <div className='flex items-center gap-4 mb-6'>

                        <img
                          src={
                            review.userId?.avatar ||
                            'https://via.placeholder.com/100'
                          }
                          alt='user'
                          className='w-16 h-16 rounded-full object-cover'
                        />

                        <div>

                          <h3 className='text-xl font-bold text-slate-900'>
                            {
                              review.userId?.name
                            }
                          </h3>

                          <p className='text-slate-500 text-sm'>
                            {
                              new Date(
                                review.createdAt
                              ).toLocaleDateString()
                            }
                          </p>

                        </div>

                      </div>

                      <div className='flex items-center gap-1 mb-5'>

                        {
                          [...Array(review.rating)]
                            .map((_, index) => (

                              <Star
                                key={index}
                                size={18}
                                fill='currentColor'
                                className='text-amber-400'
                              />
                            ))
                        }

                      </div>

                      <p className='text-slate-600 leading-relaxed text-lg'>

                        {review.comment}

                      </p>

                    </div>
                  ))
                }

              </div>
            )
          }

        </div>

      </div>

    </section>
  )
}

export default Mentor