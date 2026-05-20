import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaTwitter, FaLinkedin, FaGithub, FaPaperPlane, FaRegPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // This is placeholder logic. In a real app, you would send the data to a backend API.
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage("Thank you for reaching out! We'll get back to you soon.");
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pt-24 pb-16 relative overflow-hidden">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      {/* Hero Section */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center z-10">
        <div className="inline-flex items-center bg-white/60 backdrop-blur-md px-6 py-3 rounded-full shadow-sm mb-8 border border-white">
          <FaRegPaperPlane className="text-pink-500 mr-2" />
          <span className="font-semibold text-gray-700 tracking-wide text-sm uppercase">We'd love to hear from you</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-gray-900 tracking-tight">
          Let's{' '}
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Connect
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
          Have a question, suggestion, or just want to say hello? We're here and happy to chat.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 lg:p-12 border border-white">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-br from-pink-400 to-rose-400 p-4 rounded-2xl mr-5 shadow-lg shadow-pink-200">
                <FaPaperPlane className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900">Send a Message</h2>
                <p className="text-gray-500 text-base mt-1">We'd love to hear what's on your mind</p>
              </div>
            </div>

            {submitMessage && (
              <div className="mb-8 p-5 bg-green-50/80 backdrop-blur-sm border border-green-200 text-green-700 rounded-2xl text-sm font-medium">
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-400 transition-all outline-none text-gray-800"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-400 transition-all outline-none text-gray-800"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all outline-none text-gray-800"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-400 transition-all outline-none resize-none text-gray-800"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-8 rounded-2xl hover:from-pink-600 hover:to-purple-700 focus:ring-4 focus:ring-pink-300/50 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl font-bold text-lg hover:-translate-y-1"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <FaRegPaperPlane className="mr-3" />
                    Send Message
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information & More */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 border border-white hover:border-blue-100 transition-colors duration-300">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-4 rounded-2xl mr-5 shadow-lg shadow-blue-200">
                  <FaMapMarkerAlt className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900">Get in Touch</h2>
                  <p className="text-gray-500 text-sm mt-1">We're here to help and connect</p>
                </div>
              </div>

              <div className="space-y-8 text-base">
                <div className="flex items-start group">
                  <div className="bg-pink-50 p-4 rounded-2xl mr-5 text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors duration-300">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Email</p>
                    <p className="text-gray-600">rimjhimsrivastava971@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-purple-50 p-4 rounded-2xl mr-5 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                    <FaPhone size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Phone</p>
                    <p className="text-gray-600">+91 8736826766</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-indigo-50 p-4 rounded-2xl mr-5 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Address</p>
                    <p className="text-gray-600">Prayagraj<br />Uttar Pradesh, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 border border-white">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Follow Us</h2>
              <div className="grid grid-cols-3 gap-4 lg:gap-6">
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex flex-col items-center p-6 bg-white rounded-2xl hover:bg-blue-50 transition-all duration-300 border border-gray-100 hover:border-blue-200 group hover:-translate-y-1 shadow-sm hover:shadow-md">
                  <FaTwitter size={28} className="mb-3 text-blue-400 group-hover:text-blue-500" />
                  <p className="text-sm font-bold text-gray-700">Twitter</p>
                </a>
                <a href="https://www.linkedin.com/in/rimjhim-srivastava-52769032b" target="_blank" rel="noreferrer" className="flex flex-col items-center p-6 bg-white rounded-2xl hover:bg-blue-50 transition-all duration-300 border border-gray-100 hover:border-blue-200 group hover:-translate-y-1 shadow-sm hover:shadow-md">
                  <FaLinkedin size={28} className="mb-3 text-blue-600 group-hover:text-blue-700" />
                  <p className="text-sm font-bold text-gray-700">LinkedIn</p>
                </a>
                <a href="https://github.com/Rimjhim117" target="_blank" rel="noreferrer" className="flex flex-col items-center p-6 bg-white rounded-2xl hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-gray-300 group hover:-translate-y-1 shadow-sm hover:shadow-md">
                  <FaGithub size={28} className="mb-3 text-gray-700 group-hover:text-gray-900" />
                  <p className="text-sm font-bold text-gray-700">GitHub</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
