import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiPhone,
  FiMail,
  FiMapPin,
  FiTwitter,
  FiInstagram,
  FiMessageSquare, // Or FiDisc, FiSend etc.
  FiCircle, // For unselected radio
  FiCheckCircle, // For selected radio
} from 'react-icons/fi';

interface ContactUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const subjects = [
  'General Inquiry',
  'Technical Support',
  'Sales Question',
  'Feedback',
];

export const ContactUsModal: React.FC<ContactUsModalProps> = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>(subjects[0]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      firstName,
      lastName,
      email,
      phoneNumber,
      selectedSubject,
      message,
    });
    // Potentially clear form and close modal
    // addToast('Message sent successfully!', 'success');
    onClose();
  };

  const modalVariants = {
    hidden: { opacity: 0, y: "-50vh" }, // Start from above the viewport
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 20 } }, // Slide down
    exit: { opacity: 0, y: "-50vh", transition: { duration: 0.3 } }, // Slide back up
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose} // Close on backdrop click
        >
          <motion.div
            className="bg-card rounded-xl shadow-2xl w-full sm:w-auto md:max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
            variants={modalVariants}
            initial="hidden" 
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Left Panel */}
            <div className="w-full md:w-2/5 bg-gray-900 text-white p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
                <p className="text-sm text-gray-300 mb-8">
                  Say something to start a live chat!
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <FiPhone className="w-5 h-5 mr-3 text-primary" />
                    <span>+1012 3456 789</span>
                  </li>
                  <li className="flex items-center">
                    <FiMail className="w-5 h-5 mr-3 text-primary" />
                    <span>demo@gmail.com</span>
                  </li>
                  <li className="flex items-center">
                    <FiMapPin className="w-5 h-5 mr-3 text-primary" />
                    <span>
                      132 Dartmouth Street Boston,
                      <br />
                      Massachusetts 02156 United States
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex space-x-4 mt-auto">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <FiTwitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <FiInstagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <FiMessageSquare className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Right Panel */}
            <div className="w-full md:w-3/5 bg-white text-gray-800 p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
                  <p className="text-sm text-muted-foreground">
                    Any question or remarks? Just write us a message!
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
                  aria-label="Close modal"
                >
                  <FiX className="w-7 h-7" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Subject?
                  </label>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {subjects.map((subject) => (
                      <label key={subject} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="subject"
                          value={subject}
                          checked={selectedSubject === subject}
                          onChange={() => setSelectedSubject(subject)}
                          className="hidden" // Hide actual radio, style custom one
                        />
                        {selectedSubject === subject ? (
                          <FiCheckCircle className="w-5 h-5 text-primary" />
                        ) : (
                          <FiCircle className="w-5 h-5 text-gray-400" />
                        )}
                        <span className={`text-sm ${selectedSubject === subject ? 'text-primary font-semibold' : 'text-gray-600'}`}>
                          {subject}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-300 resize-none"
                    placeholder="Write your message..."
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-semibold shadow-md hover:bg-primary/90 transition-all duration-300"
                  >
                    Send Message
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};