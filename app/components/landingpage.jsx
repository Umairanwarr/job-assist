import React from 'react';
import Navbar from "./navbar";
import WhyChooseUs from './whychooseus';
import SaveTimeResources from './savetimeresources';
import Work from './work';
import Contact from './contact';
import Footer from './footer';
import BubbleBackground from './BubbleBackground';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f9fafc] relative overflow-hidden"> {/* Removed mt-16 */}
        {/* Enhanced Bubble Background */}
        <BubbleBackground variant="colorful" bubbleCount={12} />

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-screen text-center py-16">
          <div className="bg-[#f0f4ff] rounded-full px-4 py-2 mb-4 animate-slow-bounce">
            <p className="text-sm text-[#6f8aff] font-medium">Quality candidates for your business</p>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">
            We Filter. You <span className="text-[#6f8aff]">Hire</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            We handle the screening process so you only interview candidates who<br />
            match your requirements.
          </p>
          <div className="relative w-full max-w-xl mx-auto mt-8"> {/* Reduced max-width */}
            <img
              src="/job.jpeg"
              alt="Job Assist Preview"
              className="w-full h-72 object-cover rounded-lg shadow-lg" // Increased from h-64 to h-72
            />
            <div className="absolute inset-0 bg-black/30 rounded-lg" />
            <div className="absolute bottom-0 left-0 right-0 text-lg text-white py-2 px-4 text-start">
              Save time and resources with professional screening
            </div>
          </div>
          <div className="absolute bottom-8 animate-slow-bounce">
            <div className="bg-white rounded-full p-2 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <WhyChooseUs />
      <SaveTimeResources />
      <Work />
      <Contact />
      <Footer />
    </>
  );
}