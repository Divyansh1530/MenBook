import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, CheckSquare, Users, TrendingUp, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function MentorDashboard({
  user
}) {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

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

  const upcomingCount = bookings.filter(b => b.status === 'confirmed').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;
  const learnerCount = new Set(bookings.map(b => b.userId?._id)).size;
  const totalEarnings = bookings.reduce((acc, curr) => acc + (curr.status === 'completed' ? curr.amount : 0), 0);

  return (
    <section className="min-h-screen bg-[#fdfaf3] py-12 md:py-24 px-4 sm:px-8 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto lg:mx-35">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div className="w-full md:w-auto">
            <p className="text-[10px] font-normal tracking-[0.2em] text-black/50 uppercase mb-3 md:mb-4">MENTOR DESK</p>
            <h1 className="hero-heading transform scale-y-[1.1] md:scale-y-[1.2] origin-left font-serif text-4xl sm:text-5xl md:text-6xl text-[#1a1a1a] mb-4 tracking-tight">
              Hi, {user?.name?.split(' ')[0] || 'Mentor'}.
            </h1>
            <p className="text-gray-500 text-base md:text-lg">Your bookings and earnings at a glance.</p>
          </div>
          <button 
            onClick={() => navigate('/mentor-availability')}
            className="w-full md:w-auto bg-[#120f0a] text-white px-6 py-3 rounded-full font-medium flex items-center justify-center gap-3 hover:bg-black transition-all group"
          >
            Manage availability <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* SNAPSHOT STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20">
          <StatCard icon={<Calendar size={16} />} label="UPCOMING" value={upcomingCount}  />
          <StatCard icon={<CheckSquare size={16} />} label="COMPLETED" value={completedCount} />
          <StatCard icon={<Users size={16} />} label="LEARNERS" value={learnerCount} />
          <StatCard icon={<TrendingUp size={16} />} label="EARNINGS" value={`₹${totalEarnings}`} />
        </div>

        {/* BOOKINGS LIST */}
        <div className="space-y-6 md:space-y-8">
          <div className="flex justify-between items-end border-b border-black/5 pb-4">
            <h2 className="font-serif text-3xl md:text-4xl text-[#1a1a1a]">Upcoming sessions</h2>
            <button className="text-sm font-medium text-gray-400 hover:text-black">View all &rarr;</button>
          </div>

          {bookings.length === 0 ? (
            <div className="border-2 border-dashed border-black/5 rounded-4xl md:rounded-4xl p-10 md:p-20 text-center">
              <p className="text-gray-500">No bookings yet. <button onClick={() => navigate('/mentor-availability')} className="text-red-500 font-medium hover:underline">Open more slots</button></p>
            </div>
          ) : (
            <div className="grid gap-4 md:gap-6">
              {bookings.map((booking) => (
                <div key={booking._id} className="bg-white/40 border border-black/5 rounded-4xl md:rounded-4xl p-6 md:p-8 transition-all hover:bg-white hover:shadow-xl hover:shadow-black/5">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                        <img 
                          src={booking.userId?.avatar || 'https://via.placeholder.com/100'} 
                          className="w-full h-full object-cover" 
                          alt="learner" 
                        />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl md:text-2xl text-[#1a1a1a]">{booking.userId?.name}</h3>
                        <p className="text-gray-500 text-xs md:text-sm">{formatDate(booking.startTime)}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-row sm:flex-row items-center justify-between w-full sm:w-auto gap-4 md:gap-8 border-t sm:border-t-0 pt-4 sm:pt-0">
                      <div className="text-left sm:text-right">
                        <span className={`px-3 py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${
                          booking.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                        }`}>
                          {booking.status}
                        </span>
                        <p className="font-serif text-lg md:text-xl mt-1 text-[#1a1a1a]">₹{booking.amount}</p>
                      </div>
                      
                      {booking.status === 'confirmed' && (
                        <button 
                          onClick={() => handleMarkCompleted(booking._id)}
                          className="bg-[#120f0a] text-white px-5 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-medium hover:bg-black transition-all"
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
  <div className="bg-white/40 border border-black/5 rounded-4xl p-6 md:p-8 flex flex-col items-start transition-all hover:bg-white hover:shadow-lg hover:shadow-black/5">
    <div className="flex items-center gap-2 text-gray-400 mb-4 md:mb-6">
      {icon}
      <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase">{label}</span>
    </div>
    <span className="font-serif text-3xl md:text-4xl text-[#1a1a1a]">{value}</span>
  </div>
);

export default MentorDashboard;