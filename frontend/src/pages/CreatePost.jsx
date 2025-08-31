import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPen, FaTag, FaSave, FaTimes, FaHeart } from 'react-icons/fa';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Please fill in both title and content');
      setLoading(false);
      return;
    }

    try {
      const postData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      const response = await axios.post('/posts', postData);
      navigate(`/blog/${response.data._id || response.data.id}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create post. Please try again.');
    } finally {
      setLoading(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-4">
            <FaPen className="text-pink-400 mr-2" />
            <span className="font-medium text-gray-600">Share Your Story</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Create Your{' '}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Masterpiece
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Every great story starts with a single word. What's yours?
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-pink-100">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center">
                <FaTimes className="mr-2 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Title */}
            <div className="mb-8">
              <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-3">
                Your Story Title ✨
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="What would you like to call your story?"
                className="w-full px-6 py-4 text-xl border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition duration-300"
                required
              />
            </div>

            {/* Tags */}
            <div className="mb-8">
              <label htmlFor="tags" className="block text-lg font-semibold text-gray-700 mb-3">
                Tags (Optional) 🏷️
              </label>
              <div className="relative">
                <FaTag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="technology, lifestyle, travel (separate with commas)"
                  className="w-full pl-12 pr-6 py-4 border border-purple-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition duration-300"
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
                placeholder="Once upon a time... ✍️

Write your heart out! Share your experiences, thoughts, tutorials, or any story you'd love to tell the world."
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
                        className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 px-3 py-1 rounded-full text-sm border border-pink-200"
                      >
                        #{tag.trim()}
                      </span>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-pink-100">
              <button
                type="submit"
                disabled={loading || !formData.title.trim() || !formData.content.trim()}
                className="flex-1 bg-gradient-to-r from-pink-400 to-purple-500 text-white py-4 px-8 rounded-full hover:from-pink-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold text-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Publishing Your Story...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <FaHeart className="mr-3" />
                    Publish Story
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate('/blog')}
                className="sm:w-auto bg-white text-gray-700 py-4 px-8 rounded-full border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-300 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>

        {/* Writing Tips */}
        <div className="mt-8 bg-white rounded-3xl shadow-lg p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-2xl mr-4">
              💡
            </div>
            Writing Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-2xl mr-3">✨</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Start with a hook</h4>
                  <p className="text-gray-600 text-sm">Grab your readers' attention from the very first sentence.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">📝</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Keep it conversational</h4>
                  <p className="text-gray-600 text-sm">Write like you're talking to a friend over coffee.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-2xl mr-3">🎯</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Stay focused</h4>
                  <p className="text-gray-600 text-sm">One main idea per post works best for reader engagement.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">💖</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Be authentic</h4>
                  <p className="text-gray-600 text-sm">Your unique perspective is what makes your story special.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;