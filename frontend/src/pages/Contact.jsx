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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center bg-white/70 backdrop-blur-sm px-6 py-3 rounded-xl shadow-sm mb-6">
          <FaRegPaperPlane className="text-pink-400 mr-2" />
          <span className="font-medium text-gray-600">We'd love to hear from you</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-800">
          Let's{' '}
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Connect
          </span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Have a question, suggestion, or just want to say hello? We're here and happy to chat.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-3 rounded-lg mr-4">
                <FaPaperPlane className="text-pink-500 text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Send us a Message</h2>
                <p className="text-gray-500 text-sm">We'd love to hear what's on your mind</p>
              </div>
            </div>

            {submitMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-300 transition resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-3 px-6 rounded-lg hover:from-pink-500 hover:to-purple-600 focus:ring-2 focus:ring-pink-300 disabled:opacity-50 transition shadow-md font-medium text-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <FaRegPaperPlane className="mr-2" />
                    Send Message
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information & More */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-3 rounded-lg mr-4">
                  <FaMapMarkerAlt className="text-blue-500 text-lg" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">Get in Touch</h2>
                  <p className="text-gray-500 text-sm">We're here to help and connect</p>
                </div>
              </div>

              <div className="space-y-6 text-sm">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-3 rounded-lg mr-4">
                    <FaEnvelope className="text-pink-500" size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <p className="text-gray-600">rimjhimsrivastava971@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-lg mr-4">
                    <FaPhone className="text-purple-500" size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Phone</p>
                    <p className="text-gray-600">+91 8736826766</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg mr-4">
                    <FaMapMarkerAlt className="text-blue-500" size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Address</p>
                    <p className="text-gray-600">Prayagraj<br />Uttar Pradesh, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Follow Us</h2>
              <div className="grid grid-cols-3 gap-4">
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex flex-col items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition border border-blue-100">
                  <FaTwitter size={22} className="mb-2 text-blue-500" />
                  <p className="text-sm font-medium text-gray-700">Twitter</p>
                </a>
                <a href="https://www.linkedin.com/in/rimjhim-srivastava-52769032b" target="_blank" rel="noreferrer" className="flex flex-col items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg hover:from-blue-100 hover:to-indigo-200 transition border border-indigo-100">
                  <FaLinkedin size={22} className="mb-2 text-blue-700" />
                  <p className="text-sm font-medium text-gray-700">LinkedIn</p>
                </a>
                <a href="https://github.com/Rimjhim117" target="_blank" rel="noreferrer" className="flex flex-col items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-gray-100 hover:to-gray-200 transition border border-gray-100">
                  <FaGithub size={22} className="mb-2 text-gray-700" />
                  <p className="text-sm font-medium text-gray-700">GitHub</p>
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Quick Questions</h2>
              <div className="space-y-4 text-sm">
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-100">
                  <h3 className="font-medium text-gray-800 mb-1">How do I start writing?</h3>
                  <p className="text-gray-600">Simply create an account and click "Write" - we'll guide you through the rest.</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-100">
                  <h3 className="font-medium text-gray-800 mb-1">Is BlogPlatform free?</h3>
                  <p className="text-gray-600">Yes! Our platform is free to use with all the features you need to share your stories.</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                  <h3 className="font-medium text-gray-800 mb-1">Can I customize my content?</h3>
                  <p className="text-gray-600">Absolutely! We provide beautiful formatting options to make your stories shine.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
