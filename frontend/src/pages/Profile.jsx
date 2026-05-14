import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  FiCamera, 
  FiLock, 
  FiSave, 
  FiLinkedin, 
  FiBriefcase, 
  FiAward, 
  FiDollarSign, 
  FiFileText 
} from 'react-icons/fi';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    expertise: '',
    pricing: '',
    experience: '',
    linkedin: '',
    portfolio: ''
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '' // Added for UI matching image_774311.png
  });

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1.1/users/current-user', {
        withCredentials: true
      });
      const currentUser = response.data.data;
      setUser(currentUser);
      setFormData({
        name: currentUser.name || '',
        bio: currentUser.mentorProfile?.bio || '',
        expertise: currentUser.mentorProfile?.expertise?.join(', ') || '',
        pricing: currentUser.mentorProfile?.pricing || '',
        experience: currentUser.mentorProfile?.experience || '',
        linkedin: currentUser.mentorProfile?.linkedin || '',
        portfolio: currentUser.mentorProfile?.portfolio || ''
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) => setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const handleUpdateProfile = async () => {
    try {
      const payload = { name: formData.name };
      if (user.role === 'mentor') {
        payload.bio = formData.bio;
        payload.expertise = formData.expertise.split(',').map(item => item.trim());
        payload.pricing = formData.pricing;
        payload.experience = formData.experience;
        payload.linkedin = formData.linkedin;
        payload.portfolio = formData.portfolio;
      }
      await axios.patch('http://localhost:8000/api/v1.1/users/update-details', payload, { withCredentials: true });
      alert('Profile updated successfully');
      fetchCurrentUser();
    } catch (error) {
      alert(error.response?.data?.message || 'Profile update failed');
    }
  };

  const handleAvatarUpdate = async (file) => {
    try {
      const data = new FormData();
      data.append('avatar', file);
      await axios.patch('http://localhost:8000/api/v1.1/users/update-avatar', data, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Avatar updated successfully');
      fetchCurrentUser();
    } catch (error) {
      alert('Avatar update failed');
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
        return alert("Passwords do not match");
    }
    try {
      await axios.patch('http://localhost:8000/api/v1.1/users/change-password', {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
      }, { withCredentials: true });
      alert('Password changed successfully');
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      alert(error.response?.data?.message || 'Password change failed');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#fdfaf3] flex items-center justify-center font-serif text-2xl text-gray-400">
      Loading Profile...
    </div>
  );

  return (
    <section className="min-h-screen bg-[#fdfaf3] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-16">
          <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">ACCOUNT</p>
          <h1 className="font-serif text-6xl text-[#1a1a1a] mb-6 tracking-tight">Your profile</h1>
          <p className="text-gray-500 text-lg">Keep your details fresh so mentors recognize you.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Identity & Security */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Identity Card */}
            <div className="bg-white/40 border border-black/5 rounded-[40px] p-10 text-center flex flex-col items-center">
              <div className="relative group mb-6">
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-sm flex items-center justify-center">
                   {user.avatar ? (
                       <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                   ) : (
                       <span className="font-serif text-4xl text-gray-400">{user.name[0]}</span>
                   )}
                </div>
                <label className="absolute bottom-1 right-1 bg-[#120f0a] p-2 rounded-full cursor-pointer hover:scale-110 transition-all text-white shadow-lg">
                    <FiCamera size={18} />
                    <input type="file" className="hidden" onChange={(e) => handleAvatarUpdate(e.target.files[0])} />
                </label>
              </div>
              <h2 className="font-serif text-2xl text-[#1a1a1a]">{user.name}</h2>
              <p className="text-gray-400 text-sm mb-4">{user.email}</p>
              <span className="text-[10px] font-bold px-3 py-1 bg-red-50 text-red-400 rounded-lg uppercase tracking-widest">
                {user.role}
              </span>
            </div>

            {/* Password Card (Matches image_774311.png) */}
            <div className="bg-white/40 border border-black/5 rounded-[40px] p-10">
              <h3 className="font-serif text-2xl text-[#1a1a1a] mb-8 flex items-center gap-3">
                <FiLock size={20} className="text-gray-400" /> Change password
              </h3>
              <div className="space-y-6">
                <InputGroup label="CURRENT" name="oldPassword" type="password" value={passwordData.oldPassword} onChange={handlePasswordChange} />
                <InputGroup label="NEW" name="newPassword" type="password" value={passwordData.newPassword} onChange={handlePasswordChange} />
                <InputGroup label="CONFIRM" name="confirmPassword" type="password" value={passwordData.confirmPassword} onChange={handlePasswordChange} />
                <button 
                  onClick={handleChangePassword}
                  className="w-full border border-black/10 text-gray-800 py-4 rounded-full font-medium hover:bg-white transition-all text-sm"
                >
                  Update password
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Details Form */}
          <div className="lg:col-span-8 bg-white/40 border border-black/5 rounded-[40px] p-12">
            <h3 className="font-serif text-3xl text-[#1a1a1a] mb-10">Personal details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <InputGroup label="FULL NAME" name="name" value={formData.name} onChange={handleChange} />
              <div className="space-y-2">
                <label className="block text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase">EMAIL</label>
                <div className="w-full bg-white/40 border border-black/5 text-gray-400 rounded-2xl px-5 py-4 cursor-not-allowed">
                    {user.email}
                </div>
              </div>
            </div>

            {user.role === 'mentor' && (
              <div className="space-y-12 border-t border-black/5 pt-12 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-2">
                    <h3 className="font-serif text-3xl text-[#1a1a1a]">Mentor profile</h3>
                    <p className="text-gray-500">This is what learners see when they browse.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputGroup icon={<FiBriefcase size={14}/>} label="EXPERIENCE" name="experience" placeholder="e.g. 8 years at Google" value={formData.experience} onChange={handleChange} />
                  <InputGroup icon={<FiLinkedin size={14}/>} label="LINKEDIN" name="linkedin" placeholder="https://linkedin.com/in/..." value={formData.linkedin} onChange={handleChange} />
                  <InputGroup icon={<FiAward size={14}/>} label="EXPERTISE" name="expertise" placeholder="React, System Design, Career" value={formData.expertise} onChange={handleChange} />
                  <InputGroup icon={<FiDollarSign size={14}/>} label="HOURLY RATE (USD)" name="pricing" type="number" value={formData.pricing} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase">
                    <FiFileText size={14}/> ABOUT
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="A short bio — what you help with, who you've worked with, your style."
                    className="w-full bg-white/40 border border-black/10 rounded-2xl p-6 outline-none focus:border-black/30 transition-all font-sans min-h-40"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end mt-12">
              <button
                onClick={handleUpdateProfile}
                className="bg-[#120f0a] text-white px-10 py-4 rounded-full font-medium flex items-center gap-3 hover:bg-black transition-all shadow-lg active:scale-95"
              >
                <FiSave size={18} /> Save changes
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// Helper Sub-component
const InputGroup = ({ label, name, value, onChange, type = "text", placeholder = "", icon = null }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase">
      {icon} {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-white/40 border border-black/10 rounded-2xl px-5 py-4 outline-none focus:border-black/30 transition-all font-sans"
    />
  </div>
);


export default Profile;