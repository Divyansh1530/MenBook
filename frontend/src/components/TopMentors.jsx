import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, ArrowRight } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function TopMentors() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  
  const navigate = useNavigate();

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
  }, [searchParams]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1.1/users/mentors', {
          params: { search }
        });
        setMentors(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, [search]);

  if (loading) {
    return (
      <div className="py-24 text-center font-serif text-2xl text-[#1a1a1a] bg-[#fdfaf3]">
        Loading community favorites...
      </div>
    );
  }

  return (
    <section className="bg-[#fdfaf3] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-[11px] font-normal tracking-[0.2em] text-black/80 uppercase mb-4">
              02 — TOP MENTORS
            </p>
            <h2 className="hero-heading font-light text-3xl md:text-5xl text-[#1a1a1a] leading-tighter tracking-tighter max-w-md transform scale-y-[1.2] origin-left">
              People our community keeps coming back to.
            </h2>
          </div>
          <button 
            onClick={() => navigate('/mentors')}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            See all <ArrowRight size={16} />
          </button>
        </div>

        {/* Mentor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div
              key={mentor._id}
              className="bg-white/40 border border-black/20 rounded-4xl p-8 flex flex-col justify-between transition-all duration-300 shadow-xl hover:bg-white hover:shadow-2xl hover:shadow-black/5"
            >
              <div>
                {/* Header: Avatar, Name, and Rating */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4 items-center">
                    <img
                      src={
                        mentor.avatar
                      }
                      alt={mentor.name}
                      className='w-14 h-14 rounded-2xl object-cover border border-black/10'
                    />
                    <div>
                      <h3 className="hero-heading font-serif text-xl text-[#1a1a1a] leading-tight tracking-tighter transform scale-y-[1.2] origin-left">
                        {mentor.name}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">
                        {mentor.mentorProfile?.title || "Senior Professional"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-bold text-[#1a1a1a]">
                    <Star size={14} className="fill-red-500 text-red-500" />
                    {mentor.mentorProfile?.avgRating || "5.0"}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-600 text-[15px] leading-relaxed mb-4 line-clamp-3">
                  {mentor.mentorProfile?.bio || "Expert guidance at the intersection of clarity and professional craft."}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.mentorProfile?.expertise?.slice(0, 2).map((exp, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer: Pricing and CTA */}
              <div className="pt-6 border-t border-black/15 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-2xl text-[#1a1a1a]">₹{mentor.mentorProfile?.pricing || '499'}</span>
                    <span className="text-xs text-gray-400">/session</span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-1">
                    {Math.floor(Math.random() * 500) + 100} sessions
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/mentors/${mentor._id}`)}
                  className="bg-[#120f0a] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-black transition-all active:scale-95"
                >
                  Book a slot
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopMentors;