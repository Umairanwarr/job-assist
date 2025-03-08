import React, { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu if open
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6 text-[#6f8aff] mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-lg font-medium text-[#6f8aff]">Job Assist</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('whychooseus');
              }} 
              className="text-gray-600 hover:text-gray-900"
            >
              Features
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('work');
              }} 
              className="text-gray-600 hover:text-gray-900"
            >
              How It Works
            </a>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="bg-[#6f8aff] text-white px-4 py-2 rounded-lg hover:bg-[#6875F5] transition-colors"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden pb-4`}>
          <div className="flex flex-col space-y-4">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('whychooseus');
              }} 
              className="text-gray-600 hover:text-gray-900"
            >
              Features
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('work');
              }} 
              className="text-gray-600 hover:text-gray-900"
            >
              How It Works
            </a>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="bg-[#6f8aff] text-white px-4 py-2 rounded-lg hover:bg-[#6875F5] transition-colors w-full"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}