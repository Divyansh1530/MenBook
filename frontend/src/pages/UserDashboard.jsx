import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Star, Calendar, CheckSquare, TrendingUp, ArrowRight, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

function UserDashboard() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) setUser(JSON.parse(storedUser))
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1.1/booking/user-bookings', {
        withCredentials: true
      })
      setBookings(response.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitReview = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1.1/review/create', {
        mentorId: selectedBooking.mentorId._id,
        bookingId: selectedBooking._id,
        rating,
        comment
      }, { withCredentials: true })
      alert('Review submitted successfully')
      setSelectedBooking(null)
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit review')
    }
  }

  const formatDate = (date) => new Date(date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })

  if (loading) return (
    <div className="min-h-screen bg-[#fdfaf3] flex items-center justify-center font-serif text-2xl text-gray-400">
      Loading your journey...
    </div>
  )

  // Calculate Stats
  const upcomingCount = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length
  const completedCount = bookings.filter(b => b.status === 'completed').length
  const totalInvested = bookings.reduce((acc, curr) => acc + (curr.paymentStatus === 'completed' ? curr.amount : 0), 0)

  return (
    <section className="min-h-screen bg-[#fdfaf3] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">WELCOME BACK</p>
            <h1 className="font-serif text-7xl text-[#1a1a1a] mb-4 tracking-tight lowercase">
              {user?.name.split(' ')[0]}.
            </h1>
            <p className="text-gray-500 text-lg">A snapshot of your learning journey.</p>
          </div>
          <button 
            onClick={() => navigate('/mentors')}
            className="bg-[#120f0a] text-white px-8 py-4 rounded-full font-medium flex items-center gap-3 hover:bg-black transition-all group"
          >
            Find a mentor <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* SNAPSHOT STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <StatCard icon={<Calendar size={18} />} label="UPCOMING SESSIONS" value={upcomingCount} />
          <StatCard icon={<CheckSquare size={18} />} label="COMPLETED" value={completedCount} />
          <StatCard icon={<TrendingUp size={18} />} label="INVESTED" value={`₹${totalInvested}`} />
        </div>

        {/* BOOKINGS LIST */}
        <div className="space-y-8">
          <div className="flex justify-between items-end border-b border-black/5 pb-4">
            <h2 className="font-serif text-4xl text-[#1a1a1a]">Upcoming</h2>
            <Link to="/mentors" className="text-sm font-medium text-gray-400 hover:text-black">View all &rarr;</Link>
          </div>

          {bookings.length === 0 ? (
            <div className="border-2 border-dashed border-black/5 rounded-4xl p-20 text-center">
              <p className="text-gray-500">Nothing scheduled yet. <Link to="/mentors" className="text-red-500 font-medium hover:underline">Browse mentors</Link></p>
            </div>
          ) : (
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <div key={booking._id} className="bg-white/40 border border-black/5 rounded-4xl p-8 transition-all hover:bg-white hover:shadow-xl hover:shadow-black/5">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="flex items-center gap-6">
                      <img 
                        src={booking.mentorId?.avatar || 'https://via.placeholder.com/100'} 
                        className="w-16 h-16 rounded-2xl object-cover grayscale-[0.5]" 
                        alt="mentor" 
                      />
                      <div>
                        <h3 className="font-serif text-2xl text-[#1a1a1a]">{booking.mentorId?.name}</h3>
                        <p className="text-gray-500 text-sm">{formatDate(booking.startTime)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          booking.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                        }`}>
                          {booking.status}
                        </span>
                        <p className="font-serif text-xl mt-1 text-[#1a1a1a]">₹{booking.amount}</p>
                      </div>
                      
                      {booking.status === 'completed' && (
                        <button 
                          onClick={() => setSelectedBooking(booking)}
                          className="bg-[#120f0a] text-white px-6 py-3 rounded-2xl text-sm font-medium hover:bg-black transition-all"
                        >
                          Leave Review
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* REVIEW MODAL */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <div className="bg-[#fdfaf3] rounded-[40px] w-full max-w-xl p-12 relative border border-black/5 shadow-2xl">
              <button onClick={() => setSelectedBooking(null)} className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors">
                <X size={24} />
              </button>
              <h2 className="font-serif text-4xl text-[#1a1a1a] mb-8">How was your session?</h2>
              <div className="flex gap-2 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)}>
                    <Star size={32} fill={star <= rating ? "#e94e36" : "none"} className={star <= rating ? "text-[#e94e36]" : "text-gray-200"} />
                  </button>
                ))}
              </div>
              <textarea 
                rows={4} 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
                placeholder="Your experience helps others..."
                className="w-full bg-white border border-black/5 rounded-3xl p-6 outline-none focus:ring-2 focus:ring-black/5 mb-8 font-sans"
              />
              <button onClick={handleSubmitReview} className="w-full bg-[#120f0a] text-white py-4 rounded-full font-medium text-lg hover:bg-black transition-all">
                Submit Review
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white/40 border border-black/5 rounded-4xl p-10 flex flex-col items-start transition-all hover:bg-white hover:shadow-lg hover:shadow-black/5">
    <div className="flex items-center gap-2 text-gray-400 mb-6">
      {icon}
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase">{label}</span>
    </div>
    <span className="font-serif text-5xl text-[#1a1a1a]">{value}</span>
  </div>
)

export default UserDashboard