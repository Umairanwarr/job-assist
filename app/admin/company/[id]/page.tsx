'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../../utils/firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc, collection, addDoc, query, orderBy, onSnapshot, deleteDoc } from 'firebase/firestore';

export default function CompanyDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const unwrappedParams = React.use(params);
  const [companyName, setCompanyName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobPost, setJobPost] = useState({
    title: '',
    description: '',
    salary: ''
  });
  const [jobs, setJobs] = useState<{id: string, title: string}[]>([]);
  const [copyStatus, setCopyStatus] = useState<{ id: string, status: string } | null>(null);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/admin');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const companyDoc = await getDoc(doc(db, 'companies', unwrappedParams.id));
        if (companyDoc.exists()) {
          setCompanyName(companyDoc.data().name);
          
          // Fetch jobs
          const jobsCollection = collection(companyDoc.ref, 'jobs');
          const jobsQuery = query(jobsCollection, orderBy('createdAt', 'desc'));
          const unsubscribe = onSnapshot(jobsQuery, (snapshot) => {
            const jobsData = snapshot.docs.map(doc => ({
              id: doc.id,
              title: doc.data().title
            }));
            setJobs(jobsData);
          });
          
          return () => unsubscribe();
        } else {
          console.error('Company not found');
          router.push('/admin/dashboard');
        }
      } catch (error) {
        console.error('Error fetching company details:', error);
        router.push('/admin/dashboard');
      }
    };

    fetchCompanyDetails();
  }, [unwrappedParams.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const companyRef = doc(db, 'companies', unwrappedParams.id);
      await addDoc(collection(companyRef, 'jobs'), {
        ...jobPost,
        createdAt: new Date()
      });
      setJobPost({
        title: '',
        description: '',
        salary: ''
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding job post:', error);
      alert('Failed to add job post. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCopyLink = async (jobId: string) => {
    const link = `${window.location.origin}/apply/${jobId}`;
    try {
      await navigator.clipboard.writeText(link);
      setCopyStatus({ id: jobId, status: 'Copied!' });
      setTimeout(() => setCopyStatus(null), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
      alert('Failed to copy link. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Job Assist Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-[#6f8aff] rounded-lg hover:bg-[#6875F5] transition-colors flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 mr-1"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Post
            </button>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm font-medium text-white bg-[#6f8aff] rounded-lg hover:bg-[#6875F5] transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{companyName}</h2>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Posts</h3>
          {jobs.length === 0 ? (
            <p className="text-gray-600">No job posts added yet.</p>
          ) : (
            <div className="flex flex-col space-y-4 w-full">
              {jobs.map((job) => (
                <div key={job.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 w-full">
                  <div className="flex justify-between items-center w-full">
                    <button
                      onClick={() => router.push(`/admin/company/${unwrappedParams.id}/job/${job.id}`)}
                      className="text-left font-medium text-gray-900 hover:text-[#6f8aff] transition-colors flex-grow"
                    >
                      {job.title}
                    </button>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleCopyLink(job.id)}
                        className="px-3 py-1 text-sm font-medium text-[#6f8aff] border border-[#6f8aff] rounded-lg hover:bg-[#6f8aff] hover:text-white transition-colors mr-4"
                      >
                        {copyStatus?.id === job.id ? copyStatus.status : 'Copy Link'}
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this job post? This action cannot be undone.')) {
                            const companyRef = doc(db, 'companies', unwrappedParams.id);
                            const jobRef = doc(collection(companyRef, 'jobs'), job.id);
                            deleteDoc(jobRef);
                          }
                        }}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black">Add New Job Post</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={jobPost.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#6f8aff] focus:border-[#6f8aff] text-black placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={jobPost.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#6f8aff] focus:border-[#6f8aff] text-black placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
                  Salary
                </label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={jobPost.salary}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#6f8aff] focus:border-[#6f8aff] text-black placeholder-gray-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#6f8aff] rounded-lg hover:bg-[#6875F5] transition-colors"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}