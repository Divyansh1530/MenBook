import { useEffect, useState } from 'react'

import axios from 'axios'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

/*
    PAGES
*/

import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Mentor from './pages/Mentor'
import UserDashboard from './pages/UserDashboard'
import MentorDashboard from './pages/MentorDashboard'
import MentorAvailability from './pages/MentorAvailability'
import Profile from './pages/Profile'
import BrowseMentors from './pages/BrowseMentors'

/*
    COMPONENTS
*/

import NavBar from './components/Navbar'
import Footer from './components/Footer'
import TopMentors from './components/TopMentors'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  const [user, setUser] = useState(null)

  const [loading, setLoading] = useState(true)

  /*
      FETCH CURRENT USER
  */

  useEffect(() => {

    const fetchCurrentUser = async () => {

      try {

        const response = await axios.get(
          'http://localhost:8000/api/v1.1/users/current-user',
          {
            withCredentials: true
          }
        )

        setUser(response.data.data)

      } catch (error) {

        setUser(null)
      } finally {

        setLoading(false)
      }
    }

    fetchCurrentUser()

  }, [])

  /*
      LOADING
  */

  if (loading) {

    return (
      <div className='min-h-screen flex items-center justify-center text-3xl font-bold'>
        Loading...
      </div>
    )
  }

  return (

    <BrowserRouter>

      <div className='bg-[#fbf6ee]'>

        <NavBar
          user={user}
          setUser={setUser}
        />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/mentors/:id"
            element={<Mentor />}
          />

          <Route
            path="/mentors"
            element={<TopMentors />}
          />

          <Route
            path="/browse-mentors"
            element={<BrowseMentors />}
          />

          {/* USER DASHBOARD */}

          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute
                user={user}
                allowedRole="user"
              >
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* MENTOR DASHBOARD */}

          <Route
            path="/mentor-dashboard"
            element={
              <ProtectedRoute
                user={user}
                allowedRole="mentor"
              >
                <MentorDashboard />
              </ProtectedRoute>
            }
          />

          {/* PROFILE */}

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                user={user}
                allowedRole={user?.role}
              >
                <Profile
                  user={user}
                  setUser={setUser}
                />
              </ProtectedRoute>
            }
          />

          {/* MENTOR AVAILABILITY */}

          <Route
            path="/mentor-availability"
            element={
              <ProtectedRoute
                user={user}
                allowedRole="mentor"
              >
                <MentorAvailability />
              </ProtectedRoute>
            }
          />

          {/* AUTH */}

          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            path="/login"
            element={
              <Login
                setUser={setUser}
              />
            }
          />

        </Routes>

        <Footer />

      </div>

    </BrowserRouter>
  )
}

export default App