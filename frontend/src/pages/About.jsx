import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaUsers, FaPenFancy, FaStar, FaLeaf, FaGlobe, FaHandshake, FaChartLine } from 'react-icons/fa';

const About = () => {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = -(yc - y) / 12;
    const rotateY = (x - xc) / 12;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'none';
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
  };

  // Map color keywords to Tailwind gradient classes
  const colorMap = {
    pink: 'from-pink-400 to-pink-500',
    purple: 'from-purple-400 to-purple-500',
    blue: 'from-blue-400 to-blue-500',
    green: 'from-green-400 to-green-500',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 text-gray-700 relative overflow-hidden pt-10">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      {/* Modern Split Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center bg-pink-100/60 backdrop-blur-md px-4 py-2 rounded-full border border-pink-200">
              <span className="text-xs font-bold text-pink-600 tracking-wider uppercase">Our Philosophy</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-none tracking-tight">
              A home for <br />
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                quiet thoughts
              </span> <br />
              and loud ideas.
            </h1>
            <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
              We built BlogPlatform because we missed the early days of the web—when writing was personal, community was tight, and sharing was about connection rather than chasing algorithms. Here, you'll find a clean, distraction-free environment to share your thoughts, build your audience, and read beautiful stories from around the world.
            </p>
            <div className="flex gap-4">
              <Link 
                to="/register" 
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-md"
              >
                Join Our Sandbox
              </Link>
              <Link 
                to="/blog" 
                className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-8 py-4 rounded-2xl font-bold transition-all duration-300"
              >
                Explore Stories
              </Link>
            </div>
          </div>
          
          {/* Main Visual Image */}
          <div className="lg:col-span-5 relative">
            {/* Visual background glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-pink-400 to-purple-500 rounded-[3rem] opacity-30 blur-2xl z-0"></div>
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white z-10 will-change-transform"
            >
              <img 
                src="/images/about_hero_creative_1779257897185.png" 
                alt="Our Creative Space" 
                className="w-full h-[450px] object-cover"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left mb-16 max-w-2xl">
            <div className="inline-flex items-center bg-purple-100/60 backdrop-blur px-4 py-2 rounded-full border border-purple-200 mb-6">
              <span className="font-bold text-xs text-purple-600 tracking-wide uppercase">Core Pillars</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              A platform built for the{' '}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                art of writing
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Creative Autonomy",
                text: "No noisy sidebar ads, pop-ups, or clickbait distractions. Just a clean, open editor designed to help you concentrate on the rhythm of your words."
              },
              {
                num: "02",
                title: "Curation Over Algorithms",
                text: "We believe readers should control what they see. Your feed is organized chronologically and by topic, without artificial algorithms designed to manipulate screen time."
              },
              {
                num: "03",
                title: "Writer-Owned Content",
                text: "Your words are completely yours. Export your database of posts at any time, retain 100% intellectual property rights, and build your audience in complete trust."
              }
            ].map((pillar, idx) => (
              <div 
                key={idx} 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="bg-white/40 backdrop-blur-md rounded-[2rem] p-10 border border-white hover:border-pink-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(244,63,94,0.05)] transition-shadow duration-500 group flex flex-col justify-between will-change-transform"
              >
                <div>
                  <div className="text-4xl font-black bg-gradient-to-br from-pink-500 to-purple-600 bg-clip-text text-transparent mb-8 tracking-tighter">
                    {pillar.num}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-pink-600 transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light text-base">
                    {pillar.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gray-900 rounded-[3rem] shadow-2xl p-12 md:p-20 relative overflow-hidden">
            {/* CTA Background effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500 rounded-full mix-blend-overlay filter blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-50"></div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 relative z-10">
              Ready to Begin Your{' '}
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Journey?
              </span>
            </h2>
            <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto font-light relative z-10">
              Your story is waiting to be told. Join our professional community of writers and readers 
              who believe in authentic storytelling.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <Link
                to="/register"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg"
              >
                Start Writing Today
              </Link>
              <Link
                to="/blog"
                className="bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-bold border border-white/20 hover:bg-white/20 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg"
              >
                Read Stories First
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
