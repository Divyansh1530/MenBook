import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Profile() {

  const [user, setUser] = useState(null)

  const [loading, setLoading] = useState(true)

  const [avatar, setAvatar] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    expertise: '',
    pricing: '',
    experience: '',
    linkedin: '',
    portfolio: ''
  })

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: ''
  })

  /*
      FETCH CURRENT USER
  */

  const fetchCurrentUser = async () => {

    try {

      const response = await axios.get(
        'http://localhost:8000/api/v1.1/users/current-user',
        {
          withCredentials: true
        }
      )

      const currentUser = response.data.data

      setUser(currentUser)

      setFormData({
        name: currentUser.name || '',
        bio: currentUser.mentorProfile?.bio || '',
        expertise:
          currentUser.mentorProfile?.expertise?.join(', ') || '',
        pricing:
          currentUser.mentorProfile?.pricing || '',
        experience:
          currentUser.mentorProfile?.experience || '',
        linkedin:
          currentUser.mentorProfile?.linkedin || '',
        portfolio:
          currentUser.mentorProfile?.portfolio || ''
      })

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {

    fetchCurrentUser()

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
      HANDLE PASSWORD INPUT
  */

  const handlePasswordChange = (e) => {

    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    })
  }

  /*
      UPDATE PROFILE
  */

  const handleUpdateProfile = async () => {

    try {

      const payload = {
        name: formData.name
      }

      if (user.role === 'mentor') {

        payload.bio = formData.bio

        payload.expertise = formData.expertise
          .split(',')
          .map((item) => item.trim())

        payload.pricing = formData.pricing

        payload.experience = formData.experience

        payload.linkedin = formData.linkedin

        payload.portfolio = formData.portfolio
      }

      const response = await axios.patch(
        'http://localhost:8000/api/v1.1/users/update-details',
        payload,
        {
          withCredentials: true
        }
      )

      console.log(response.data)

      alert('Profile updated successfully')

      fetchCurrentUser()

    } catch (error) {

      console.log(error)

      alert(
        error.response?.data?.message ||
        'Profile update failed'
      )
    }
  }

  /*
      UPDATE AVATAR
  */

  const handleAvatarUpdate = async () => {

    if (!avatar) {
      return alert('Please select image')
    }

    try {

      const data = new FormData()

      data.append('avatar', avatar)

      const response = await axios.patch(
        'http://localhost:8000/api/v1.1/users/update-avatar',
        data,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      console.log(response.data)

      alert('Avatar updated successfully')

      fetchCurrentUser()

    } catch (error) {

      console.log(error)

      alert(
        error.response?.data?.message ||
        'Avatar update failed'
      )
    }
  }

  /*
      CHANGE PASSWORD
  */

  const handleChangePassword = async () => {

    try {

      const response = await axios.patch(
        'http://localhost:8000/api/v1.1/users/change-password',
        passwordData,
        {
          withCredentials: true
        }
      )

      console.log(response.data)

      alert('Password changed successfully')

      setPasswordData({
        oldPassword: '',
        newPassword: ''
      })

    } catch (error) {

      console.log(error)

      alert(
        error.response?.data?.message ||
        'Password change failed'
      )
    }
  }

  if (loading) {

    return (
      <div className='min-h-screen flex items-center justify-center text-3xl font-bold'>
        Loading Profile...
      </div>
    )
  }

  return (

    <section className='min-h-screen bg-slate-50 py-24 px-6'>

      <div className='max-w-5xl mx-auto'>

        {/* HEADER */}
        <div className='bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mb-10'>

          <div className='flex flex-col md:flex-row items-center gap-8'>

            <img
              src={
                user.avatar ||
                'https://via.placeholder.com/150'
              }
              alt='avatar'
              className='w-36 h-36 rounded-full object-cover border-4 border-slate-100'
            />

            <div className='flex-1'>

              <h1 className='text-4xl font-black text-slate-900 mb-2'>
                {user.name}
              </h1>

              <p className='text-slate-500 capitalize text-lg'>
                {user.role}
              </p>

              <div className='mt-6 flex flex-col sm:flex-row gap-4'>

                <input
                  type='file'
                  onChange={(e) =>
                    setAvatar(e.target.files[0])
                  }
                  className='border border-slate-300 rounded-xl px-4 py-3'
                />

                <button
                  onClick={handleAvatarUpdate}
                  className='bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition'
                >
                  Update Avatar
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* PROFILE FORM */}
        <div className='bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mb-10'>

          <h2 className='text-3xl font-bold text-slate-900 mb-8'>
            Profile Details
          </h2>

          <div className='grid md:grid-cols-2 gap-6'>

            {/* NAME */}
            <div>

              <label className='block mb-2 font-semibold'>
                Full Name
              </label>

              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
              />

            </div>

            {/* MENTOR FIELDS */}
            {
              user.role === 'mentor' && (
                <>

                  <div>

                    <label className='block mb-2 font-semibold'>
                      Pricing
                    </label>

                    <input
                      type='number'
                      name='pricing'
                      value={formData.pricing}
                      onChange={handleChange}
                      className='w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
                    />

                  </div>

                  <div className='md:col-span-2'>

                    <label className='block mb-2 font-semibold'>
                      Bio
                    </label>

                    <textarea
                      rows={5}
                      name='bio'
                      value={formData.bio}
                      onChange={handleChange}
                      className='w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
                    />

                  </div>

                  <div>

                    <label className='block mb-2 font-semibold'>
                      Expertise
                    </label>

                    <input
                      type='text'
                      name='expertise'
                      value={formData.expertise}
                      onChange={handleChange}
                      placeholder='React, Node.js, System Design'
                      className='w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
                    />

                  </div>

                  <div>

                    <label className='block mb-2 font-semibold'>
                      Experience
                    </label>

                    <input
                      type='text'
                      name='experience'
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder='5 years'
                      className='w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
                    />

                  </div>

                  <div>

                    <label className='block mb-2 font-semibold'>
                      LinkedIn
                    </label>

                    <input
                      type='text'
                      name='linkedin'
                      value={formData.linkedin}
                      onChange={handleChange}
                      className='w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
                    />

                  </div>

                  <div>

                    <label className='block mb-2 font-semibold'>
                      Portfolio
                    </label>

                    <input
                      type='text'
                      name='portfolio'
                      value={formData.portfolio}
                      onChange={handleChange}
                      className='w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
                    />

                  </div>

                </>
              )
            }

          </div>

          <button
            onClick={handleUpdateProfile}
            className='mt-8 bg-black text-white px-8 py-4 rounded-2xl font-semibold hover:opacity-90 transition'
          >
            Save Changes
          </button>

        </div>

        {/* CHANGE PASSWORD */}
        <div className='bg-white rounded-3xl shadow-sm border border-slate-200 p-8'>

          <h2 className='text-3xl font-bold text-slate-900 mb-8'>
            Change Password
          </h2>

          <div className='grid md:grid-cols-2 gap-6'>

            <div>

              <label className='block mb-2 font-semibold'>
                Old Password
              </label>

              <input
                type='password'
                name='oldPassword'
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                className='w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
              />

            </div>

            <div>

              <label className='block mb-2 font-semibold'>
                New Password
              </label>

              <input
                type='password'
                name='newPassword'
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className='w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
              />

            </div>

          </div>

          <button
            onClick={handleChangePassword}
            className='mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold transition'
          >
            Change Password
          </button>

        </div>

      </div>

    </section>
  )
}

export default Profile