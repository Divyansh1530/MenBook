import React from 'react'
import { ArrowRight, Calendar, ShieldCheck, Video } from 'lucide-react'

function Hero() {
  return (
    <section className='min-h-screen bg-linear-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden'>

      <div className='max-w-7xl mx-auto px-6 py-20 lg:py-28'>

        <div className='grid lg:grid-cols-2 gap-14 items-center'>

          {/* LEFT CONTENT */}
          <div>

            <div className='inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 mb-6 backdrop-blur-sm'>
              <span className='w-2 h-2 bg-green-400 rounded-full'></span>
              <span className='text-sm text-gray-200'>
                Book expert mentors instantly
              </span>
            </div>

            <h1 className='text-5xl md:text-6xl font-black leading-tight'>
              Book Mentors.
              <br />
              Grow Faster.
            </h1>

            <p className='text-gray-300 text-lg mt-6 leading-relaxed max-w-xl'>
              Connect with experienced mentors for career guidance,
              coding help, interview preparation, and 1-on-1 sessions.
              Real-time slot booking with secure online payments.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 mt-10'>

              <button className='bg-white text-black px-7 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:scale-105 transition'>
                Explore Mentors
                <ArrowRight size={20} />
              </button>

              <button className='border border-white/20 bg-white/5 backdrop-blur-sm px-7 py-4 rounded-2xl font-semibold hover:bg-white/10 transition'>
                Become a Mentor
              </button>

            </div>

            {/* STATS */}
            <div className='grid grid-cols-3 gap-6 mt-14'>

              <div>
                <h2 className='text-3xl font-bold'>500+</h2>
                <p className='text-gray-400 mt-1'>Mentors</p>
              </div>

              <div>
                <h2 className='text-3xl font-bold'>10k+</h2>
                <p className='text-gray-400 mt-1'>Sessions</p>
              </div>

              <div>
                <h2 className='text-3xl font-bold'>4.9★</h2>
                <p className='text-gray-400 mt-1'>Ratings</p>
              </div>

            </div>

          </div>

          {/* RIGHT CONTENT */}
          <div className='relative'>

            <div className='absolute -top-10 -left-10 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full'></div>
            <div className='absolute bottom-0 right-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full'></div>

            <div className='relative bg-white/10 border border-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl'>

              <div className='flex items-center justify-between mb-8'>
                <div>
                  <h3 className='text-2xl font-bold'>Upcoming Session</h3>
                  <p className='text-gray-300 mt-1'>Mentor Booking Preview</p>
                </div>

                <div className='bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium'>
                  Live
                </div>
              </div>

              <div className='space-y-5'>

                <div className='bg-black/30 rounded-2xl p-5 flex items-center gap-4'>
                  <div className='w-14 h-14 rounded-full bg-linear-to-br from-purple-400 to-pink-500'></div>

                  <div>
                    <h4 className='font-semibold text-lg'>Aman Sharma</h4>
                    <p className='text-gray-400'>Frontend Engineer at Google</p>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>

                  <div className='bg-black/30 rounded-2xl p-5'>
                    <Calendar className='mb-3' />
                    <p className='text-gray-400 text-sm'>Session Date</p>
                    <h4 className='font-semibold mt-1'>12 May, 2026</h4>
                  </div>

                  <div className='bg-black/30 rounded-2xl p-5'>
                    <Video className='mb-3' />
                    <p className='text-gray-400 text-sm'>Mode</p>
                    <h4 className='font-semibold mt-1'>Video Call</h4>
                  </div>

                </div>

                <div className='bg-black/30 rounded-2xl p-5 flex items-center justify-between'>

                  <div className='flex items-center gap-3'>
                    <ShieldCheck className='text-green-400' />

                    <div>
                      <h4 className='font-semibold'>Secure Payment</h4>
                      <p className='text-gray-400 text-sm'>Protected by Razorpay</p>
                    </div>
                  </div>

                  <button className='bg-white text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition'>
                    Book
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Hero
