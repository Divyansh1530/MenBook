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

    <nav className='fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200'>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

        <div className='flex justify-between h-20 items-center'>

          {/* LOGO */}
          <Link
            to='/'
            className='flex items-center gap-3'
          >

            <div className='w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md'>

              <span className='text-white font-black text-xl'>
                M
              </span>

            </div>

            <span className='font-black text-2xl tracking-tight text-slate-900'>
              MenBook
            </span>

          </Link>

          {/* DESKTOP NAV */}
          <div className='hidden md:flex items-center space-x-8'>

            <Link
              to='/'
              className='text-slate-600 hover:text-indigo-600 font-medium transition-colors'
            >
              Home
            </Link>

            <Link
              to='/mentors'
              className='text-slate-600 hover:text-indigo-600 font-medium transition-colors'
            >
              Browse Mentors
            </Link>

            {
              user?.role === 'mentor' && (

                <>
                  <Link
                    to='/mentor-dashboard'
                    className='text-slate-600 hover:text-indigo-600 font-medium transition-colors'
                  >
                    Dashboard
                  </Link>

                  <Link
                    to='/mentor-availability'
                    className='text-slate-600 hover:text-indigo-600 font-medium transition-colors'
                  >
                    Availability
                  </Link>
                </>
              )
            }

            {
              user?.role === 'user' && (

                <Link
                  to='/user-dashboard'
                  className='text-slate-600 hover:text-indigo-600 font-medium transition-colors'
                >
                  My Bookings
                </Link>

              )
            }

          </div>

          {/* RIGHT SIDE */}
          <div className='hidden md:flex items-center space-x-4'>

            {
              user ? (

                <div className='flex items-center gap-4'>

                  {/* USER INFO */}
                  <div className='flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-2xl'>

                    <img
                      src={
                        user.avatar ||
                        'https://via.placeholder.com/40'
                      }
                      alt='avatar'
                      className='w-10 h-10 rounded-full object-cover'
                    />

                    <div>

                      <p className='font-semibold text-slate-900 leading-none'>
                        {user.name}
                      </p>

                      <p className='text-xs text-gray-500 capitalize mt-1'>
                        {user.role}
                      </p>

                    </div>

                  </div>

                  {/* LOGOUT */}
                  <button
                    onClick={handleLogout}
                    className='bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm'
                  >
                    Logout
                  </button>

                </div>

              ) : (

                <>
                  <Link
                    to='/login'
                    className='text-slate-600 hover:text-slate-900 font-medium px-3 py-2 transition-colors'
                  >
                    Login
                  </Link>

                  <Link
                    to='/signup'
                    className='bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm hover:shadow-indigo-500/20'
                  >
                    Sign Up
                  </Link>
                </>

              )
            }

          </div>

          {/* MOBILE BUTTON */}
          <button
            className='md:hidden text-slate-900'
            onClick={() => setMenuOpen(!menuOpen)}
          >

            {
              menuOpen
                ? <X size={28} />
                : <Menu size={28} />
            }

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}
      {
        menuOpen && (

          <div className='md:hidden bg-white border-t border-gray-200 px-6 py-6 space-y-5 shadow-lg'>

            <Link
              to='/'
              className='block text-slate-700 hover:text-indigo-600 font-medium'
            >
              Home
            </Link>

            <Link
              to='/mentors'
              className='block text-slate-700 hover:text-indigo-600 font-medium'
            >
              Browse Mentors
            </Link>

            {
              user?.role === 'mentor' && (

                <>
                  <Link
                    to='/mentor-dashboard'
                    className='block text-slate-700 hover:text-indigo-600 font-medium'
                  >
                    Dashboard
                  </Link>

                  <Link
                    to='/mentor-availability'
                    className='block text-slate-700 hover:text-indigo-600 font-medium'
                  >
                    Availability
                  </Link>
                </>
              )
            }

            {
              user?.role === 'user' && (

                <Link
                  to='/user-dashboard'
                  className='block text-slate-700 hover:text-indigo-600 font-medium'
                >
                  My Bookings
                </Link>

              )
            }

            {
              user ? (

                <button
                  onClick={handleLogout}
                  className='w-full bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-medium transition'
                >
                  Logout
                </button>

              ) : (

                <div className='flex flex-col gap-4'>

                  <Link
                    to='/login'
                    className='border border-gray-300 px-5 py-3 rounded-xl text-center font-medium text-slate-700'
                  >
                    Login
                  </Link>

                  <Link
                    to='/signup'
                    className='bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold text-center'
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