import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Menu, X, LogOut, LayoutDashboard, User, Calendar } from 'lucide-react';

function NavBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    // Close profile dropdown when clicking anywhere else
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1.1/users/logout', {}, { withCredentials: true });
      localStorage.removeItem('user');
      setUser(null);
      setProfileOpen(false);
      navigate('/login');
    } catch (error) {
      alert('Logout failed');
    }
  };

  // Helper functions for dynamic routing based on role
  const getDashboardLink = () => user?.role === 'mentor' ? '/mentor-dashboard' : '/user-dashboard';
  const getProfileLink = () => '/profile'; // Both roles use the same /profile route

  return (
    <nav className="w-full bg-[#fdfaf3] border-b border-black/5 px-6 md:px-12 relative z-100">
      <div className="max-w-7xl mx-auto flex justify-between h-16 items-center">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#120f0a] rounded-lg flex items-center justify-center">
            <span className="text-[#fdfaf3] font-serif font-bold text-xl">M</span>
          </div>
          <span className="hero-heading font-serif text-xl tracking-tighter text-[#1a1a1a] transform scale-y-[1.2] origin-left">MenBook</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className="text-[0.95rem] font-medium text-gray-700 hover:text-black transition-colors">Home</Link>
          <Link to="/mentors" className="text-[0.95rem] font-medium text-gray-700 hover:text-black transition-colors">Browse mentors</Link>
          
          {/* MENTOR ONLY LINK: Show Availability in the main Navbar */}
          {user?.role === 'mentor' && (
            <Link to="/mentor-availability" className="flex items-center gap-1.5 text-[0.95rem] font-medium text-gray-700 hover:text-black transition-colors">
              <Calendar size={16} />
              Availability
            </Link>
          )}
        </div>

        {/* Auth / Profile Section */}
        <div className="hidden md:flex items-center gap-8">
          {user ? (
            <div className="relative" ref={profileRef}>
              {/* Trigger Button */}
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 pl-1 pr-4 py-1 bg-white/50 border border-black/5 rounded-full hover:bg-white transition-all shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-serif">
                  {user.name[0]}
                </div>
                <span className="text-sm font-medium text-gray-800">{user.name}</span>
              </button>

              {/* Profile Dropdown Div (Matching image_775580.png) */}
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-[#fdfaf3] border border-black/5 rounded-[28px] shadow-2xl p-6 flex flex-col gap-1">
                  <div className="pb-4 border-b border-black/5 mb-2">
                    <p className="font-bold text-[#1a1a1a]">{user.name}</p>
                    <p className="text-sm text-gray-400 mb-2 truncate">{user.email}</p>
                    <span className="text-[10px] font-bold px-2 py-1 bg-red-50 text-red-400 rounded-md uppercase tracking-wider">
                      {user.role}
                    </span>
                  </div>

                  <Link 
                  to={getDashboardLink()} 
                  onClick={() => setProfileOpen(false)} 
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white transition-colors text-gray-700">
                  <LayoutDashboard 
                  size={18} 
                  className="text-gray-400" 
                  />
                  <span>
                    Dashboard
                  </span>
                  </Link>
                  <Link 
                  to={getProfileLink()} 
                  onClick={() => setProfileOpen(false)} 
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white transition-colors text-gray-700">
                    <User 
                    size={18} 
                    className="text-gray-400" 
                    /> 
                    <span>
                      Profile settings
                    </span>
                  </Link>
                  <hr className="my-2 border-black/5" />
                  <button 
                  onClick={handleLogout} 
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white transition-colors text-gray-700">
                    <LogOut 
                    size={18} 
                    className="text-gray-400" 
                    /> 
                    <span>
                      Log out
                    </span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-7">
              <Link to="/login" className="text-gray-700 font-medium">Log in</Link>
              <Link to="/signup" className="bg-[#120f0a] text-white px-5 py-2 rounded-full font-normal">Sign up</Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#fdfaf3] border-t border-black/5 p-6 space-y-4 pb-10">
          {user && (
            <div className="flex items-center gap-3 mb-6 p-4 bg-white/40 rounded-3xl border border-black/5">
               <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-serif">{user.name[0]}</div>
               <div>
                  <p className="font-bold text-[#1a1a1a]">{user.name}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">{user.role}</p>
               </div>
            </div>
          )}
          <Link 
          to="/" 
          className="block text-lg font-medium text-gray-800" 
          onClick={() => setMenuOpen(false)}>
            Home
            </Link>
          <Link 
          to="/mentors" 
          className="block text-lg font-medium text-gray-800" 
          onClick={() => setMenuOpen(false)}>
            Browse Mentors
          </Link>
          <div className='flex gap-5'>
          <Link
          to="/login"
          className='text-lg py-1 font-medium text-gray-900'
          onClick={() => setMenuOpen(false)}
          >
           Login
          </Link>
          <Link
          to="/signup"
          className='text-md font-normal bg-black rounded-full px-4 py-2 text-white'
          onClick={() => setMenuOpen(false)}
          >
           Signup
          </Link>
          </div>
          
          {user && (
            <>
              {/* Show Availability here for mobile if Mentor */}
              {user.role === 'mentor' && (
                <Link to="/mentor-availability" className="block text-lg font-medium text-gray-800" onClick={() => setMenuOpen(false)}>Availability</Link>
              )}
              <Link to={getDashboardLink()} className="block text-lg font-medium text-gray-800" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to={getProfileLink()} className="block text-lg font-medium text-gray-800" onClick={() => setMenuOpen(false)}>Profile Settings</Link>
              <button onClick={handleLogout} className="w-full text-left text-lg font-medium text-red-600">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;