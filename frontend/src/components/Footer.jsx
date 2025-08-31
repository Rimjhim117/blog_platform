import React from "react";
import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaArrowUp,
} from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 border-t border-pink-100">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-pink-400 to-purple-500 p-3 rounded-2xl shadow-md">
                  <FaBookOpen className="text-white text-lg" />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              BlogPlatform
              </h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed max-w-md">
              A gentle space where stories bloom  and connections grow. Join
              our cozy community of writers and readers who believe every voice
              has something beautiful to share.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: <FaTwitter size={16} />, color: "pink" },
                { icon: <FaInstagram size={16} />, color: "purple" },
                { icon: <FaLinkedin size={16} />, color: "blue" },
                { icon: <FaEnvelope size={16} />, color: "green" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href="#"
                  className={`flex items-center justify-center w-10 h-10 rounded-full border border-${item.color}-200 text-${item.color}-500 hover:text-${item.color}-600 hover:border-${item.color}-300 transition-all duration-300 bg-white/70 backdrop-blur-sm`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-pink-100">
            <h4 className="text-lg font-semibold mb-6 text-gray-800">Explore</h4>
            <div className="space-y-3">
              {[
                { to: "/", text: "🏠 Home" },
                { to: "/blog", text: "📖 Stories" },
                { to: "/about", text: "✨ About Us" },
                { to: "/contact", text: "💌 Contact" },
              ].map((link, idx) => (
                <Link
                  key={idx}
                  to={link.to}
                  className="block text-gray-600 hover:text-pink-500 transition-all duration-300 font-medium hover:translate-x-1"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Community */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-purple-100">
            <h4 className="text-lg font-semibold mb-6 text-gray-800">
              Community
            </h4>
            <div className="space-y-3">
              {[
                "🌸 Writing Tips",
                "🤝 Community Guidelines",
                "🔒 Privacy Policy",
                "📋 Terms of Service",
              ].map((item, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="block text-gray-600 hover:text-purple-500 transition-all duration-300 font-medium hover:translate-x-1"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-8 text-center border border-pink-200 shadow-sm">
          <h4 className="text-2xl font-bold text-gray-800 mb-4">
            Stay in the Loop 
          </h4>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get the latest stories, writing tips, and community updates
            delivered straight to your inbox with love.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 shadow-sm"
            />
            <button className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-3 rounded-full hover:from-pink-500 hover:to-purple-600 transition duration-300 shadow-md text-sm font-medium">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-pink-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm text-center md:text-left mb-4 md:mb-0">
            © {new Date().getFullYear()} BlogPlatform. Made with{" "}
            <FaBookOpen className="inline text-pink-400 mx-1" /> for storytellers
            everywhere.
          </p>
          <button
            onClick={scrollToTop}
            className="bg-white/80 backdrop-blur-sm p-3 rounded-full border border-pink-100 hover:border-pink-200 text-pink-500 hover:text-pink-600 transition-all duration-300"
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
