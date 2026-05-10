import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {

    const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
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

      console.log(error)

      alert(
        error.response?.data?.message ||
        "Signup failed"
      )

    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-5">
        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Sign up to book mentors
        </p>

        <form 
        onSubmit={handleSubmit}
        className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
             type="text"
             name="name"
             value={formData.name}
             onChange={handleChange}
             placeholder="Enter your name"
             className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
             type="email"
             name="email"
             value={formData.email}
             onChange={handleChange}
             placeholder="Enter your email"
             className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
             />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
             type="password"
             name="password"
             value={formData.password}
             onChange={handleChange}
             placeholder="Enter your password"
             className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
             />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Role
            </label>

            <select 
             name="role"
             value={formData.role}
  o          onChange={handleChange}
             className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black">
             <option value="user">User</option>
             <option value="mentor">Mentor</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Avatar
            </label>

            <input
             type="file"
             onChange={(e) => setAvatar(e.target.files[0])}
             className="w-full border border-gray-300 rounded-xl px-4 py-3"
             />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Already have an account? Login
        </p>
      </div>
    </div>
  )
}

export default Signup