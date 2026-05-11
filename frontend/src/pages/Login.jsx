import React, { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate } from 'react-router-dom'


function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      setLoading(true)

      const response = await axios.post(
        'http://localhost:8000/api/v1.1/users/login',
        formData,
        {
          withCredentials: true
        }
      )

      console.log(response.data)

      // Store user data
      localStorage.setItem(
        'user',
        JSON.stringify(response.data.data.user)
      )
      window.location.href = "/"

      alert('Login successful')


    } catch (error) {

      console.log(error)

      alert(
        error.response?.data?.message ||
        'Login failed'
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>

      <div className='w-full max-w-md bg-white rounded-2xl shadow-xl p-8'>

        <h1 className='text-3xl font-bold text-center mb-2'>
          Welcome Back
        </h1>

        <p className='text-gray-500 text-center mb-8'>
          Login to continue
        </p>

        <form
          onSubmit={handleSubmit}
          className='space-y-5'
        >

          <div>
            <label className='block mb-2 font-medium'>
              Email
            </label>

            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email'
              className='w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black'
            />
          </div>

          <div>
            <label className='block mb-2 font-medium'>
              Password
            </label>

            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter your password'
              className='w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition'
          >
            {
              loading
                ? 'Logging In...'
                : 'Login'
            }
          </button>

        </form>

        <p className='text-center text-gray-500 mt-6'>
          Don&apos;t have an account?<Link to="/signup" className='text-blue-500'> Signup</Link>
        </p>

      </div>

    </div>
  )
}

export default Login
