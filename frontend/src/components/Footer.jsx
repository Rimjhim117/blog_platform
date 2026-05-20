import React from "react";
import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaArrowUp,
} from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-pink-50/50 via-purple-50/50 to-blue-50/50 border-t border-white backdrop-blur-md relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-2xl shadow-md">
                  <FaBookOpen className="text-white text-lg" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              BlogPlatform
              </h3>
            </div>
            <p className="text-gray-500 leading-relaxed max-w-md font-light text-base">
              A quiet sanctuary for writers and storytellers. Share your ideas, read inspired stories, and connect with a thoughtful global community.
            </p>
          </div>

          {/* Quick Links */}
          <div className="bg-white/40 backdrop-blur-md rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-white">
            <h4 className="text-lg font-bold mb-6 text-gray-900 tracking-wide">Explore</h4>
            <div className="space-y-4">
              {[
                { to: "/", text: "Home" },
                { to: "/blog", text: "Stories" },
                { to: "/about", text: "About Us" },
                { to: "/contact", text: "Contact" },
              ].map((link, idx) => (
                <Link
                  key={idx}
                  to={link.to}
                  className="block text-gray-500 hover:text-pink-500 transition-all duration-300 font-medium hover:translate-x-1"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Community */}
          <div className="bg-white/40 backdrop-blur-md rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-white">
            <h4 className="text-lg font-bold mb-6 text-gray-900 tracking-wide">
              Community
            </h4>
            <div className="space-y-4">
              {[
                { to: "/blog?category=writing-tips", text: "Writing Tips" },
                { to: "/about", text: "Community Guidelines" },
                { to: "/contact", text: "Support" },
                { to: "/about", text: "Terms of Service" },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  to={item.to}
                  className="block text-gray-500 hover:text-purple-500 transition-all duration-300 font-medium hover:translate-x-1"
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-gradient-to-r from-pink-50/50 via-purple-50/50 to-indigo-50/50 rounded-[2.5rem] p-10 text-center border border-white shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <h4 className="text-3xl font-extrabold text-gray-950 mb-3 tracking-tight">
            Stay in the Loop 
          </h4>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto font-light leading-relaxed">
            Get the latest stories, writing tips, and community updates delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 shadow-sm bg-white/80"
            />
            <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl hover:bg-gray-800 transition duration-300 shadow-md font-semibold text-base shrink-0">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm text-center md:text-left mb-4 md:mb-0 font-light">
            © {new Date().getFullYear()} BlogPlatform. Built for storytellers everywhere.
          </p>
          <button
            onClick={scrollToTop}
            className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-200 hover:border-pink-300 hover:text-pink-500 text-gray-500 transition-all duration-300 shadow-sm hover:shadow-md"
            aria-label="Scroll to top"
          >
            <FaArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
