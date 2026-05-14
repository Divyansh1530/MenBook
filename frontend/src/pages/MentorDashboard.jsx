import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, CheckSquare, Users, TrendingUp, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function MentorDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1.1/booking/mentor-bookings', {
        withCredentials: true
      });
      setBookings(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkCompleted = async (bookingId) => {
    try {
      await axios.patch(`http://localhost:8000/api/v1.1/booking/${bookingId}/complete`, {}, {
        withCredentials: true
      });
      alert('Booking marked as completed');
      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update booking');
    }
  };

  const formatDate = (date) => new Date(date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });

  if (loading) return (
    <div className="min-h-screen bg-[#fdfaf3] flex items-center justify-center font-serif text-2xl text-gray-400">
      Opening your desk...
    </div>
  );

  // Statistics Calculation
  const upcomingCount = bookings.filter(b => b.status === 'confirmed').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;
  const learnerCount = new Set(bookings.map(b => b.userId?._id)).size;
  const totalEarnings = bookings.reduce((acc, curr) => acc + (curr.status === 'completed' ? curr.amount : 0), 0);

  return (
    <section className="min-h-screen bg-[#fdfaf3] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">MENTOR DESK</p>
            <h1 className="font-serif text-7xl text-[#1a1a1a] mb-4 tracking-tight lowercase">
              Hi, {user?.name.split(' ')[0]}.
            </h1>
            <p className="text-gray-500 text-lg">Your bookings and earnings at a glance.</p>
          </div>
          <button 
            onClick={() => navigate('/mentor-availability')}
            className="bg-[#120f0a] text-white px-8 py-4 rounded-full font-medium flex items-center gap-3 hover:bg-black transition-all group"
          >
            Manage availability <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* SNAPSHOT STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <StatCard icon={<Calendar size={16} />} label="UPCOMING" value={upcomingCount} />
          <StatCard icon={<CheckSquare size={16} />} label="COMPLETED" value={completedCount} />
          <StatCard icon={<Users size={16} />} label="LEARNERS" value={learnerCount} />
          <StatCard icon={<TrendingUp size={16} />} label="EARNINGS" value={`₹${totalEarnings}`} />
        </div>

        {/* BOOKINGS LIST */}
        <div className="space-y-8">
          <div className="flex justify-between items-end border-b border-black/5 pb-4">
            <h2 className="font-serif text-4xl text-[#1a1a1a]">Upcoming sessions</h2>
            <button className="text-sm font-medium text-gray-400 hover:text-black">View all &rarr;</button>
          </div>

          {bookings.length === 0 ? (
            <div className="border-2 border-dashed border-black/5 rounded-4xl p-20 text-center">
              <p className="text-gray-500">No bookings yet. <button onClick={() => navigate('/mentor-availability')} className="text-red-500 font-medium hover:underline">Open more slots</button></p>
            </div>
          ) : (
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <div key={booking._id} className="bg-white/40 border border-black/5 rounded-4xl p-8 transition-all hover:bg-white hover:shadow-xl hover:shadow-black/5">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img 
                          src={booking.userId?.avatar || 'https://via.placeholder.com/100'} 
                          className="w-full h-full object-cover" 
                          alt="learner" 
                        />
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl text-[#1a1a1a]">{booking.userId?.name}</h3>
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
                      
                      {booking.status === 'confirmed' && (
                        <button 
                          onClick={() => handleMarkCompleted(booking._id)}
                          className="bg-[#120f0a] text-white px-6 py-3 rounded-2xl text-sm font-medium hover:bg-black transition-all"
                        >
                          Mark Completed
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white/40 border border-black/5 rounded-3xl p-8 flex flex-col items-start transition-all hover:bg-white hover:shadow-lg hover:shadow-black/5">
    <div className="flex items-center gap-2 text-gray-400 mb-6">
      {icon}
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase">{label}</span>
    </div>
    <span className="font-serif text-4xl text-[#1a1a1a]">{value}</span>
  </div>
);

export default MentorDashboard;