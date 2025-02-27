import React from 'react';
import Navbar from './navbar';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white pt-16">
      <Navbar />
      <div className="flex items-center min-h-[calc(100vh-80px)] py-8 md:py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Hero Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-black">
              We <span className="text-[#6f8aff]">Filter</span>, You <span className="text-[#6f8aff]">Hire</span> <br className="hidden sm:block" />
              Simple, Smart,<br className="hidden sm:block" />
              and Efficient
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">
              Manage Access, Cut Costs,<br className="hidden sm:block" />
              and Secure Hiring in One Place.
            </p>
            <button className="bg-[#6f8aff] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-[#6875F5] transition-colors text-base sm:text-lg">
              Contact Us
            </button>
          </div>

          {/* Right Column - Image */}
          <div className="relative flex items-center justify-center mt-8 lg:mt-0">
            <img
              src="/rightside.jpg"
              alt="Job Assist Preview"
              className="w-full max-w-[400px] lg:max-w-[500px] h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}