import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPen, FaTag, FaSave, FaTimes, FaHeart } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';

const EditPost = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/posts/${id}`);
      const post = response.data;
      
      setFormData({
        title: post.title || '',
        content: post.content || '',
        tags: post.tags ? post.tags.join(', ') : ''
      });
    } catch (error) {
      setError('Failed to load post. Please try again.');
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Please fill in both title and content');
      setSubmitting(false);
      return;
    }

    try {
      const postData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      await axios.put(`/posts/${id}`, postData);
      navigate(`/blog/${id}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update post. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getWordCount = () => {
    return formData.content.trim().split(/\s+/).filter(word => word).length;
  };

  const getReadingTime = () => {
    const wordsPerMinute = 200;
    const words = getWordCount();
    return Math.ceil(words / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-4">
            <FaPen className="text-purple-400 mr-2" />
            <span className="font-medium text-gray-600">Edit Your Story</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Polish Your{' '}
            <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
              Masterpiece
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Every story can be made even more beautiful ✨
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-purple-100">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center">
                <FaTimes className="mr-2 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Title */}
            <div className="mb-8">
              <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-3">
                Story Title ✨
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="What would you like to call your story?"
                className="w-full px-6 py-4 text-xl border border-purple-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition duration-300"
                required
              />
            </div>

            {/* Tags */}
            <div className="mb-8">
              <label htmlFor="tags" className="block text-lg font-semibold text-gray-700 mb-3">
                Tags (Optional) 🏷️
              </label>
              <div className="relative">
                <FaTag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400" />
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="technology, lifestyle, travel (separate with commas)"
                  className="w-full pl-12 pr-6 py-4 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition duration-300"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Add tags to help readers discover your story
              </p>
            </div>

            {/* Content */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="content" className="text-lg font-semibold text-gray-700">
                  Your Story 📖
                </label>
                <div className="flex items-center space-x-4 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
                  <span>{getWordCount()} words</span>
                  <span>•</span>
                  <span>{getReadingTime()} min read</span>
                </div>
              </div>
              <textarea
                id="content"
                name="content"
                rows={20}
                value={formData.content}
                onChange={handleChange}
                placeholder="Tell your story... ✍️"
                className="w-full px-6 py-4 border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition duration-300 resize-none text-lg leading-relaxed"
                required
              />
            </div>

            {/* Preview Tags */}
            {formData.tags && (
              <div className="mb-8">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Preview Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.split(',').map((tag, index) => (
                    tag.trim() && (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full text-sm border border-purple-200"
                      >
                        #{tag.trim()}
                      </span>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-purple-100">
              <button
                type="submit"
                disabled={submitting || !formData.title.trim() || !formData.content.trim()}
                className="flex-1 bg-gradient-to-r from-purple-400 to-pink-500 text-white py-4 px-8 rounded-full hover:from-purple-500 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold text-lg"
              >
                {submitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Saving Changes...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <FaSave className="mr-3" />
                    Save Changes
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate(`/blog/${id}`)}
                className="sm:w-auto bg-white text-gray-700 py-4 px-8 rounded-full border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-300 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>

        {/* Editing Tips */}
        <div className="mt-8 bg-white rounded-3xl shadow-lg p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-2xl mr-4">
              ✏️
            </div>
            Editing Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-2xl mr-3">🔍</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Read it aloud</h4>
                  <p className="text-gray-600 text-sm">This helps catch awkward phrasing and improve flow.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">✂️</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Cut unnecessary words</h4>
                  <p className="text-gray-600 text-sm">Every word should add value to your story.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-2xl mr-3">🎨</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Check your structure</h4>
                  <p className="text-gray-600 text-sm">Make sure your ideas flow logically from one to the next.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">💎</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Polish your ending</h4>
                  <p className="text-gray-600 text-sm">A strong conclusion leaves readers thinking.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;