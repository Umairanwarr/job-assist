'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../utils/firebase';
import { doc, getDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import { storage, BUCKET_ID } from '../utils/appwrite';
import { ID } from 'appwrite';
import emailjs from '@emailjs/browser';

export default function JobApplication() {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [companyName, setCompanyName] = useState('Job Assist');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: ''
  });
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  useEffect(() => {
    // Initialize EmailJS
    emailjs.init('Io5pWKeMShxgPysuD');
  }, []);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // First, find which company this job belongs to
        const companies = await getDocs(collection(db, 'companies'));
        let jobDoc = null;
        let foundJob = false;
        
        for (const company of companies.docs) {
          const jobRef = doc(company.ref, 'jobs', jobId);
          const job = await getDoc(jobRef);
          if (job.exists()) {
            jobDoc = job;
            foundJob = true;
            setCompanyName(company.data().name);
            break;
          }
        }

        if (foundJob && jobDoc) {
          setJobDetails({
            id: jobDoc.id,
            ...jobDoc.data()
          });
          setSubmitStatus(null); // Clear any previous error messages
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Find the company that owns this job
      const companies = await getDocs(collection(db, 'companies'));
      let jobCompanyRef = null;
      
      for (const company of companies.docs) {
        const jobRef = doc(company.ref, 'jobs', jobId);
        const job = await getDoc(jobRef);
        if (job.exists()) {
          jobCompanyRef = company.ref;
          setCompanyName(company.data().name);
          break;
        }
      }

      if (!jobCompanyRef) {
        throw new Error('Job not found');
      }

      let fileId = null;
      let fileUrl = null;

      if (file) {
        // Upload file to Appwrite storage
        const uploadResponse = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          file
        );
        fileId = uploadResponse.$id;
        // Generate the file URL using the correct Appwrite SDK method
        fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=67bd9331000d09ce3cfc&mode=admin`;
      }

      // Create application document
      await addDoc(collection(jobCompanyRef, 'jobs', jobId, 'applications'), {
        ...formData,
        fileName: file ? file.name : null,
        fileId: fileId,
        fileUrl: fileUrl,
        submittedAt: new Date()
      });
      
      // Send confirmation email to applicant
      try {
        await emailjs.send(
          'service_o99k98f',
          'template_7jdajsh', // New template for job applications
          {
            to_email: formData.email,
            to_name: formData.fullName,
            job_title: jobDetails?.title || 'the position',
            company_name: companyName, // Using the dynamically fetched company name
            application_date: new Date().toLocaleDateString(),
            from_name: 'Job Assist Team'
          },
          'Io5pWKeMShxgPysuD'
        );
        console.log('Confirmation email sent successfully');
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
        // Continue with form submission even if email fails
      }

      setFormData({
        fullName: '',
        email: '',
        phoneNumber: ''
      });
      setFile(null);
      if (e.target instanceof HTMLFormElement) {
        e.target.reset();
      }

      setSubmitStatus({
        type: 'success',
        message: 'Your application has been submitted successfully!'
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit application. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back
            </button>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Application Form</h2>
            <div className="bg-white py-8 px-6 shadow rounded-lg">
              {submitStatus && (
                <div
                  className={`mb-4 p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
                >
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 text-start">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#6f8aff] focus:border-[#6f8aff] text-black"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#6f8aff] focus:border-[#6f8aff] text-black"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#6f8aff] focus:border-[#6f8aff] text-black"
                  />
                </div>

                <div>
                  <label htmlFor="cv" className="block text-sm font-medium text-gray-700">
                    Upload CV
                  </label>
                  <input
                    type="file"
                    id="cv"
                    name="cv"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-medium
                      file:bg-[#6f8aff] file:text-white
                      hover:file:bg-[#6875F5]
                      file:cursor-pointer"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#6f8aff] hover:bg-[#6875F5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6f8aff] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}