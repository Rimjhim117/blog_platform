import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaPen, FaBookOpen } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowProfileMenu(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <div className="bg-gradient-to-r from-indigo-300 to-purple-300 p-2 rounded-lg shadow-sm">
              <FaBookOpen className="text-white text-lg" />
            </div>
            <span className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              BlogPlatform
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Blog', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="text-gray-700 hover:text-indigo-500 transition-colors duration-200 font-medium"
              >
                {item}
              </Link>
            ))}

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/create-post"
                  className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-5 py-2.5 rounded-lg hover:from-indigo-500 hover:to-purple-600 transition duration-300 flex items-center shadow-sm"
                >
                  <FaPen className="mr-2 text-sm" />
                  Write
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-lg text-gray-700 hover:text-indigo-500 transition duration-200 shadow-sm"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user?.username?.charAt(0)?.toUpperCase()}
                    </div>
                    <span className="font-medium">{user?.username}</span>
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">
                      <Link
                        to="/profile"
                        className="block px-6 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <FaUser className="inline mr-3" />
                        My Profile
                      </Link>
                      <hr className="border-gray-100 my-1" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150"
                      >
                        <FaSignOutAlt className="inline mr-3" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-500 transition duration-200 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-5 py-2.5 rounded-lg hover:from-indigo-500 hover:to-purple-600 transition duration-300 shadow-sm"
                >
                  Join Us
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-indigo-500 focus:outline-none focus:text-indigo-500 p-2 rounded-lg bg-white shadow-sm"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-md mx-4 mb-4 border border-gray-100">
              {['Home', 'Blog', 'About', 'Contact'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="block px-4 py-3 text-gray-700 hover:text-indigo-500 hover:bg-indigo-50 transition duration-200 rounded-lg font-medium"
                  onClick={closeMenu}
                >
                  {item}
                </Link>
              ))}

              <hr className="border-gray-100 my-2" />

              {isAuthenticated ? (
                <>
                  <Link
                    to="/create-post"
                    className="block px-4 py-3 text-indigo-600 font-medium bg-indigo-50 rounded-lg"
                    onClick={closeMenu}
                  >
                    <FaPen className="inline mr-2" />
                    Write Post
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-3 text-gray-700 hover:text-indigo-500 hover:bg-indigo-50 transition duration-200 rounded-lg font-medium"
                    onClick={closeMenu}
                  >
                    Profile ({user?.username})
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:text-indigo-500 hover:bg-indigo-50 transition duration-200 rounded-lg font-medium"
                  >
                    <FaSignOutAlt className="inline mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-3 text-gray-700 hover:text-indigo-500 hover:bg-indigo-50 transition duration-200 rounded-lg font-medium"
                    onClick={closeMenu}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block mx-4 my-2 px-4 py-3 bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-lg hover:from-indigo-500 hover:to-purple-600 transition duration-300 text-center font-medium"
                    onClick={closeMenu}
                  >
                    Join Us
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
