import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Star } from 'lucide-react'

function UserDashboard() {

  const [bookings, setBookings] = useState([])

  const [loading, setLoading] = useState(true)

  const [selectedBooking, setSelectedBooking] =
    useState(null)

  const [rating, setRating] = useState(5)

  const [comment, setComment] = useState('')

  /*
      FETCH BOOKINGS
  */

  const fetchBookings = async () => {

    try {

      const response = await axios.get(
        'http://localhost:8000/api/v1.1/booking/user-bookings',
        {
          withCredentials: true
        }
      )

      setBookings(response.data.data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {

    fetchBookings()

  }, [])

  /*
      OPEN REVIEW MODAL
  */

  const openReviewModal = (booking) => {

    setSelectedBooking(booking)

    setRating(5)

    setComment('')
  }

  /*
      CLOSE REVIEW MODAL
  */

  const closeReviewModal = () => {

    setSelectedBooking(null)
  }

  /*
      SUBMIT REVIEW
  */

  const handleSubmitReview = async () => {

    try {

      const response = await axios.post(
        'http://localhost:8000/api/v1.1/review/create',
        {
          mentorId:
            selectedBooking.mentorId._id,

          bookingId:
            selectedBooking._id,

          rating,

          comment
        },
        {
          withCredentials: true
        }
      )

      console.log(response.data)

      alert('Review submitted successfully')

      closeReviewModal()

    } catch (error) {

      console.log(error.response.data)

      alert(
        error.response?.data?.message ||
        'Failed to submit review'
      )
    }
  }

  /*
      FORMAT DATE
  */

  const formatDate = (date) => {

    return new Date(date).toLocaleString([], {
      dateStyle: 'medium',
      timeStyle: 'short'
    })
  }

  /*
      STATUS COLOR
  */

  const getStatusColor = (status) => {

    switch (status) {

      case 'completed':
        return 'bg-green-100 text-green-700'

      case 'confirmed':
        return 'bg-blue-100 text-blue-700'

      case 'cancelled':
        return 'bg-red-100 text-red-700'

      default:
        return 'bg-yellow-100 text-yellow-700'
    }
  }

  if (loading) {

    return (
      <div className='min-h-screen flex items-center justify-center text-3xl font-bold'>
        Loading Dashboard...
      </div>
    )
  }

  return (

    <section className='min-h-screen bg-slate-50 py-24 px-6'>

      <div className='max-w-7xl mx-auto'>

        {/* HEADER */}
        <div className='mb-12'>

          <h1 className='text-5xl font-black text-slate-900 mb-4'>
            My Bookings
          </h1>

          <p className='text-slate-600 text-lg'>
            Track your mentoring sessions.
          </p>

        </div>

        {/* EMPTY STATE */}
        {
          bookings.length === 0 && (

            <div className='bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm'>

              <h2 className='text-3xl font-bold text-slate-900 mb-4'>
                No Bookings Yet
              </h2>

              <p className='text-slate-500 text-lg'>
                Your booked sessions will appear here.
              </p>

            </div>
          )
        }

        {/* BOOKINGS */}
        <div className='grid gap-8'>

          {
            bookings.map((booking) => (

              <div
                key={booking._id}
                className='bg-white border border-slate-200 rounded-3xl p-8 shadow-sm'
              >

                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8'>

                  {/* LEFT */}
                  <div className='flex items-center gap-5'>

                    <img
                      src={
                        booking.mentorId?.avatar ||
                        'https://via.placeholder.com/100'
                      }
                      alt='mentor'
                      className='w-20 h-20 rounded-full object-cover border border-slate-200'
                    />

                    <div>

                      <h2 className='text-2xl font-bold text-slate-900 mb-2'>

                        {booking.mentorId?.name}

                      </h2>

                      <p className='text-slate-500 mb-1'>

                        {
                          booking.mentorId
                            ?.mentorProfile
                            ?.expertise?.[0]
                        }

                      </p>

                      <p className='text-slate-600 font-medium'>

                        {formatDate(booking.startTime)}

                      </p>

                    </div>

                  </div>

                  {/* RIGHT */}
                  <div className='flex flex-col items-start lg:items-end gap-4'>

                    {/* STATUS */}
                    <div
                      className={`px-4 py-2 rounded-xl font-semibold capitalize ${getStatusColor(booking.status)}`}
                    >

                      {booking.status}

                    </div>

                    {/* PAYMENT */}
                    <div className='text-slate-600 font-semibold'>

                      Payment:
                      {' '}
                      <span className='capitalize'>

                        {booking.paymentStatus}

                      </span>

                    </div>

                    {/* PRICE */}
                    <div className='text-3xl font-black text-slate-900'>

                      ₹{booking.amount}

                    </div>

                    {/* REVIEW BUTTON */}
                    {
                      booking.status ===
                      'completed' && (

                        <button
                          onClick={() =>
                            openReviewModal(booking)
                          }
                          className='bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold transition'
                        >

                          Leave Review

                        </button>
                      )
                    }

                  </div>

                </div>

              </div>
            ))
          }

        </div>

        {/* REVIEW MODAL */}
        {
          selectedBooking && (

            <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4'>

              <div className='bg-white rounded-3xl w-full max-w-xl p-8 relative'>

                {/* CLOSE */}
                <button
                  onClick={closeReviewModal}
                  className='absolute top-5 right-5 text-slate-500 hover:text-black text-xl'
                >

                  ✕

                </button>

                <h2 className='text-3xl font-black text-slate-900 mb-6'>

                  Leave Review

                </h2>

                {/* RATING */}
                <div className='mb-6'>

                  <label className='block font-semibold mb-3'>
                    Rating
                  </label>

                  <div className='flex gap-2'>

                    {
                      [1, 2, 3, 4, 5].map((star) => (

                        <button
                          key={star}
                          onClick={() =>
                            setRating(star)
                          }
                        >

                          <Star
                            size={34}
                            fill={
                              star <= rating
                                ? 'currentColor'
                                : 'none'
                            }
                            className={
                              star <= rating
                                ? 'text-amber-400'
                                : 'text-slate-300'
                            }
                          />

                        </button>
                      ))
                    }

                  </div>

                </div>

                {/* COMMENT */}
                <div className='mb-8'>

                  <label className='block font-semibold mb-3'>
                    Comment
                  </label>

                  <textarea
                    rows={5}
                    value={comment}
                    onChange={(e) =>
                      setComment(
                        e.target.value
                      )
                    }
                    placeholder='Share your experience...'
                    className='w-full border border-slate-300 rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-indigo-500'
                  />

                </div>

                {/* BUTTON */}
                <button
                  onClick={handleSubmitReview}
                  className='w-full bg-black text-white py-4 rounded-2xl font-semibold hover:opacity-90 transition'
                >

                  Submit Review

                </button>

              </div>

            </div>
          )
        }

      </div>

    </section>
  )
}

export default UserDashboard