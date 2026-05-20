import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPen, FaTag, FaSave, FaTimes, FaHeart, FaLightbulb, FaFeather, FaComments, FaBullseye } from 'react-icons/fa';

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
        <div className="text-left mb-10 max-w-2xl">
          <div className="inline-flex items-center bg-pink-100/60 backdrop-blur-md px-4 py-2 rounded-full border border-pink-200 mb-6">
            <span className="text-xs font-bold text-pink-600 tracking-wider uppercase">New Draft</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
            Write your{' '}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              story
            </span>
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Share your experiences, thoughts, and ideas with the community.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-xl p-8 sm:p-10 border border-white/80">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center">
                <FaTimes className="mr-2 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Title */}
            <div className="mb-8">
              <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-3">
                Your Story Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="What would you like to call your story?"
                className="w-full px-6 py-4 text-xl border border-pink-100 rounded-2xl bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition duration-300 shadow-inner text-gray-800"
                required
              />
            </div>

            {/* Tags */}
            <div className="mb-8">
              <label htmlFor="tags" className="block text-lg font-semibold text-gray-700 mb-3">
                Tags (Optional)
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
                  className="w-full pl-12 pr-6 py-4 border border-purple-100 rounded-2xl bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition duration-300 shadow-inner text-gray-800"
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
                  Your Story
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
                placeholder="Once upon a time...

Write your story, share your experiences, thoughts, or any message you'd love to tell the world."
                className="w-full px-6 py-4 border border-blue-100 rounded-2xl bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition duration-300 resize-none text-lg leading-relaxed shadow-inner text-gray-800"
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
        <div className="mt-8 bg-white/40 backdrop-blur-md rounded-[2.5rem] shadow-lg p-10 border border-white/80">
          <h3 className="text-xs font-bold text-blue-600 bg-blue-100/60 border border-blue-200 px-4 py-2 rounded-full uppercase tracking-wider mb-8 inline-block">
            Writing Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-950 mb-2 text-lg">Start with a hook</h4>
                <p className="text-gray-600 text-sm leading-relaxed font-light">Grab your readers' attention from the very first sentence.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-950 mb-2 text-lg">Keep it conversational</h4>
                <p className="text-gray-600 text-sm leading-relaxed font-light">Write like you're talking to a friend over coffee.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-950 mb-2 text-lg">Stay focused</h4>
                <p className="text-gray-600 text-sm leading-relaxed font-light">One main idea per post works best for reader engagement.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-950 mb-2 text-lg">Be authentic</h4>
                <p className="text-gray-600 text-sm leading-relaxed font-light">Your unique perspective is what makes your story special.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;