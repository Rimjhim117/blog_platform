import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { FaUser, FaTrash, FaHeart, FaComment } from 'react-icons/fa';

const CommentSection = ({ postId }) => {
  const { user, isAuthenticated } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/posts/${postId}/comments`);
      setComments(response.data.comments || response.data);
    } catch (error) {
      setError('Failed to load comments');
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      const response = await axios.post(`/posts/${postId}/comments`, {
        content: newComment
      });
      
      setComments([response.data, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    try {
      await axios.delete(`/comments/${commentId}`);
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 border border-pink-100">
      <div className="flex items-center mb-8">
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-3 rounded-2xl mr-4">
          <FaComment className="text-pink-500 text-xl" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">
            Conversations
          </h3>
          <p className="text-gray-500">
            {comments.length} {comments.length === 1 ? 'thought' : 'thoughts'} shared
          </p>
        </div>
      </div>

      {/* Comment Form */}
      {isAuthenticated ? (
        <div className="mb-8 bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-6 border border-pink-100">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              {user?.username?.charAt(0)?.toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-3">
                Share your thoughts, <span className="font-medium text-pink-600">{user?.username}</span>
              </p>
              <form onSubmit={handleSubmitComment}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="What are your thoughts on this story? 💭"
                  rows={4}
                  className="w-full px-4 py-3 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 resize-none"
                  required
                />
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    disabled={submitting || !newComment.trim()}
                    className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-3 rounded-full hover:from-pink-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                  >
                    {submitting ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sharing...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <FaHeart className="mr-2" />
                        Share Thoughts
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8 bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 text-center border border-pink-100">
          <div className="text-4xl mb-4">💬</div>
          <h4 className="text-xl font-semibold text-gray-800 mb-2">
            Join the Conversation
          </h4>
          <p className="text-gray-600 mb-6">
            Sign in to share your thoughts and connect with other readers
          </p>
          <Link
            to="/login"
            className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-8 py-3 rounded-full hover:from-pink-500 hover:to-purple-600 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-block font-medium"
          >
            Sign In to Comment
          </Link>
        </div>
      )}

      {/* Comments List */}
      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="sm" />
        </div>
      ) : error ? (
        <div className="text-center py-8 bg-red-50 rounded-3xl border border-red-100">
          <div className="text-3xl mb-3">😔</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchComments}
            className="text-pink-600 hover:text-pink-700 font-medium underline"
          >
            Try loading again
          </button>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-3xl">
          <div className="text-5xl mb-4">🌸</div>
          <h4 className="text-xl font-semibold text-gray-700 mb-2">
            No conversations yet
          </h4>
          <p className="text-gray-500">
            Be the first to share your thoughts on this beautiful story!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-gradient-to-r from-pink-50/50 to-purple-50/50 rounded-3xl p-6 border border-pink-100 hover:border-pink-200 transition duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {comment.author?.username?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h5 className="font-semibold text-gray-800">
                        {comment.author?.username || 'Anonymous'}
                      </h5>
                      <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    
                    {user && comment.author && user._id === comment.author._id && (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-gray-400 hover:text-red-500 transition duration-300 p-2 rounded-full hover:bg-red-50"
                        title="Delete comment"
                      >
                        <FaTrash size={14} />
                      </button>
                    )}
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;