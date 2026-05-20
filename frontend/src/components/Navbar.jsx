import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaPen, FaBookOpen } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowProfileMenu(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className={`max-w-7xl mx-auto px-4 transition-all duration-300 ${scrolled ? 'px-4 sm:px-6' : 'px-2 sm:px-4'}`}>
        <nav className={`relative transition-all duration-300 bg-white/80 backdrop-blur-md shadow-sm border border-gray-200/50 rounded-full`}>
          <div className="px-6 py-3 flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group" onClick={closeMenu}>
              <div className="bg-gradient-to-tr from-pink-500 to-purple-500 p-2.5 rounded-xl shadow-md group-hover:shadow-pink-500/30 group-hover:rotate-6 transition-all duration-300">
                <FaBookOpen className="text-white text-lg" />
              </div>
              <span className={`text-2xl font-bold tracking-tight transition-colors duration-300 text-gray-900`}>
                Blog<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Platform</span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {['Home', 'Blog', 'About', 'Contact'].map((item) => {
                const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                const active = isActive(path);
                return (
                  <Link
                    key={item}
                    to={path}
                    className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${active ? 'bg-gray-900 text-white shadow-md' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'}`}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/create-post"
                    className="bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all duration-300 flex items-center shadow-md hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <FaPen className="mr-2 text-sm" />
                    Write
                  </Link>

                  <div className="relative">
                    <button
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="flex items-center space-x-2 bg-white/80 border border-gray-200 px-2 py-1 rounded-full text-gray-700 hover:border-pink-300 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <div className="w-9 h-9 bg-gradient-to-tr from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner">
                        {user?.username?.charAt(0)?.toUpperCase()}
                      </div>
                    </button>

                    {showProfileMenu && (
                      <div className="absolute right-0 mt-3 w-56 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl py-2 z-50 border border-gray-100 transform origin-top-right transition-all animate-fade-in-up">
                        <div className="px-6 py-3 border-b border-gray-100 mb-1">
                          <p className="text-sm text-gray-500">Signed in as</p>
                          <p className="font-semibold text-gray-900 truncate">{user?.username}</p>
                        </div>
                        <Link
                          to="/profile"
                          className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition duration-150"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <FaUser className="mr-3" /> My Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full text-left px-6 py-3 text-sm text-red-600 hover:bg-red-50 transition duration-150"
                        >
                          <FaSignOutAlt className="mr-3" /> Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-gray-900 font-medium px-4 transition duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2.5 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 font-medium"
                  >
                    Join Us
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-gray-800 hover:text-pink-500 focus:outline-none p-2"
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full px-4 mt-2 animate-fade-in-up">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden pb-4">
              <div className="p-4 space-y-1">
                {['Home', 'Blog', 'About', 'Contact'].map((item) => (
                  <Link
                    key={item}
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className={`block px-4 py-3 rounded-xl font-medium transition duration-200 ${isActive(item === 'Home' ? '/' : `/${item.toLowerCase()}`) ? 'bg-pink-50 text-pink-600' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
                    onClick={closeMenu}
                  >
                    {item}
                  </Link>
                ))}
              </div>

              <div className="px-4 pt-2 border-t border-gray-100 space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/create-post"
                      className="flex items-center justify-center w-full px-4 py-3 text-white font-medium bg-gray-900 rounded-xl"
                      onClick={closeMenu}
                    >
                      <FaPen className="mr-2" /> Write Post
                    </Link>
                    <Link
                      to="/profile"
                      className="block text-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium"
                      onClick={closeMenu}
                    >
                      Profile ({user?.username})
                    </Link>
                    <button
                      onClick={() => { handleLogout(); closeMenu(); }}
                      className="flex items-center justify-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium"
                    >
                      <FaSignOutAlt className="mr-2" /> Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-3 pt-2">
                    <Link
                      to="/login"
                      className="block text-center px-4 py-3 text-gray-700 bg-gray-50 rounded-xl font-medium"
                      onClick={closeMenu}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="block text-center px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-medium"
                      onClick={closeMenu}
                    >
                      Join Us
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
