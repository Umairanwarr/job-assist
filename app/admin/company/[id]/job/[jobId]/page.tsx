'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../../../../../utils/firebase';
import { doc, getDoc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export default function JobDetails({ params }: { params: { id: string; jobId: string } }) {
  const router = useRouter();
  const unwrappedParams = React.use(params);
  const [jobDetails, setJobDetails] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobAndApplications = async () => {
      try {
        // Get job details
        const companyRef = doc(db, 'companies', unwrappedParams.id);
        const jobRef = doc(collection(companyRef, 'jobs'), unwrappedParams.jobId);
        const jobDoc = await getDoc(jobRef);

        if (!jobDoc.exists()) {
          setError('Job not found');
          setLoading(false);
          return;
        }

        setJobDetails({
          id: jobDoc.id,
          ...jobDoc.data()
        });

        // Set up real-time listener for applications
        const applicationsRef = collection(jobRef, 'applications');
        const applicationsQuery = query(applicationsRef, orderBy('submittedAt', 'desc'));
        
        const unsubscribe = onSnapshot(applicationsQuery, (snapshot) => {
          const applicationsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setApplications(applicationsData);
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load job details and applications');
        setLoading(false);
      }
    };

    fetchJobAndApplications();
  }, [unwrappedParams.id, unwrappedParams.jobId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6f8aff]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 text-red-800 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900 flex items-center"
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
            <h1 className="text-2xl font-bold text-gray-900">Job Details</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Job Details Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{jobDetails?.title}</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Description</h3>
              <p className="mt-1 text-gray-600">{jobDetails?.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">Salary</h3>
              <p className="mt-1 text-gray-600">{jobDetails?.salary}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">Posted</h3>
              <p className="mt-1 text-gray-600">
                {jobDetails?.createdAt?.toDate().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Applications Section */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Applications ({applications.length})
            </h2>
          </div>

          {applications.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No applications received yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CV
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied On
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((application) => (
                    <tr key={application.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {application.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {application.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {application.phoneNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {application.fileUrl ? (
                          <a
                            href={application.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#6f8aff] hover:text-[#6875F5] transition-colors"
                          >
                            View CV
                          </a>
                        ) : (
                          'No CV attached'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {application.submittedAt?.toDate().toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}