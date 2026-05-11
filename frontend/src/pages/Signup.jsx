import React,{useState} from 'react'
import axios from 'axios'
import {Link, useNavigate } from 'react-router-dom'

function Signup() {

    const navigate = useNavigate()

  const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      role: "user",
      bio: "",
      expertise: "",
      pricing: ""
  })

  const [avatar, setAvatar] = useState(null)

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

      const data = new FormData()

      data.append("name", formData.name)
      data.append("email", formData.email)
      data.append("password", formData.password)
      data.append("role", formData.role)

      if (formData.role === "mentor") {

  data.append("bio", formData.bio)

  data.append(
    "expertise",
    JSON.stringify(
      formData.expertise
        .split(",")
        .map((item) => item.trim())
    )
  )

  data.append(
    "pricing",
    Number(formData.pricing)
  )
}

      if (avatar) {
        data.append("avatar", avatar)
      }

      const response = await axios.post(
        "http://localhost:8000/api/v1.1/users/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true
        }
      )

      console.log(response.data)

      alert("Signup successful")

      navigate("/login")

    } catch (error) {

      console.log(error.response.data)

      alert(
        error.response?.data?.message ||
        "Signup failed"
      )

    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-22">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mb-5">
          Sign up to book mentors
        </p>

        <form 
        onSubmit={handleSubmit}
        className="space-y-5">
          <div>
            <label className="block mb-1 font-normal">
              Full Name
            </label>

            <input
             type="text"
             name="name"
             value={formData.name}
             onChange={handleChange}
             placeholder="Enter your name"
             className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
                />
          </div>

          <div>
            <label className="block mb-1 font-normal">
              Email
            </label>

            <input
             type="email"
             name="email"
             value={formData.email}
             onChange={handleChange}
             placeholder="Enter your email"
             className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
             />
          </div>

          <div>
            <label className="block mb-1 font-normal">
              Password
            </label>

            <input
             type="password"
             name="password"
             value={formData.password}
             onChange={handleChange}
             placeholder="Enter your password"
             className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
             />
          </div>

          <div>
            <label className="block mb-1 font-normal">
              Role
            </label>

            <select 
             name="role"
             value={formData.role}
             onChange={handleChange}
             className="w-full border border-gray-300 rounded-lg px-4 py-1 outline-none focus:ring-2 focus:ring-black">
             <option value="user">User</option>
             <option value="mentor">Mentor</option>
            </select>
            {
  formData.role === "mentor" && (
    <>

      <div>
        <label className="block mb-2 font-normal">
          Bio
        </label>

        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell users about yourself"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block mb-2 font-normal">
          Expertise
        </label>

        <input
          type="text"
          name="expertise"
          value={formData.expertise}
          onChange={handleChange}
          placeholder="React, Node.js, System Design"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="block mb-2 font-normal">
          Session Price
        </label>

        <input
          type="number"
          name="pricing"
          value={formData.pricing}
          onChange={handleChange}
          placeholder="499"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
        />
      </div>

    </>
  )
}
          </div>

          <div>
            <label className="block mb-1 font-normal">
              Avatar
            </label>

            <input
             type="file"
             onChange={(e) => setAvatar(e.target.files[0])}
             className="w-full border border-gray-300 rounded-lg px-4 py-1"
             />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup