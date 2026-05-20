import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPen, FaTag, FaSave, FaTimes, FaHeart, FaLightbulb, FaFeather, FaComments, FaBullseye } from 'react-icons/fa';

const PRESET_IMAGES = [
  { name: 'Abstract Pastel', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80' },
  { name: 'Glassmorphic Aurora', url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80' },
  { name: 'Gradient Mesh', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80' },
  { name: 'Abstract Fluid', url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80' }
];

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    coverImage: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasDraft, setHasDraft] = useState(false);
  const navigate = useNavigate();

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('blog_draft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        if (parsed.title?.trim() || parsed.content?.trim() || parsed.tags?.trim() || parsed.coverImage) {
          setHasDraft(true);
        }
      } catch (err) {
        console.error('Error parsing draft:', err);
      }
    }
  }, []);

  // Save draft on changes
  useEffect(() => {
    if (formData.title || formData.content || formData.tags || formData.coverImage) {
      localStorage.setItem('blog_draft', JSON.stringify(formData));
    }
  }, [formData]);

  const handleRestoreDraft = () => {
    const savedDraft = localStorage.getItem('blog_draft');
    if (savedDraft) {
      try {
        setFormData(JSON.parse(savedDraft));
      } catch (err) {
        console.error('Error restoring draft:', err);
      }
    }
    setHasDraft(false);
  };

  const handleDiscardDraft = () => {
    localStorage.removeItem('blog_draft');
    setHasDraft(false);
    setFormData({ title: '', content: '', tags: '', coverImage: '' });
  };

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
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        coverImage: formData.coverImage
      };

      const response = await axios.post('/posts', postData);
      localStorage.removeItem('blog_draft');
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
            {hasDraft && (
              <div className="mb-8 p-5 bg-gradient-to-r from-pink-50/90 via-purple-50/90 to-blue-50/90 backdrop-blur-md border border-pink-100 rounded-3xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start">
                  <div className="bg-pink-100 p-2.5 rounded-xl mr-4 flex-shrink-0 text-pink-600 flex items-center justify-center">
                    <FaSave />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Unsaved draft found</h4>
                    <p className="text-gray-600 text-xs mt-1">You have a draft saved from your last session. Would you like to restore it?</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleRestoreDraft}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs px-4 py-2.5 rounded-full font-semibold shadow-sm hover:opacity-90 transition duration-300"
                  >
                    Restore
                  </button>
                  <button
                    type="button"
                    onClick={handleDiscardDraft}
                    className="bg-white hover:bg-gray-50 text-gray-700 text-xs px-4 py-2.5 border border-gray-200 rounded-full font-semibold transition duration-300"
                  >
                    Discard
                  </button>
                </div>
              </div>
            )}

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

            {/* Cover Image */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Cover Image
              </label>
              
              {/* Presets Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                {PRESET_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, coverImage: img.url }))}
                    className={`relative aspect-video rounded-2xl overflow-hidden border-2 transition duration-300 ${
                      formData.coverImage === img.url ? 'border-pink-500 shadow-md scale-[1.02]' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                      <span className="text-[10px] font-bold text-white tracking-wider uppercase">{img.name}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <input
                type="text"
                name="coverImage"
                value={formData.coverImage || ''}
                onChange={handleChange}
                placeholder="Or paste a custom image URL (e.g. Unsplash link)"
                className="w-full px-6 py-4 border border-pink-100 rounded-2xl bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition duration-300 shadow-inner text-gray-800"
              />
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