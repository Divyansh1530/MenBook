import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Menu, X } from 'lucide-react'

function NavBar() {

  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {

    const storedUser = localStorage.getItem('user')

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

  }, [])

  const handleLogout = async () => {

    try {

      await axios.post(
        'http://localhost:8000/api/v1.1/users/logout',
        {},
        {
          withCredentials: true
        }
      )

      localStorage.removeItem('user')

      setUser(null)

      alert('Logout successful')

      navigate('/login')

    } catch (error) {

      console.log(error)

      alert(
        error.response?.data?.message ||
        'Logout failed'
      )
    }
  }

  return (
    <nav className='fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/10 text-white'>

      <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>

        {/* LOGO */}
        <Link
          to='/'
          className='text-2xl font-black tracking-wide'
        >
          MenBook
        </Link>

        {/* DESKTOP NAV */}
        <div className='hidden md:flex items-center gap-8'>

          <Link
            to='/'
            className='hover:text-gray-300 transition'
          >
            Home
          </Link>

          <Link
            to='/mentors'
            className='hover:text-gray-300 transition'
          >
            Mentors
          </Link>

          {
            user?.role === 'mentor' && (
              <Link
                to='/mentor-dashboard'
                className='hover:text-gray-300 transition'
              >
                Dashboard
              </Link>
            )
          }

          {
            user ? (
              <div className='flex items-center gap-4'>

                <div className='flex items-center gap-3'>

                  <img
                    src={user.avatar || 'https://via.placeholder.com/40'}
                    alt='avatar'
                    className='w-10 h-10 rounded-full object-cover border border-white/20'
                  />

                  <div>
                    <p className='font-medium'>
                      {user.name}
                    </p>

                    <p className='text-xs text-gray-400 capitalize'>
                      {user.role}
                    </p>
                  </div>

                </div>

                <button
                  onClick={handleLogout}
                  className='bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-medium transition'
                >
                  Logout
                </button>

              </div>
            ) : (
              <div className='flex items-center gap-4'>

                <Link
                  to='/login'
                  className='hover:text-gray-300 transition'
                >
                  Login
                </Link>

                <Link
                  to='/signup'
                  className='bg-white text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition'
                >
                  Sign Up
                </Link>

              </div>
            )
          }

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className='md:hidden'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {
            menuOpen
              ? <X size={28} />
              : <Menu size={28} />
          }
        </button>

      </div>

      {/* MOBILE MENU */}
      {
        menuOpen && (
          <div className='md:hidden bg-black border-t border-white/10 px-6 py-6 space-y-5'>

            <Link
              to='/'
              className='block hover:text-gray-300'
            >
              Home
            </Link>

            <Link
              to='/mentors'
              className='block hover:text-gray-300'
            >
              Mentors
            </Link>

            {
              user?.role === 'mentor' && (
                <Link
                  to='/mentor-dashboard'
                  className='block hover:text-gray-300'
                >
                  Dashboard
                </Link>
              )
            }

            {
              user ? (
                <button
                  onClick={handleLogout}
                  className='w-full bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl font-medium transition'
                >
                  Logout
                </button>
              ) : (
                <div className='flex flex-col gap-4'>

                  <Link
                    to='/login'
                    className='border border-white/20 px-5 py-3 rounded-xl text-center'
                  >
                    Login
                  </Link>

                  <Link
                    to='/signup'
                    className='bg-white text-black px-5 py-3 rounded-xl font-semibold text-center'
                  >
                    Sign Up
                  </Link>

                </div>
              )
            }

          </div>
        )
      }

    </nav>
  )
}

export default NavBar
