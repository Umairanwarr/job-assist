'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../utils/firebase';
import { signOut } from 'firebase/auth';
import { collection, addDoc, onSnapshot, query, deleteDoc, doc } from 'firebase/firestore';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companies, setCompanies] = useState([]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/admin');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, 'companies'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const companiesData = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name
      }));
      setCompanies(companiesData);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'companies'), {
        name: companyName,
        createdAt: new Date()
      });
      setCompanyName('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding company:', error);
      alert('Failed to add company. Please try again.');
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
              Add Company
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome to Admin Dashboard</h2>
          <p className="text-gray-600">Here you can manage your job listings and applications.</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Companies</h3>
          {companies.length === 0 ? (
            <p className="text-gray-600">No companies added yet.</p>
          ) : (
            <div className="flex flex-col space-y-4 w-full">
              {companies.map((company) => (
                <div key={company.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 w-full">
                  <div className="flex justify-between items-center w-full">
                    <button 
                      onClick={() => navigate(`/admin/company/${company.id}`)}
                      className="text-left font-medium text-gray-900 hover:text-[#6f8aff] transition-colors flex-grow"
                    >
                      {company.name}
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this company? This action cannot be undone.')) {
                          deleteDoc(doc(db, 'companies', company.id));
                        }
                      }}
                      className="ml-4 text-red-600 hover:text-red-800 transition-colors"
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
              <h3 className="text-lg font-semibold text-black">Add New Company</h3>
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
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
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