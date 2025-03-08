'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../utils/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

export default function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const companies = await getDocs(collection(db, 'companies'));
        let jobDoc = null;
        let foundJob = false;
        
        for (const company of companies.docs) {
          const jobRef = doc(company.ref, 'jobs', jobId);
          const job = await getDoc(jobRef);
          if (job.exists()) {
            jobDoc = job;
            foundJob = true;
            break;
          }
        }

        if (foundJob && jobDoc) {
          setJobDetails({
            id: jobDoc.id,
            ...jobDoc.data()
          });
          setSubmitStatus(null);
        } else {
          setSubmitStatus({
            type: 'error',
            message: 'Job posting not found. Please check the URL and try again.'
          });
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
        setSubmitStatus({
          type: 'error',
          message: 'Unable to load job details. Please try again later.'
        });
      }
    };

    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  if (!jobDetails && submitStatus?.type !== 'error') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6f8aff]"></div>
      </div>
    );
  }

  return (
    <div>
      <nav className="bg-white shadow-sm fixed top-0 w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-center items-center">
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
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white py-8 px-6 shadow rounded-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Job Details</h2>
            {jobDetails && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{jobDetails.title}</h3>
                  <h4 className="mt-3 text-lg font-bold text-gray-700">Job Description</h4>
                  <p className="mt-2 text-gray-600">{jobDetails.description}</p>
                  <p className="mt-4 text-gray-600"><span className="font-bold">Salary:</span> {jobDetails.salary}</p>
                </div>
                
                <div className="pt-6">
                  <button
                    onClick={() => navigate(`/apply/${jobId}/form`)}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#6f8aff] hover:bg-[#6875F5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6f8aff]"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            )}
            
            {submitStatus && submitStatus.type === 'error' && (
              <div className="mt-4 p-4 rounded-lg bg-red-50 text-red-800">
                {submitStatus.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}