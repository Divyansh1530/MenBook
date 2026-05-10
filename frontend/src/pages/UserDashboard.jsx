import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CalendarDays,
  Clock3,
  IndianRupee,
  BadgeCheck,
  XCircle
} from 'lucide-react'

function UserDashboard() {

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchBookings = async () => {

      try {

        const response = await axios.get(
          'http://localhost:8000/api/v1.1/booking/user-bookings',
          {
            withCredentials: true
          }
        )

        console.log(response.data)

        setBookings(response.data.data)

      } catch (error) {

        console.log(error)

      } finally {
        setLoading(false)
      }
    }

    fetchBookings()

  }, [])

  const cancelBooking = async (bookingId) => {

    try {

      const response = await axios.patch(
        `http://localhost:8000/api/v1.1/booking/${bookingId}/cancel`,
        {},
        {
          withCredentials: true
        }
      )

      console.log(response.data)

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? {
                ...booking,
                status: 'cancelled'
              }
            : booking
        )
      )

      alert('Booking cancelled')

    } catch (error) {

      console.log(error)

      alert(
        error.response?.data?.message ||
        'Cancellation failed'
      )
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center text-3xl font-bold'>
        Loading bookings...
      </div>
    )
  }

  return (
    <section className='min-h-screen bg-gray-100 py-20 px-6'>

      <div className='max-w-7xl mx-auto'>

        {/* HEADER */}
        <div className='mb-14'>

          <h1 className='text-5xl font-black text-gray-900'>
            My Bookings
          </h1>

          <p className='text-gray-500 mt-4 text-lg'>
            Track all your booked mentor sessions
          </p>

        </div>

        {
          bookings.length === 0 ? (

            <div className='bg-white rounded-3xl p-16 text-center shadow-lg'>

              <h2 className='text-3xl font-bold text-gray-800'>
                No bookings found
              </h2>

              <p className='text-gray-500 mt-4'>
                Book your first mentor session
              </p>

            </div>

          ) : (

            <div className='grid gap-8'>

              {
                bookings.map((booking) => (

                  <div
                    key={booking._id}
                    className='bg-white rounded-3xl shadow-xl overflow-hidden'
                  >

                    <div className='grid md:grid-cols-4'>

                      {/* IMAGE */}
                      <div className='h-full'>

                        <img
                          src={
                            booking.mentorId?.avatar ||
                            'https://via.placeholder.com/400'
                          }
                          alt={booking.mentorId?.name}
                          className='w-full h-full object-cover min-h-62.5'
                        />

                      </div>

                      {/* CONTENT */}
                      <div className='md:col-span-3 p-8 flex flex-col justify-between'>

                        <div>

                          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-5'>

                            <div>

                              <h2 className='text-4xl font-black text-gray-900'>
                                {booking.mentorId?.name}
                              </h2>

                              <p className='text-gray-500 text-lg mt-2'>
                                {
                                  booking.mentorId?.mentorProfile?.expertise?.join(', ')
                                }
                              </p>

                            </div>

                            <div className='flex flex-wrap gap-3'>

                              <div className='bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold'>
                                Payment: {booking.paymentStatus}
                              </div>

                              <div className='bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold'>
                                Booking: {booking.status}
                              </div>

                            </div>

                          </div>

                          {/* DETAILS */}
                          <div className='grid sm:grid-cols-3 gap-5 mt-10'>

                            <div className='bg-gray-100 rounded-2xl p-5'>

                              <div className='flex items-center gap-2 text-gray-500 mb-2'>
                                <CalendarDays size={18} />
                                Date
                              </div>

                              <h3 className='text-xl font-bold text-gray-900'>
                                {
                                  new Date(booking.startTime)
                                  .toLocaleDateString()
                                }
                              </h3>

                            </div>

                            <div className='bg-gray-100 rounded-2xl p-5'>

                              <div className='flex items-center gap-2 text-gray-500 mb-2'>
                                <Clock3 size={18} />
                                Time
                              </div>

                              <h3 className='text-xl font-bold text-gray-900'>
                                {
                                  new Date(booking.startTime)
                                  .toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })
                                }
                              </h3>

                            </div>

                            <div className='bg-gray-100 rounded-2xl p-5'>

                              <div className='flex items-center gap-2 text-gray-500 mb-2'>
                                <IndianRupee size={18} />
                                Amount
                              </div>

                              <h3 className='text-xl font-bold text-gray-900'>
                                ₹{booking.amount}
                              </h3>

                            </div>

                          </div>

                        </div>

                        {/* ACTIONS */}
                        <div className='flex flex-wrap gap-4 mt-10'>

                          {
                            booking.status !== 'cancelled' && (

                              <button
                                onClick={() => cancelBooking(booking._id)}
                                className='flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition'
                              >
                                <XCircle size={20} />
                                Cancel Booking
                              </button>

                            )
                          }

                          {
                            booking.paymentStatus === 'paid' && (

                              <div className='flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-2xl font-semibold'>
                                <BadgeCheck size={20} />
                                Payment Successful
                              </div>

                            )
                          }

                        </div>

                      </div>

                    </div>

                  </div>
                ))
              }

            </div>

          )
        }

      </div>

    </section>
  )
}

export default UserDashboard