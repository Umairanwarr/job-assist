import React from 'react';

export default function Footer() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white text-gray-900 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          {/* Company Info */}
          <div className="space-y-4">
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
            <p className="text-sm text-gray-600">
              Connecting businesses with exceptional talent since 2025
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">Company</h3>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('whychooseus');
              }}
              className="block text-sm text-gray-600 hover:text-[#6f8aff] transition-colors"
            >
              About Us
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('work');
              }}
              className="block text-sm text-gray-600 hover:text-[#6f8aff] transition-colors"
            >
              How It Works
            </a>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">Contact</h3>
            <p className="text-sm text-gray-600">jo6assist@gmail.com</p>
            <p className="text-sm text-gray-600">+92 333 5069449</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Job Assist. All rights reserved.
        </div>
      </div>
    </footer>
  );
}