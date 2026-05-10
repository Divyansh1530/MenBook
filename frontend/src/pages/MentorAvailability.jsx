import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CalendarDays,
  Clock3,
  Trash2,
  Plus
} from 'lucide-react'

function MentorAvailability() {

  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
//   const [mentorId, setMentorId] = useState('')
  const mentorId = "69fcac06a1706fc5dc977e05"
  const [slots, setSlots] = useState([])

  const [loading, setLoading] = useState(false)

  /*
    FETCH AVAILABLE SLOTS
  */

  const fetchSlots = async (selectedDate) => {

    if (!selectedDate) return

    try {

      const response = await axios.get(
        `http://localhost:8000/api/v1.1/availability/slots/${mentorId}?date=${selectedDate}`,
        {
          withCredentials: true
        }
      )

      console.log(response.data)

      setSlots(response.data.data)

    } catch (error) {

      console.log(error)

      setSlots([])
    }
  }

  /*
    HANDLE DATE CHANGE
  */

  const handleDateChange = async (e) => {

    const selectedDate = e.target.value

    setDate(selectedDate)

    await fetchSlots(selectedDate)
  }

  /*
    ADD SLOT
  */

  const handleAddSlot = async () => {

    if (!date || !startTime || !endTime) {
      return alert('All fields are required')
    }

    try {

      setLoading(true)

      const formattedStartTime =
        new Date(`${date}T${startTime}`)

      const formattedEndTime =
        new Date(`${date}T${endTime}`)

      const response = await axios.post(
        'http://localhost:8000/api/v1.1/availability/create',
        {
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          date
        },
        {
          withCredentials: true
        }
      )

      console.log(response.data)

      alert('Slot created successfully')

      setStartTime('')
      setEndTime('')

      fetchSlots(date)

    } catch (error) {

      console.log(error.response.data)

      alert(
        error.response?.data?.message ||
        'Failed to create slot'
      )

    } finally {
      setLoading(false)
    }
  }

  /*
    DELETE SLOT
  */

  const handleDeleteSlot = async (slotId) => {

    try {

      const response = await axios.delete(
        `http://localhost:8000/api/v1.1/availability/${slotId}`,
        {
          withCredentials: true
        }
      )

      console.log(response.data)

      alert('Slot deleted successfully')

      setSlots((prev) =>
        prev.filter((slot) => slot._id !== slotId)
      )

    } catch (error) {

      console.log(error)

      alert(
        error.response?.data?.message ||
        'Failed to delete slot'
      )
    }
  }

  return (
    <section className='min-h-screen bg-gray-100 py-20 px-6'>

      <div className='max-w-6xl mx-auto'>

        {/* HEADER */}
        <div className='mb-14'>

          <h1 className='text-5xl font-black text-gray-900'>
            Mentor Availability
          </h1>

          <p className='text-gray-500 mt-4 text-lg'>
            Create and manage your available session slots
          </p>

        </div>

        {/* CREATE SLOT */}
        <div className='bg-white rounded-3xl shadow-xl p-8 mb-12'>

          <div className='grid md:grid-cols-4 gap-5'>

            {/* DATE */}
            <div>

              <label className='block font-semibold mb-3'>
                Select Date
              </label>

              <input
                type='date'
                value={date}
                onChange={handleDateChange}
                className='w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none'
              />

            </div>

            {/* START TIME */}
            <div>

              <label className='block font-semibold mb-3'>
                Start Time
              </label>

              <input
                type='time'
                value={startTime}
                onChange={(e) =>
                  setStartTime(e.target.value)
                }
                className='w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none'
              />

            </div>

            {/* END TIME */}
            <div>

              <label className='block font-semibold mb-3'>
                End Time
              </label>

              <input
                type='time'
                value={endTime}
                onChange={(e) =>
                  setEndTime(e.target.value)
                }
                className='w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none'
              />

            </div>

            {/* BUTTON */}
            <div className='flex items-end'>

              <button
                onClick={handleAddSlot}
                disabled={loading}
                className='w-full bg-black text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition'
              >
                <Plus size={20} />
                {
                  loading
                    ? 'Creating...'
                    : 'Add Slot'
                }
              </button>

            </div>

          </div>

        </div>

        {/* SLOT LIST */}
        <div className='bg-white rounded-3xl shadow-xl p-8'>

          <div className='flex items-center gap-3 mb-8'>

            <CalendarDays size={28} />

            <h2 className='text-3xl font-black'>
              Available Slots
            </h2>

          </div>

          {
            slots.length === 0 ? (

              <div className='text-center py-16'>

                <h3 className='text-2xl font-bold text-gray-700'>
                  No slots found
                </h3>

                <p className='text-gray-500 mt-3'>
                  Add your first availability slot
                </p>

              </div>

            ) : (

              <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>

                {
                  slots.map((slot) => (

                    <div
                      key={slot._id}
                      className='bg-gray-100 rounded-2xl p-6 flex flex-col justify-between'
                    >

                      <div>

                        <div className='flex items-center gap-2 text-gray-500 mb-4'>
                          <Clock3 size={18} />
                          Session Time
                        </div>

                        <h3 className='text-2xl font-black text-gray-900'>
                          {slot.formattedStartTime}
                        </h3>

                        <p className='text-gray-500 mt-2'>
                          to {
                            new Date(slot.endTimeISO)
                            .toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          }
                        </p>

                      </div>

                      <button
                        onClick={() =>
                          handleDeleteSlot(slot._id)
                        }
                        className='mt-8 bg-red-500 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition'
                      >
                        <Trash2 size={18} />
                        Delete Slot
                      </button>

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

export default MentorAvailability