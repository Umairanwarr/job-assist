import React from 'react';
import BubbleBackground from './BubbleBackground';

const Work = () => {
  return (
    <section id="work" className="py-12 bg-gray-50 relative overflow-hidden">
      <BubbleBackground variant="colorful" bubbleCount={8} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
          How It Works
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
          A simple, streamlined process to connect you with qualified talent.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Job Posting Management */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300">
            <div className="mb-4">
              <div className="bg-[#6f8aff]/20 rounded-xl p-3 inline-block">
                <span className="text-2xl font-bold text-[#6f8aff]">01</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
            Define Requirements
            </h3>
            <p className="text-gray-600 text-sm">
            Discuss your hiring needs, job details, and ideal candidate profile with our team.
            </p>
          </div>

          {/* Repeat for all other cards */}

          {/* Advanced Screening */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300">
            <div className="mb-4">
              <div className="bg-[#6f8aff]/20 rounded-xl p-3 inline-block">
                <span className="text-2xl font-bold text-[#6f8aff]">02</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
            We Create a Job Posting
            </h3>
            <p className="text-gray-600 text-sm">
            We craft an optimized job listing and provide you with a unique shareable link.
            </p>
          </div>

          {/* Qualified Shortlists */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300">
            <div className="mb-4">
              <div className="bg-[#6f8aff]/20 rounded-xl p-3 inline-block">
                <span className="text-2xl font-bold text-[#6f8aff]">03</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
            Applications Review
            </h3>
            <p className="text-gray-600 text-sm">
            Our specialists screen all applications based on your specific requirements.
            </p>
          </div>

          {/* Custom Links */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300">
            <div className="mb-4">
              <div className="bg-[#6f8aff]/20 rounded-xl p-3 inline-block">
                <span className="text-2xl font-bold text-[#6f8aff]">04</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
            Qualified Shortlist
            </h3>
            <p className="text-gray-600 text-sm">
            You receive only qualified candidates ready for your interview process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;