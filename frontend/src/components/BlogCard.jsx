import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaCalendar, FaClock } from "react-icons/fa";

const BlogCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(" ").length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime;
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  // Array of soft gradient combinations (pastel, subtle)
  const gradients = [
    "from-pink-200 via-pink-100 to-purple-100",
    "from-blue-200 via-blue-100 to-purple-100",
    "from-purple-200 via-purple-100 to-pink-100",
    "from-yellow-200 via-yellow-100 to-pink-100",
    "from-green-200 via-green-100 to-blue-100",
    "from-indigo-200 via-indigo-100 to-purple-100",
  ];

  const gradientIndex = post._id ? post._id.length % gradients.length : 0;
  const selectedGradient = gradients[gradientIndex];

  return (
    <div className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-pink-200 transform hover:-translate-y-1">
      {/* Header Gradient Banner */}
      <div
        className={`h-32 bg-gradient-to-br ${selectedGradient} flex items-center justify-center relative`}
      >
        <div className="absolute inset-0 bg-white/10"></div>
        <h3 className="relative z-10 text-gray-700 text-lg font-semibold text-center px-4 line-clamp-2">
          {post.title}
        </h3>
      </div>

      <div className="p-6">
        {/* Title */}
        <Link to={`/blog/${post._id}`}>
          <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-pink-500 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {/* Content Preview */}
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {truncateContent(post.content)}
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
            {post.tags.length > 3 && (
              <span className="text-gray-400 text-xs bg-gray-50 px-3 py-1 rounded-full">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
          <div className="flex items-center space-x-2 bg-pink-50 px-3 py-1 rounded-full">
            <div className="w-5 h-5 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <FaUser className="text-white text-xs" />
            </div>
            <span className="font-medium">{post.author?.username || "Anonymous"}</span>
          </div>

          <div className="flex items-center space-x-4 text-gray-400">
            <div className="flex items-center">
              <FaCalendar className="mr-1" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex items-center">
              <FaClock className="mr-1" />
              <span>{getReadingTime(post.content)} min</span>
            </div>
          </div>
        </div>

        {/* Button */}
        <Link
          to={`/blog/${post._id}`}
          className="block w-full text-center bg-gradient-to-r from-pink-400 to-purple-500 text-white py-3 px-4 rounded-full hover:from-pink-500 hover:to-purple-600 transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg"
        >
          Read This Story
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
