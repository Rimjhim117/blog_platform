import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import CommentSection from '../components/CommentSection';
import { FaUser, FaCalendar, FaClock, FaEdit, FaTrash, FaArrowLeft, FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from 'react-icons/fa';

const BlogDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [likes, setLikes] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  useEffect(() => {
    if (user && post) {
      setIsBookmarked(user.bookmarks?.includes(post._id) || false);
    } else {
      setIsBookmarked(false);
    }
  }, [user, post]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/posts/${id}`);
      setPost(response.data);
      setLikes(response.data.likes || []);
    } catch (error) {
      setError('Failed to fetch post');
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      alert("Please log in to like posts.");
      return;
    }

    try {
      const response = await axios.post(`/posts/${post._id}/like`);
      setLikes(response.data.likes);
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      alert("Please log in to bookmark posts.");
      return;
    }

    try {
      const response = await axios.post(`/posts/${post._id}/bookmark`);
      setIsBookmarked(response.data.bookmarks.includes(post._id));
    } catch (err) {
      console.error("Error bookmarking post:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this story? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleteLoading(true);
      await axios.delete(`/posts/${id}`);
      navigate('/blog');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete story. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content ? content.split(' ').length : 0;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center pt-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center pt-20 px-4">
        <div className="text-center bg-white/70 backdrop-blur-xl p-12 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
          <div className="text-red-500 mb-6 text-xl font-medium">{error || 'Story not found'}</div>
          <Link
            to="/blog"
            className="inline-flex items-center bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition duration-300 font-semibold shadow-md"
          >
            <FaArrowLeft className="mr-2" /> Back to Stories
          </Link>
        </div>
      </div>
    );
  }

  const isAuthor = user && post.author && (user._id === post.author._id || user.id === post.author._id);
  const isLiked = likes.includes(user?.id || user?._id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pt-24 pb-20 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors duration-300 font-medium group bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-100"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Stories
        </Link>

        {/* Post Container */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden mb-12 border border-white">
          {/* Featured Image Banner */}
          <div 
            className="h-72 sm:h-96 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 relative overflow-hidden group bg-cover bg-center"
            style={post.coverImage ? { backgroundImage: `url(${post.coverImage})` } : {}}
          >
            <div className="absolute inset-0 bg-black/30 transition-colors duration-500"></div>
            {/* Dynamic abstract shapes inside banner */}
            {!post.coverImage && (
              <>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white opacity-10 rounded-full mix-blend-overlay filter blur-2xl animate-blob"></div>
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-white opacity-10 rounded-full mix-blend-overlay filter blur-2xl animate-blob animation-delay-2000"></div>
              </>
            )}
            
            <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-md">
                {post.title}
              </h1>
            </div>
          </div>

          <div className="p-8 sm:p-12">
            {/* Post Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-gray-100 gap-4">
              <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-500">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3 shadow-sm">
                    {post.author?.username?.charAt(0).toUpperCase() || 'A'}
                  </div>
                  <span className="text-gray-900">{post.author?.username || 'Anonymous'}</span>
                </div>
                <div className="flex items-center">
                  <FaCalendar className="mr-2 text-pink-400" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2 text-purple-400" />
                  <span>{getReadingTime(post.content)} min read</span>
                </div>
              </div>

              {/* Author Actions */}
              {isAuthor && (
                <div className="flex items-center space-x-3">
                  <Link
                    to={`/edit-post/${post._id}`}
                    className="flex items-center bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 text-sm font-semibold shadow-sm"
                  >
                    <FaEdit className="mr-2 text-gray-500" /> Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    disabled={deleteLoading}
                    className="flex items-center bg-red-50 text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 hover:text-red-700 transition-all duration-300 text-sm font-semibold disabled:opacity-50 shadow-sm"
                  >
                    <FaTrash className="mr-2" />
                    {deleteLoading ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              )}
            </div>

            {/* Post Content */}
            <div className="prose prose-lg sm:prose-xl max-w-none prose-p:text-gray-600 prose-headings:text-gray-900 prose-a:text-pink-500 hover:prose-a:text-pink-600">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap font-light tracking-wide">
                {post.content}
              </div>
            </div>
            
            <div className="mt-12 flex items-center justify-between pt-8 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleLike} 
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 font-semibold ${
                    isLiked 
                      ? 'bg-pink-100 text-pink-600 hover:bg-pink-200' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {isLiked ? (
                    <FaHeart className="text-pink-500 transition-transform duration-300" />
                  ) : (
                    <FaRegHeart className="transition-transform duration-300" />
                  )}
                  <span>{likes.length} Likes</span>
                </button>
                
                <button 
                  onClick={handleBookmark} 
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 font-semibold ${
                    isBookmarked 
                      ? 'bg-purple-100 text-purple-600 hover:bg-purple-200' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {isBookmarked ? (
                    <FaBookmark className="text-purple-500" />
                  ) : (
                    <FaRegBookmark />
                  )}
                  <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Author Info Card */}
        {post.author && (
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 mb-12 border border-white flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 group hover:border-pink-100 transition-colors duration-500">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-pink-200 shrink-0 group-hover:scale-105 transition-transform duration-500">
              {post.author.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-pink-500 tracking-wider uppercase mb-1">Written By</h3>
              <h4 className="text-2xl font-extrabold text-gray-900 mb-2">{post.author.username}</h4>
              <p className="text-gray-600 font-light leading-relaxed mb-4">
                A creative mind sharing stories and ideas on our platform. Member since {formatDate(post.author.createdAt)}.
              </p>
            </div>
          </div>
        )}

        {/* Comments Section Container */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-12 border border-white">
          <CommentSection postId={post._id} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;