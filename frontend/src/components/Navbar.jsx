import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Menu, X, LogOut, LayoutDashboard, Calendar, Compass } from 'lucide-react'

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
        { withCredentials: true }
      )
      localStorage.removeItem('user')
      setUser(null)
      navigate('/login')
    } catch (error) {
      console.log(error)
      alert(error.response?.data?.message || 'Logout failed')
    }
  }

  return (
    // OUTER WRAPPER: Centers the bar and provides top padding
    <div className='fixed top-4 left-0 w-full z-50 px-4 sm:px-6 lg:px-8'>
      
      {/* THE ROUNDED PILL BAR */}
      <nav className='max-w-7xl mx-auto bg-white/50 backdrop-blur-2xl border border-white/40 shadow-[0_2px_22px_0_rgba(31,38,135,0.07)] rounded-[28px] overflow-hidden'>
        
        <div className='px-6 lg:px-8'>
          <div className='flex justify-between h-16 items-center'>

            {/* LOGO */}
            <Link to='/' className='flex items-center gap-2 group'>
              <div className='w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-6'>
                <span className='text-white font-black text-lg'>M</span>
              </div>
              <span className='font-bold text-xl tracking-tight text-slate-900'>
                MenBook
              </span>
            </Link>

            {/* DESKTOP NAV - Minimalist style */}
            <div className='hidden md:flex items-center space-x-1'>
              <Link to='/' className='px-4 py-2 text-sm text-slate-600 hover:text-indigo-600 font-semibold transition-all rounded-full hover:bg-indigo-50'>
                Home
              </Link>
              <Link to='/mentors' className='flex items-center gap-1.5 px-4 py-2 text-sm text-slate-600 hover:text-indigo-600 font-semibold transition-all rounded-full hover:bg-indigo-50'>
                Browse
              </Link>

              {user?.role === 'mentor' && (
                <>
                  <Link to='/mentor-dashboard' className='flex items-center gap-1.5 px-4 py-2 text-sm text-slate-600 hover:text-indigo-600 font-semibold transition-all rounded-full hover:bg-indigo-50'>
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                  <Link to='/mentor-availability' className='flex items-center gap-1.5 px-4 py-2 text-sm text-slate-600 hover:text-indigo-600 font-semibold transition-all rounded-full hover:bg-indigo-50'>
                    <Calendar size={16} />
                    Availability
                  </Link>
                </>
              )}

              {user?.role === 'user' && (
                <Link to='/user-dashboard' className='px-4 py-2 text-sm text-slate-600 hover:text-indigo-600 font-semibold transition-all rounded-full hover:bg-indigo-50'>
                  My Bookings
                </Link>
              )}
            </div>

            {/* RIGHT SIDE */}
            <div className='hidden md:flex items-center'>
              {user ? (
                <div className='flex items-center gap-3'>
                  {/* USER INFO PILL */}
                  <div className='flex items-center gap-2 bg-slate-50 border border-slate-100 pl-1.5 pr-3 py-1.5 rounded-full'>
                    <img
                      src={user.avatar || 'https://via.placeholder.com/40'}
                      alt='avatar'
                      className='w-7 h-7 rounded-full object-cover shadow-sm'
                    />
                    <span className='text-xs font-bold text-slate-700 tracking-tight'>
                      {user.name.split(' ')[0]}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className='p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all'
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <div className='flex items-center gap-2'>
                  <Link to='/login' className='text-sm font-bold text-slate-600 hover:text-slate-900 px-4 py-2'>
                    Login
                  </Link>
                  <Link
                    to='/signup'
                    className='bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-slate-200 hover:bg-indigo-600 hover:shadow-indigo-100 transition-all active:scale-95'
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* MOBILE BUTTON */}
            <button
              className='md:hidden p-2 text-slate-900 hover:bg-slate-50 rounded-xl transition-colors'
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className='md:hidden bg-white/95 border-t border-slate-100 p-6 space-y-4'>
            <Link to='/' className='block text-lg font-bold text-slate-800' onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to='/mentors' className='block text-lg font-bold text-slate-800' onClick={() => setMenuOpen(false)}>Browse Mentors</Link>
            {user ? (
              <button onClick={handleLogout} className='w-full text-left text-lg font-bold text-red-500'>Logout</button>
            ) : (
              <div className='flex flex-col gap-3 pt-2'>
                <Link to='/login' className='w-full py-3 text-center font-bold text-slate-700 border border-slate-200 rounded-2xl'>Login</Link>
                <Link to='/signup' className='w-full py-3 text-center font-bold text-white bg-slate-900 rounded-2xl'>Sign Up</Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  )
}

export default NavBar