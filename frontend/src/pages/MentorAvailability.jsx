import React, { useEffect, useState } from 'react'
import axios from 'axios'

function MentorAvailability() {

  const [availability, setAvailability] = useState([])

  const [formData, setFormData] = useState({
    dayOfWeek: 0,
    startTime: '',
    endTime: '',
    slotDuration: 30,
    bufferTime: 0
  })

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

  /*
      FETCH AVAILABILITY
  */

  const fetchAvailability = async () => {

    try {

      const response = await axios.get(
        'http://localhost:8000/api/v1.1/availability/mentor',
        {
          withCredentials: true
        }
      )

      setAvailability(response.data.data)

    } catch (error) {

      console.log(error)
    }
  }

  useEffect(() => {

    fetchAvailability()

  }, [])

  /*
      HANDLE INPUT
  */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  /*
      TIME TO MINUTES
  */

  const convertTimeToMinutes = (time) => {

    const [hours, minutes] = time.split(':')

    return Number(hours) * 60 + Number(minutes)
  }

  /*
      CREATE AVAILABILITY
  */

  const handleCreateAvailability = async () => {

    try {

      const payload = {
        dayOfWeek: Number(formData.dayOfWeek),
        startTime: convertTimeToMinutes(formData.startTime),
        endTime: convertTimeToMinutes(formData.endTime),
        slotDuration: Number(formData.slotDuration),
        bufferTime: Number(formData.bufferTime)
      }

      const response = await axios.post(
        'http://localhost:8000/api/v1.1/availability/create',
        payload,
        {
          withCredentials: true
        }
      )

      console.log(response.data)

      alert('Availability created successfully')

      fetchAvailability()

    } catch (error) {

      console.log(error)

      alert(
        error.response?.data?.message ||
        'Failed to create availability'
      )
    }
  }

  /*
      FORMAT TIME
  */

  const formatMinutes = (minutes) => {

    const hours = Math.floor(minutes / 60)

    const mins = minutes % 60

    const period = hours >= 12 ? 'PM' : 'AM'

    const formattedHours =
      hours % 12 || 12

    return `${formattedHours}:${mins
      .toString()
      .padStart(2, '0')} ${period}`
  }

  return (

    <section className='min-h-screen bg-slate-50 py-24 px-6'>

      <div className='max-w-5xl mx-auto'>

        {/* HEADING */}
        <div className='mb-12'>

          <h1 className='text-5xl font-black text-slate-900 mb-4'>

            Mentor Availability

          </h1>

          <p className='text-slate-600 text-lg'>

            Create your recurring weekly schedule.

          </p>

        </div>

        {/* FORM */}
        <div className='bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-12'>

          <div className='grid md:grid-cols-2 gap-6'>

            {/* DAY */}
            <div>

              <label className='block mb-2 font-semibold'>

                Day

              </label>

              <select
                name='dayOfWeek'
                value={formData.dayOfWeek}
                onChange={handleChange}
                className='w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
              >

                {
                  days.map((day, index) => (

                    <option
                      key={index}
                      value={index}
                    >

                      {day}

                    </option>

                  ))
                }

              </select>

            </div>

            {/* SLOT DURATION */}
            <div>

              <label className='block mb-2 font-semibold'>

                Slot Duration (minutes)

              </label>

              <input
                type='number'
                name='slotDuration'
                value={formData.slotDuration}
                onChange={handleChange}
                className='w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
              />

            </div>

            {/* START TIME */}
            <div>

              <label className='block mb-2 font-semibold'>

                Start Time

              </label>

              <input
                type='time'
                name='startTime'
                value={formData.startTime}
                onChange={handleChange}
                className='w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
              />

            </div>

            {/* END TIME */}
            <div>

              <label className='block mb-2 font-semibold'>

                End Time

              </label>

              <input
                type='time'
                name='endTime'
                value={formData.endTime}
                onChange={handleChange}
                className='w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
              />

            </div>

            {/* BUFFER */}
            <div>

              <label className='block mb-2 font-semibold'>

                Buffer Time (minutes)

              </label>

              <input
                type='number'
                name='bufferTime'
                value={formData.bufferTime}
                onChange={handleChange}
                className='w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
              />

            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={handleCreateAvailability}
            className='mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold transition'
          >

            Create Availability

          </button>

        </div>

        {/* AVAILABILITY LIST */}
        <div className='space-y-5'>

          {
            availability.map((item) => (

              <div
                key={item._id}
                className='bg-white border border-slate-200 rounded-2xl p-6 shadow-sm'
              >

                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

                  <div>

                    <h2 className='text-2xl font-bold text-slate-900'>

                      {days[item.dayOfWeek]}

                    </h2>

                    <p className='text-slate-600 mt-2'>

                      {formatMinutes(item.startTime)}
                      {' - '}
                      {formatMinutes(item.endTime)}

                    </p>

                  </div>

                  <div className='flex flex-wrap gap-3'>

                    <div className='bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-semibold'>

                      {item.slotDuration} mins/session

                    </div>

                    <div className='bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold'>

                      {item.bufferTime} mins buffer

                    </div>

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

export default MentorAvailability