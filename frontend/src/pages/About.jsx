import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaUsers, FaPenFancy, FaStar, FaLeaf, FaGlobe, FaHandshake, FaChartLine } from 'react-icons/fa';

const About = () => {
  // Map color keywords to Tailwind gradient classes
  const colorMap: Record<string, string> = {
    pink: 'from-pink-400 to-pink-500',
    purple: 'from-purple-400 to-purple-500',
    blue: 'from-blue-400 to-blue-500',
    green: 'from-green-400 to-green-500',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 text-gray-700">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-200/30 via-purple-200/30 to-blue-200/30"></div>
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="mb-10">
            <div className="inline-flex items-center bg-white/70 backdrop-blur px-5 py-2 rounded-xl shadow-sm border border-gray-100">
              <FaBookOpen className="text-purple-500 mr-2" />
              <span className="font-medium text-sm text-gray-700 tracking-wide">Our Story</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-snug">
              About{' '}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                BlogPlatform
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A refined space where stories bloom, creativity flourishes, and every voice finds its home.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-md p-12 border border-gray-100 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-6">
              <FaLeaf className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              At BlogPlatform, we believe every person has a unique story worth sharing. 
              Our mission is to create a warm, welcoming space where writers can express 
              themselves freely, connect with like-minded souls, and inspire others 
              through the power of authentic storytelling.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center bg-white/70 px-5 py-2 rounded-xl shadow-sm border border-gray-100 mb-6">
              <FaStar className="text-yellow-400 mr-2" />
              <span className="font-medium text-sm text-gray-600 tracking-wide">What makes us special</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Why Writers{' '}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Love Us
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FaPenFancy />, title: "Intuitive Writing", text: "Clean, distraction-free interface that lets you focus on your words.", color: "pink" },
              { icon: <FaUsers />, title: "Warm Community", text: "Connect with supportive writers and readers who celebrate creativity.", color: "purple" },
              { icon: <FaGlobe />, title: "Global Reach", text: "Share your stories with readers worldwide and discover diverse perspectives.", color: "blue" },
              { icon: <FaHandshake />, title: "Built on Trust", text: "A platform crafted with integrity and professionalism at its core.", color: "green" }
            ].map((f, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-8 text-center border border-gray-100">
                <div className={`w-14 h-14 bg-gradient-to-r ${colorMap[f.color]} rounded-xl flex items-center justify-center mx-auto mb-5`}>
                  <div className="text-white text-xl">{f.icon}</div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-md p-12 border border-gray-100">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Journey</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-purple-500 mx-auto rounded"></div>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-600 space-y-5">
              <p className="leading-relaxed">
                BlogPlatform was born from a simple yet powerful idea: writing should be joyful, 
                sharing should be effortless, and every story deserves to be heard.
              </p>
              <p>
                We noticed that many platforms felt cold and impersonal, treating content as mere data 
                points rather than the beautiful expressions of human experience they truly are. We dreamed 
                of something different - a warm, inviting space where creativity could flourish naturally.
              </p>
              <p>
                So we set out to create more than just another blogging platform. We built a digital home 
                for storytellers, where thoughtful design meets powerful functionality, and community 
                connection feels natural.
              </p>
              <p>
                Today, thousands of writers call BlogPlatform home. From personal journals to professional 
                insights, from poetry to tutorials, every story adds to the shared tapestry of human experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Growing{' '}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Together
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FaPenFancy />, number: "1000+", label: "Stories Shared", sub: "Unique windows into human experience", color: "pink" },
              { icon: <FaUsers />, number: "500+", label: "Creative Souls", sub: "Writers from across the globe", color: "purple" },
              { icon: <FaChartLine />, number: "10K+", label: "Readers Reached", sub: "Monthly visitors inspired by stories", color: "blue" }
            ].map((s, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-10 text-center shadow-md hover:shadow-lg transition border border-gray-100">
                <div className={`w-16 h-16 bg-gradient-to-r ${colorMap[s.color]} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                  <div className="text-white text-2xl">{s.icon}</div>
                </div>
                <h3 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                  {s.number}
                </h3>
                <p className="text-gray-700 font-medium">{s.label}</p>
                <p className="text-sm text-gray-500">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Ready to Begin Your{' '}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Journey?
              </span>
            </h2>
            <p className="text-lg mb-8 text-gray-600 max-w-2xl mx-auto">
              Your story is waiting to be told. Join our professional community of writers and readers 
              who believe in authentic storytelling. Every journey begins with a single step — 
              or in our case, a single word.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-8 py-4 rounded-full font-medium hover:from-pink-500 hover:to-purple-600 transition shadow-md hover:shadow-lg text-base"
              >
                Start Writing Today
              </Link>
              <Link
                to="/blog"
                className="bg-white text-gray-700 px-8 py-4 rounded-full font-medium border border-gray-200 hover:border-pink-200 hover:text-pink-500 transition shadow-md hover:shadow-lg text-base"
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
