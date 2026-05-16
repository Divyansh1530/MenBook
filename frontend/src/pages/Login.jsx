import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Login({
  setUser
}) {
  const navigate = useNavigate()
  const [role, setRole] = useState('user') // State for User/Mentor toggle
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
        { ...formData, role }, // Including role in request if your backend needs it
        { withCredentials: true }
      )
      setUser(response.data.data.user)
      navigate("/")
    } catch (error) {
      console.log(error)
      alert(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fdfaf3] flex flex-col items-center justify-center pb-15 md:pt-5 p-6">
      <div className="w-full max-w-md">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="hero-heading font-serif text-4xl text-[#1a1a1a] mb-3 tracking-tight transform scale-y-[1.4] origin-left">
            Welcome back.
          </h1>
          <p className="text-gray-600 font-sans">
            Log in to manage your sessions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-[10px] font-normal tracking-[0.15em] text-black/50 uppercase mb-2">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/40 border border-black/10 rounded-2xl px-5 py-4 outline-none focus:border-black/30 transition-all font-sans"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-[10px] font-normal tracking-[0.15em] text-black/50 uppercase mb-2">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-white/40 border border-black/10 rounded-2xl px-5 py-4 outline-none focus:border-black/30 transition-all font-sans"
              required
            />
          </div>
          <a 
          href="http://localhost:8000/api/v1.1/users/auth/google"
          className="w-full flex justify-center items-center gap-3 border-black/10 py-3 rounded-2xl"
          >
          Continue With Google
          </a>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#120f0a] text-white py-2 rounded-full font-medium text-lg hover:bg-black transition-all active:scale-[0.98] mt-4"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-gray-600 mt-8 font-sans">
          New here? <Link to="/signup" className="text-black font-semibold border-b border-black">Create an account</Link>
        </p>
      </div>
    </div>
  )
}

export default Login