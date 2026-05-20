import React from "react";
import { Link } from "react-router-dom";
import { FaCalendar, FaClock, FaArrowRight } from "react-icons/fa";

const BlogCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content ? content.split(" ").length : 0;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime || 1;
  };

  const truncateContent = (content, maxLength = 120) => {
    if (!content) return "";
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = -(yc - y) / 12; // tilt depth
    const rotateY = (x - xc) / 12;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'none';
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group bg-white/60 backdrop-blur-md rounded-[2rem] p-8 border border-white hover:border-pink-200/50 transition-shadow duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(244,63,94,0.1)] flex flex-col h-full will-change-transform"
    >
      {/* Category & Reading Time Row */}
      <div className="flex items-center justify-between mb-6">
        {post.category ? (
          <span className="bg-pink-100/60 text-pink-600 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-pink-200/50">
            {post.category}
          </span>
        ) : (
          <span className="bg-purple-100/60 text-purple-600 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-purple-200/50">
            Story
          </span>
        )}
        <div className="flex items-center text-xs text-gray-400 font-medium">
          <FaClock className="mr-1.5 text-gray-300" />
          <span>{getReadingTime(post.content)} min read</span>
        </div>
      </div>

      {/* Title */}
      <Link to={`/blog/${post._id}`} className="block mb-4">
        <h3 className="text-2xl font-bold text-gray-900 hover:text-pink-600 transition-colors duration-300 leading-snug line-clamp-2">
          {post.title}
        </h3>
      </Link>

      {/* Content Excerpt */}
      <p className="text-gray-500 font-light text-base leading-relaxed mb-8 line-clamp-3">
        {truncateContent(post.content)}
      </p>

      {/* Footer Info Row */}
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-pink-200">
            {post.author?.username?.charAt(0)?.toUpperCase() || "A"}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">
              {post.author?.username || "Anonymous"}
            </p>
            <p className="text-xs text-gray-400">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>
        
        <Link
          to={`/blog/${post._id}`}
          className="inline-flex items-center text-sm font-bold text-pink-500 hover:text-pink-600 transition-colors duration-300 group/link"
        >
          <span>Read</span>
          <FaArrowRight className="ml-1.5 transform group-hover/link:translate-x-1 transition-transform duration-300 text-xs" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
