import React from 'react';
import BubbleBackground from './BubbleBackground';

const SaveTimeResources = () => {
  return (
    <section className="py-16 bg-[#f9fafc] relative overflow-hidden">
      <BubbleBackground variant="default" bubbleCount={8} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f0f4fc] rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Save Time & Resources
              </h2>
              <p className="text-gray-600 text-md mb-8">
                Our professional screening service helps you focus on what matters most - growing your business. Let us handle the time-consuming candidate filtering process.
              </p>
              <div className="space-y-4">
                {/* Benefit Items */}
                {[
                  'Reduce hiring time by up to 60%',
                  'Only interview pre-qualified candidates',
                  'Eliminate resume screening workload',
                  'Focus on your core business activities'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="bg-[#6f8aff]/20 rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#6f8aff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <p className="ml-3 text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Image with Stats */}
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/comp.jpeg" 
                  alt="Professional Screening" 
                  className="w-full h-auto object-cover rounded-lg" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg"></div>
              </div>

              {/* New Floating Card */}
              <div className="absolute -bottom-8 -right-8">
                <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-xl p-4 shadow-2xl text-left w-40 px-4">
                  <div className="text-gray-800 font-bold text-lg mb-1 text-left">Time Saved</div>
                  <div className="text-3xl font-bold text-[#6f8aff] text-left">75%</div>
                  <div className="text-[14px] text-gray-400 font-bold mt-1 text-left">Average per hire</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaveTimeResources;