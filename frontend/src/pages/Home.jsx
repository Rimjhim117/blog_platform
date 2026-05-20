import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaArrowRight, FaStar, FaUsers, FaBookOpen, FaPenNib } from 'react-icons/fa';

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = -(yc - y) / 25; // gentler tilt for large hero/CTA
    const rotateY = (x - xc) / 25;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    card.style.transition = 'none';
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
  };

  useEffect(() => {
    fetchFeaturedPosts();
  }, []);

  const fetchFeaturedPosts = async () => {
    try {
      const response = await axios.get('/posts?limit=6');
      setFeaturedPosts(response.data.posts || response.data);
    } catch (error) {
      setError('Failed to fetch posts');
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-900 min-h-[600px] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80" 
          style={{ backgroundImage: "url('/images/hero.png')" }}
        ></div>
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 z-10 w-full flex justify-start">
          <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="max-w-3xl bg-gray-900/40 backdrop-blur-md rounded-[2.5rem] p-8 sm:p-12 border border-white/10 will-change-transform"
          >
            <div className="mb-8">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-6">
                <FaPenNib className="text-pink-400 mr-2" />
                <span className="text-sm font-medium text-gray-200 tracking-wide">
                  A professional space for ideas and stories
                </span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-white drop-shadow-lg">
              Share Your{' '}
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Voice
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-gray-300 leading-relaxed font-light drop-shadow-md">
              A modern community where perspectives turn into meaningful stories and every voice is valued.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/blog"
                className="group bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition duration-300 shadow-lg flex items-center justify-center"
              >
                <FaBookOpen className="mr-2 text-pink-400" />
                Explore Stories
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
              >
                Join the Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 mb-4">
                <span className="h-px w-8 bg-pink-500"></span>
                <span className="text-sm font-bold text-pink-500 tracking-wider uppercase">Editor's Picks</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Stories</span>
              </h2>
            </div>
            <Link
              to="/blog"
              className="hidden md:inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 font-semibold transition-colors duration-300 group"
            >
              <span>View all stories</span>
              <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {error ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-3xl shadow-sm p-8 max-w-md mx-auto border border-gray-100">
                <p className="text-gray-500 mb-6">{error}</p>
                <button
                  onClick={fetchFeaturedPosts}
                  className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition duration-300"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
                {featuredPosts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>

              {featuredPosts.length === 0 && !loading && (
                <div className="text-center py-16">
                  <div className="bg-white rounded-3xl shadow-sm p-12 max-w-lg mx-auto border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">No stories available</h3>
                    <p className="text-gray-500 mb-8">Be the first to publish a story in our community.</p>
                    <Link
                      to="/create-post"
                      className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-pink-600 hover:to-purple-700 transition duration-300 shadow-md inline-block font-semibold"
                    >
                      Write a Story
                    </Link>
                  </div>
                </div>
              )}

              {featuredPosts.length > 0 && (
                <div className="text-center md:hidden mt-8">
                  <Link
                    to="/blog"
                    className="inline-flex items-center justify-center w-full bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition duration-300"
                  >
                    See All Stories
                    <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-24 bg-transparent relative z-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="bg-gray-900 rounded-[3rem] shadow-2xl p-12 md:p-20 relative overflow-hidden will-change-transform"
          >
            {/* Subtle background shapes */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-b from-pink-500/20 to-purple-500/20 blur-[100px]"></div>
              <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-t from-blue-500/20 to-indigo-500/20 blur-[100px]"></div>
            </div>
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight leading-tight">
                Ready to Share Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Story?</span>
              </h2>
              <p className="text-xl mb-12 text-gray-400 leading-relaxed max-w-2xl mx-auto font-light">
                Every perspective adds value. Join our professional storytelling community and let your experiences be heard.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="w-full sm:w-auto bg-white text-gray-900 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition duration-300 shadow-lg text-lg"
                >
                  Get Started Today
                </Link>
                <Link
                  to="/about"
                  className="w-full sm:w-auto bg-gray-800 text-white px-10 py-4 rounded-full font-bold hover:bg-gray-700 transition duration-300 border border-gray-700 hover:border-gray-600 text-lg"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
