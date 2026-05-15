import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, Search } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function BrowseMentors() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get('search') || '';
  const [search, setSearch] = useState(query);
  
  const navigate = useNavigate();

  const categories = [
    { name: 'All', icon: null },
    { name: 'Therapist', icon: '🧠' },
    { name: 'UI / UX Designer', icon: '✳' },
    { name: 'Software Engineer', icon: '{}' },
    { name: 'Product Manager', icon: '◆' },
    { name: 'Career Coach', icon: '↗' },
    { name: 'Finance Mentor', icon: '$' },
    { name: 'Startup Founder', icon: '▲' },
    { name: 'Data Scientist', icon: '≈' }
  ];

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/api/v1.1/users/mentors', {
          params: { search: query }
        });
        setMentors(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, [query]);

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') setSearchParams({ search });
  };

  const handleCategoryClick = (catName) => {
    if (catName === 'All') {
      setSearchParams({});
      setSearch('');
    } else {
      setSearchParams({ search: catName });
      setSearch(catName);
    }
  };

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();
  const getAvatarBg = (id) => {
    const colors = ['bg-orange-200', 'bg-green-200', 'bg-blue-200', 'bg-rose-200', 'bg-yellow-200'];
    return colors[id.charCodeAt(id.length - 1) % colors.length];
  };

  return (
    <div className="bg-[#fdfaf3] min-h-screen pt-20 pb-24 px-4 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section - Mobile Responsive Text */}
        <header className="mb-10 sm:mb-12 text-left">
          <p className="text-[10px] font-normal tracking-[0.2em] text-black/50 uppercase mb-3">
            DIRECTORY
          </p>
          <h1 className="hero-heading font-serif text-4xl sm:text-6xl text-[#1a1a1a] mb-4 sm:mb-6 tracking-tighter transform scale-y-[1.2] origin-left">
            Browse mentors
          </h1>
          <p className="text-gray-500 max-w-xl text-base sm:text-lg font-sans leading-relaxed">
            Filter by specialization, or search by name. Every mentor is reviewed by hand.
          </p>
        </header>

        {/* Search and Filters */}
        <div className="mb-12 sm:mb-16 space-y-6">
          {/* Search Bar - Full width on mobile */}
          <div className="relative w-full sm:max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search by name or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchSubmit}
              className="w-full bg-white border border-black/5 rounded-full py-3 sm:py-4 pl-12 pr-6 outline-none focus:ring-2 focus:ring-black/5 transition-all shadow-sm text-sm sm:text-base"
            />
          </div>

          {/* Specialization Chips - Responsive Layout */}
          <div className="flex flex-wrap gap-2 sm:gap-3 overflow-visible">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border text-[12px] sm:text-[13px] font-medium transition-all whitespace-nowrap ${
                  (query === cat.name || (cat.name === 'All' && !query))
                  ? 'bg-[#120f0a] text-white border-[#120f0a]' 
                  : 'bg-white/50 border-black/5 text-gray-600 hover:border-black/20 hover:bg-white'
                }`}
              >
                {cat.icon && <span className="text-red-500/80 text-sm">{cat.icon}</span>}
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid - Column adjustments for mobile */}
        {loading ? (
          <div className="text-center py-20 font-serif text-2xl text-gray-400 animate-pulse">Searching database...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {mentors.length > 0 ? mentors.map((mentor) => (
              <div
                key={mentor._id}
                className="bg-white/40 border border-black/5 rounded-[28px] sm:rounded-4xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-black/5"
              >
                <div>
                  <div className="flex justify-between items-start mb-5 sm:mb-6">
                    <div className="flex gap-3 sm:gap-4 items-center">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center font-serif text-base sm:text-lg text-black/70 ${getAvatarBg(mentor._id)}`}>
                        {getInitials(mentor.name)}
                      </div>
                      <div>
                        <h3 className="font-serif text-lg sm:text-xl text-[#1a1a1a] leading-tight">{mentor.name}</h3>
                        <p className="text-gray-500 text-xs sm:text-sm mt-1">{mentor.mentorProfile?.title || "Senior Lead"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-[#1a1a1a]">
                      <Star size={12} className="fill-red-500 text-red-500 sm:w-3.5" />
                      {mentor.mentorProfile?.avgRating || "5.0"}
                    </div>
                  </div>

                  <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-6 line-clamp-3">
                    {mentor.mentorProfile?.bio || "Expertise at the intersection of clarity and craft."}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
                    {mentor.mentorProfile?.expertise?.slice(0, 2).map((exp, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-[10px] sm:text-xs font-medium">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-5 sm:pt-6 border-t border-black/5 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-xl sm:text-2xl text-[#1a1a1a]">₹{mentor.mentorProfile?.pricing || '0'}</span>
                      <span className="text-[10px] sm:text-xs text-gray-400">/session</span>
                    </div>
                    <p className="text-[9px] sm:text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-1">
                      {Math.floor(Math.random() * 50) + 10} sessions
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/mentors/${mentor._id}`)}
                    className="bg-[#120f0a] text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium hover:bg-black transition-all active:scale-95"
                  >
                    Book a slot
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-20 text-gray-400 font-serif text-xl">No mentors found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BrowseMentors;