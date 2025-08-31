import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import CommentSection from '../components/CommentSection';
import { FaUser, FaCalendar, FaClock, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';

const BlogDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      setError('Failed to fetch post');
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleteLoading(true);
      await axios.delete(`/posts/${id}`);
      navigate('/blog');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
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
    const words = content.split(' ').length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime;
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <Link
            to="/blog"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 mb-4">Post not found</div>
          <Link
            to="/blog"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const isAuthor = user && post.author && user._id === post.author._id;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition duration-300"
        >
          <FaArrowLeft className="mr-2" />
          Back to Blog
        </Link>

        {/* Post Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          {/* Featured Image Placeholder */}
          <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <h1 className="text-white text-3xl md:text-4xl font-bold text-center px-6">
              {post.title}
            </h1>
          </div>

          <div className="p-8">
            {/* Post Meta */}
            <div className="flex flex-wrap items-center justify-between mb-6 text-sm text-gray-600">
              <div className="flex items-center space-x-6 mb-2 sm:mb-0">
                <div className="flex items-center">
                  <FaUser className="mr-2" />
                  <span>{post.author?.username || 'Anonymous'}</span>
                </div>
                <div className="flex items-center">
                  <FaCalendar className="mr-2" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2" />
                  <span>{getReadingTime(post.content)} min read</span>
                </div>
              </div>

              {/* Author Actions */}
              {isAuthor && (
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/edit-post/${post._id}`}
                    className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition duration-300 text-sm"
                  >
                    <FaEdit className="mr-1" />
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    disabled={deleteLoading}
                    className="flex items-center bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-300 text-sm disabled:opacity-50"
                  >
                    <FaTrash className="mr-1" />
                    {deleteLoading ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Post Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>
            </div>
          </div>
        </div>

        {/* Author Info */}
        {post.author && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold mb-3">About the Author</h3>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                {post.author.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-gray-800">{post.author.username}</p>
                <p className="text-gray-600 text-sm">
                  Member since {formatDate(post.author.createdAt)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Comments Section */}
        <CommentSection postId={post._id} />
      </div>
    </div>
  );
};

export default BlogDetail;