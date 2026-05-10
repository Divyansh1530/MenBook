import React from 'react'
import {
  Brain,
  Code2,
  Briefcase,
  Palette,
  LineChart,
  HeartHandshake,
  Camera,
  Mic
} from 'lucide-react'

function Specialization() {

  const specializations = [
    {
      title: 'Therapist',
      icon: Brain,
      description: 'Mental health guidance and personal growth sessions.'
    },
    {
      title: 'Software Engineer',
      icon: Code2,
      description: 'Coding interviews, MERN stack, DSA and backend systems.'
    },
    {
      title: 'Career Coach',
      icon: Briefcase,
      description: 'Career planning, resume reviews and interview preparation.'
    },
    {
      title: 'UI/UX Designer',
      icon: Palette,
      description: 'Design systems, Figma mentorship and product design.'
    },
    {
      title: 'Business Mentor',
      icon: LineChart,
      description: 'Startup strategy, scaling and business consulting.'
    },
    {
      title: 'Relationship Coach',
      icon: HeartHandshake,
      description: 'Communication, confidence and relationship advice.'
    },
    {
      title: 'Content Creator',
      icon: Camera,
      description: 'YouTube growth, branding and content strategy.'
    },
    {
      title: 'Public Speaker',
      icon: Mic,
      description: 'Speaking confidence, communication and stage presence.'
    }
  ]

  return (
    <section className='bg-white py-24 px-6'>

      <div className='max-w-7xl mx-auto'>

        {/* HEADING */}
        <div className='text-center mb-16'>

          <h2 className='text-4xl md:text-5xl font-black text-gray-900'>
            Find By Specialization
          </h2>

          <p className='text-gray-500 mt-5 max-w-2xl mx-auto text-lg'>
            Explore expert mentors across multiple domains and book
            personalized 1-on-1 sessions based on your goals.
          </p>

        </div>

        {/* SPECIALIZATION GRID */}
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8'>

          {
            specializations.map((item, index) => {

              const Icon = item.icon

              return (
                <div
                  key={index}
                  className='group bg-gray-50 hover:bg-black rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100'
                >

                  <div className='w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition'>
                    <Icon size={30} />
                  </div>

                  <h3 className='text-2xl font-bold text-gray-900 group-hover:text-white transition'>
                    {item.title}
                  </h3>

                  <p className='text-gray-500 group-hover:text-gray-300 mt-4 leading-relaxed transition'>
                    {item.description}
                  </p>

                  <button className='mt-6 text-sm font-semibold text-black group-hover:text-white transition'>
                    Explore Mentors →
                  </button>

                </div>
              )
            })
          }

        </div>

      </div>

    </section>
  )
}

export default Specialization
