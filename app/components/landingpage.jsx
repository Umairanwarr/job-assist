import React from 'react';
import Navbar from './navbar';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex items-center h-[calc(100vh-80px)]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            <h1 className="text-5xl font-bold leading-tight text-black">
              We <span className="text-[#6f8aff]">Filter</span>, You <span className="text-[#6f8aff]">Hire</span> <br />
              Simple, Smart,<br />
              and Efficient
            </h1>
            <p className="text-xl text-gray-600">
              Manage Access, Cut Costs,<br />
              and Secure Hiring in One Place.
            </p>
            <button className="bg-[#6f8aff] text-white px-8 py-3 rounded-lg hover:bg-[#6875F5] transition-colors text-lg">
              Contact Us
            </button>
          </div>

          {/* Right Column - Image */}
          <div className="relative flex items-center justify-center">
            <img
              src="/rightside.jpg"
              alt="Job Assist Preview"
              className="w-[500px] h-[400px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}