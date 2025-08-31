import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import BlogCard from '../components/BlogCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaUser, FaEdit, FaTrash, FaPen, FaHeart, FaCalendar, FaEye } from 'react-icons/fa';

const Profile = () => {
  const { user } = useAuth();
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalLikes: 0
  });

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/posts/my-posts');
      setMyPosts(response.data.posts || response.data);
      
      // Calculate stats
      const posts = response.data.posts || response.data;
      setStats({
        totalPosts: posts.length,
        totalViews: posts.reduce((sum, post) => sum + (post.views || 0), 0),
        totalLikes: posts.reduce((sum, post) => sum + (post.likes || 0), 0)
      });
    } catch (error) {
      setError('Failed to fetch your posts');
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    try {
      await axios.delete(`/posts/${postId}`);
      setMyPosts(myPosts.filter(post => post._id !== postId));
      setStats(prevStats => ({
        ...prevStats,
        totalPosts: prevStats.totalPosts - 1
      }));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
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

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-pink-200">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              {/* Profile Picture */}
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                  {user?.username?.charAt(0)?.toUpperCase()}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {user?.username}
                </h1>
                <p className="text-gray-600 mb-4 text-lg">
                  ✨ Creative Storyteller
                </p>
                <div className="flex items-center justify-center md:justify-start text-sm text-gray-500 mb-6">
                  <FaCalendar className="mr-2" />
                  <span>Member since {formatDate(user?.createdAt)}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="text-center bg-gradient-to-r from-pink-50 to-pink-100 rounded-2xl p-4 border border-pink-200">
                    <div className="text-2xl font-bold text-pink-600">{stats.totalPosts}</div>
                    <div className="text-sm text-gray-600">Stories</div>
                  </div>
                  <div className="text-center bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">{stats.totalViews}</div>
                    <div className="text-sm text-gray-600">Views</div>
                  </div>
                  <div className="text-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">{stats.totalLikes}</div>
                    <div className="text-sm text-gray-600">Hearts</div>
                  </div>
                </div>

                <Link
                  to="/create-post"
                  className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-8 py-3 rounded-full hover:from-pink-500 hover:to-purple-600 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center font-medium"
                >
                  <FaPen className="mr-2" />
                  Write New Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* My Posts Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              My{' '}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Stories
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Your creative journey in words
            </p>
          </div>
        </div>

        {error ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md mx-auto border border-red-100">
              <div className="text-red-400 mb-4 text-5xl">😔</div>
              <p className="text-red-600 mb-6">{error}</p>
              <button
                onClick={fetchMyPosts}
                className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-6 py-3 rounded-full hover:from-red-500 hover:to-pink-600 transition duration-300 shadow-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : myPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl shadow-xl p-12 max-w-lg mx-auto border border-pink-100">
              <div className="text-6xl mb-6">📝</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No stories yet</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Your storytelling journey is about to begin! Every great writer started 
                with their first story.
              </p>
              <Link
                to="/create-post"
                className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-8 py-4 rounded-full hover:from-pink-500 hover:to-purple-600 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block font-medium"
              >
                Write Your First Story
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {myPosts.map((post) => (
              <div key={post._id} className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition duration-300 border border-pink-100">
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    {/* Post Info */}
                    <div className="flex-1 mb-6 lg:mb-0 lg:mr-8">
                      <Link
                        to={`/blog/${post._id}`}
                        className="block group"
                      >
                        <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-pink-500 transition duration-300">
                          {post.title}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {post.content.substring(0, 200)}...
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 text-xs px-3 py-1 rounded-full border border-pink-200"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Post Meta */}
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <div className="flex items-center">
                          <FaCalendar className="mr-1" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                        {post.views && (
                          <div className="flex items-center">
                            <FaEye className="mr-1" />
                            <span>{post.views} views</span>
                          </div>
                        )}
                        {post.likes && (
                          <div className="flex items-center">
                            <FaHeart className="mr-1 text-pink-400" />
                            <span>{post.likes} likes</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3">
                      <Link
                        to={`/blog/${post._id}`}
                        className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-4 py-2 rounded-full hover:from-blue-200 hover:to-blue-300 transition duration-300 text-sm font-medium border border-blue-200"
                      >
                        View
                      </Link>
                      <Link
                        to={`/edit-post/${post._id}`}
                        className="bg-gradient-to-r from-green-100 to-green-200 text-green-700 px-4 py-2 rounded-full hover:from-green-200 hover:to-green-300 transition duration-300 text-sm font-medium border border-green-200 flex items-center"
                      >
                        <FaEdit className="mr-1" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeletePost(post._id)}
                        className="bg-gradient-to-r from-red-100 to-red-200 text-red-700 px-4 py-2 rounded-full hover:from-red-200 hover:to-red-300 transition duration-300 text-sm font-medium border border-red-200 flex items-center"
                      >
                        <FaTrash className="mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;