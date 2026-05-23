import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaSearch, FaFilter, FaPlus, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  
  const { isAuthenticated } = useAuth();
  const postsPerPage = 9;

  useEffect(() => {
    fetchPosts();
  }, [currentPage, sortBy, sortOrder, searchTerm, selectedTag]);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get('/posts/tags');
      setTags(response.data || []);
    } catch (err) {
      console.error('Error fetching tags:', err);
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: postsPerPage,
        sort: sortBy,
        order: sortOrder,
        ...(searchTerm && { search: searchTerm }),
        ...(selectedTag && selectedTag !== 'All' && { tag: selectedTag.toLowerCase() })
      });

      const response = await axios.get(`/posts?${params}`);
      const data = response.data;
      
      setPosts(data.posts || data);
      setTotalPages(data.totalPages || Math.ceil((data.total || data.length) / postsPerPage));
      setTotalPosts(data.total || data.length);
    } catch (error) {
      setError('Failed to fetch posts');
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPosts();
  };

  const handleSortChange = (newSortBy) => {
    if (newSortBy === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pt-24 pb-12">
      {/* Header Section */}
      <div className="relative overflow-hidden mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between bg-white/70 backdrop-blur-xl p-10 rounded-[2rem] shadow-sm border border-white/50">
            <div className="mb-6 lg:mb-0 max-w-2xl">
              <div className="inline-flex items-center space-x-2 mb-4">
                <span className="h-px w-8 bg-pink-500"></span>
                <span className="text-sm font-bold text-pink-500 tracking-wider uppercase">Explore</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Stories</span>
              </h1>
              <p className="text-lg text-gray-600 font-light">
                Discover {totalPosts} amazing stories, ideas, and expertise from our community of writers.
              </p>
            </div>
            
            {isAuthenticated && (
              <Link
                to="/create-post"
                className="inline-flex items-center justify-center bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 font-semibold group"
              >
                <FaPlus className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Write a Post
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Search and Filter Bar */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 p-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search and Tags */}
            <div className="flex-1">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Search for inspiration..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300 outline-none text-gray-700"
                  />
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors duration-300" />
                </div>
              </form>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-2">
                {['All', ...(tags.length > 0 ? tags : ['Technology', 'Lifestyle', 'Travel', 'Design', 'Creative'])].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSelectedTag(tag);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border uppercase tracking-wider ${
                      selectedTag === tag
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-transparent shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-4 bg-gray-50/50 px-6 py-2 rounded-xl border border-gray-200 self-start lg:self-auto">
              <div className="flex items-center">
                <FaFilter className="text-gray-400 mr-2" />
                <span className="text-sm font-semibold text-gray-600 mr-4">Sort by:</span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSortChange('createdAt')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    sortBy === 'createdAt'
                      ? 'bg-white text-pink-600 shadow-sm border border-gray-100'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Date {sortBy === 'createdAt' && (sortOrder === 'desc' ? '↓' : '↑')}
                </button>
                
                <button
                  onClick={() => handleSortChange('title')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    sortBy === 'title'
                      ? 'bg-white text-pink-600 shadow-sm border border-gray-100'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Title {sortBy === 'title' && (sortOrder === 'desc' ? '↓' : '↑')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/40 backdrop-blur-md rounded-3xl border border-gray-100/50 shadow-sm max-w-2xl mx-auto px-6">
            <LoadingSpinner size="lg" />
            <p className="text-gray-600 font-medium text-lg mt-4 animate-pulse text-center">
              Waking up the server...
            </p>
            <p className="text-gray-400 text-sm mt-2 text-center max-w-md">
              We're hosting on a free tier, so the first load can take up to 50 seconds. Thanks for your patience!
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white/60 rounded-3xl backdrop-blur-sm border border-gray-100">
            <div className="text-red-500 mb-6 font-medium text-lg">{error}</div>
            <button
              onClick={fetchPosts}
              className="bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition duration-300 font-semibold shadow-md"
            >
              Try Again
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-32 bg-white/60 rounded-3xl backdrop-blur-sm border border-gray-100">
            <div className="text-gray-500 text-xl mb-8 font-light">
              {searchTerm ? 'No stories found matching your search.' : 'Our canvas is empty right now.'}
            </div>
            {!searchTerm && isAuthenticated && (
              <Link
                to="/create-post"
                className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-pink-600 hover:to-purple-700 transition duration-300 shadow-lg font-semibold"
              >
                Write the First Story <FaArrowRight className="ml-2" />
              </Link>
            )}
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCurrentPage(1);
                }}
                className="inline-flex items-center bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition duration-300 shadow-lg font-semibold"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 pb-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-5 py-3 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
                >
                  Previous
                </button>

                <div className="hidden sm:flex space-x-2">
                  {generatePageNumbers().map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-12 h-12 flex items-center justify-center text-sm font-bold rounded-xl transition-all duration-300 shadow-sm ${
                        page === currentPage
                          ? 'bg-gray-900 text-white border-transparent'
                          : 'text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-5 py-3 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;