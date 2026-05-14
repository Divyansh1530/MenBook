import React, { useEffect, useState } from 'react'
import axios from 'axios'

function MentorDashboard() {

  const [bookings, setBookings] = useState([])

  const [loading, setLoading] = useState(true)

  /*
      FETCH BOOKINGS
  */

  const fetchBookings = async () => {

    try {

      const response = await axios.get(
        'http://localhost:8000/api/v1.1/booking/mentor-bookings',
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
      MARK COMPLETED
  */

  const handleMarkCompleted = async (bookingId) => {

    try {

      const response = await axios.patch(
        `http://localhost:8000/api/v1.1/booking/${bookingId}/complete`,
        {},
        {
          withCredentials: true
        }
      )

      console.log(response.data)

      alert('Booking marked as completed')

      fetchBookings()

    } catch (error) {

      console.log(error)

      alert(
        error.response?.data?.message ||
        'Failed to update booking'
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
            Mentor Dashboard
          </h1>

          <p className='text-slate-600 text-lg'>
            Manage your booked mentoring sessions.
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
                Your upcoming sessions will appear here.
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
                        booking.userId?.avatar ||
                        'https://via.placeholder.com/100'
                      }
                      alt='user'
                      className='w-20 h-20 rounded-full object-cover border border-slate-200'
                    />

                    <div>

                      <h2 className='text-2xl font-bold text-slate-900 mb-2'>

                        {booking.userId?.name}

                      </h2>

                      <p className='text-slate-500 mb-1'>

                        {booking.userId?.email}

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

                    {/* COMPLETE BUTTON */}
                    {
                      booking.status === 'confirmed' && (

                        <button
                          onClick={() =>
                            handleMarkCompleted(booking._id)
                          }
                          className='bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold transition'
                        >

                          Mark Completed

                        </button>
                      )
                    }

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

export default MentorDashboard