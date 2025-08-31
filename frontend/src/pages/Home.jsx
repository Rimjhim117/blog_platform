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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-300/10 via-purple-300/10 to-blue-300/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center bg-white/70 backdrop-blur-sm px-6 py-2 rounded-full shadow-md mb-6">
              <FaPenNib className="text-indigo-400 mr-2" />
              <span className="text-sm font-medium text-gray-600">
                A professional space for ideas and stories
              </span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Share Your{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Voice
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A modern community where perspectives turn into meaningful stories and every voice is valued.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/blog"
              className="group bg-white text-gray-700 px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition duration-300 shadow-md flex items-center border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1"
            >
              <FaBookOpen className="mr-2 text-indigo-400" />
              Explore Stories
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/register"
              className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-indigo-500 hover:to-purple-600 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Join the Community
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/70 backdrop-blur-sm px-6 py-2 rounded-full shadow-md mb-6">
              <FaStar className="text-yellow-400 mr-2" />
              <span className="text-sm font-medium text-gray-600">Editor’s Picks</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Featured{' '}
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Stories
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore selected articles from our diverse community of writers
            </p>
          </div>

          {error ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto border border-gray-100">
                <p className="text-gray-600 mb-6">{error}</p>
                <button
                  onClick={fetchFeaturedPosts}
                  className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-indigo-500 hover:to-purple-600 transition duration-300 shadow-md"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {featuredPosts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>

              {featuredPosts.length === 0 && !loading && (
                <div className="text-center py-16">
                  <div className="bg-white rounded-2xl shadow-lg p-12 max-w-lg mx-auto border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">No stories available</h3>
                    <p className="text-gray-600 mb-8">Be the first to publish a story in our community.</p>
                    <Link
                      to="/create-post"
                      className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-8 py-4 rounded-lg hover:from-indigo-500 hover:to-purple-600 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 inline-block"
                    >
                      Write a Story
                    </Link>
                  </div>
                </div>
              )}

              {featuredPosts.length > 0 && (
                <div className="text-center">
                  <Link
                    to="/blog"
                    className="inline-flex items-center bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-indigo-500 hover:to-purple-600 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
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

      {/* Community Stats */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/70 backdrop-blur-sm px-6 py-2 rounded-full shadow-md mb-6">
              <FaUsers className="text-indigo-400 mr-2" />
              <span className="text-sm font-medium text-gray-600">Our growing network</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Community{' '}
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Impact
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <FaBookOpen className="text-white text-2xl" />
              </div>
              <h3 className="text-4xl font-bold text-indigo-600 mb-3">1000+</h3>
              <p className="text-gray-600 text-lg font-medium">Stories Published</p>
              <p className="text-gray-500 text-sm mt-2">Insights from across the globe</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h3 className="text-4xl font-bold text-purple-600 mb-3">500+</h3>
              <p className="text-gray-600 text-lg font-medium">Active Contributors</p>
              <p className="text-gray-500 text-sm mt-2">Sharing experiences and expertise</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <FaPenNib className="text-white text-2xl" />
              </div>
              <h3 className="text-4xl font-bold text-pink-600 mb-3">10K+</h3>
              <p className="text-gray-600 text-lg font-medium">Readers Reached</p>
              <p className="text-gray-500 text-sm mt-2">Monthly audience engagement</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Ready to Share Your{' '}
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Story?
              </span>
            </h2>
            <p className="text-xl mb-8 text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Every perspective adds value. Join our professional storytelling community and let your experiences be heard.
            </p>
            <Link
              to="/register"
              className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-10 py-5 rounded-lg font-semibold hover:from-indigo-500 hover:to-purple-600 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 inline-block text-lg"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
