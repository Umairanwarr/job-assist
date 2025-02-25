import React from 'react';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
      <div className="text-2xl font-bold text-black">Job Assist</div>
      <div className="flex items-center">
        <button className="bg-[#6f8aff] text-white px-6 py-2 rounded-lg hover:bg-[#6875F5] transition-colors">
          Contact us
        </button>
      </div>
    </nav>
  );
}