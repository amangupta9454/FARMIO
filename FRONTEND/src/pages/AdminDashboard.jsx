import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAnalytics, getRecentListings } from '../utils/api';
import AnalyticsCard from '../components/AnalyticsCard';
import UserManagement from '../components/UserManagement';
import backgroundImage from '../assets/8.jpg';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState({ farmers: 0, consumers: 0, listings: 0 });
  const [recentListings, setRecentListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');
  const storedUser = localStorage.getItem('admin');
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  useEffect(() => {
    if (!token || !user) {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [analyticsRes, listingsRes] = await Promise.all([
          getAnalytics(token),
          getRecentListings(token),
        ]);
        setAnalytics(analyticsRes.data);
        setRecentListings(listingsRes.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate, token, user]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    window.location.href = '/admin/login'; // Force full page reload to ensure state reset
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-3 sm:p-6 lg:p-10 animate-fadeIn"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-full sm:max-w-5xl lg:max-w-7xl mx-auto pt-20 lg:pt-16 md:pt-28 sm:pt-24">
        {/* Admin Details Card */}
        <div className="bg-gray-700/40 backdrop-blur-2xl rounded-3xl shadow-2xl p-4 sm:p-6 mb-6 sm:mb-8 transform hover:scale-[1.03] transition-all duration-500 border border-gray-100/30 animate-slideInUp">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 animate-pulseTitle">Admin Dashboard</h2>
          {user ? (
            <div className="space-y-2 sm:space-y-3">
              <p className="text-sm sm:text-lg lg:text-xl text-white flex items-center">
                <span className="font-semibold mr-2">Name:</span> {user.name || 'N/A'}
              </p>
              <p className="text-sm sm:text-lg lg:text-xl text-white flex items-center break-all">
                <span className="font-semibold mr-2">Email:</span> {user.email || 'N/A'}
              </p>
              <p className="text-sm sm:text-lg lg:text-xl text-white flex items-center">
                <span className="font-semibold mr-2">Role:</span> {user.role || 'N/A'}
              </p>
            </div>
          ) : (
            <p className="text-sm sm:text-lg lg:text-xl text-white italic">No user data available</p>
          )}
          <button
            onClick={handleLogout}
            className="mt-4 sm:mt-6 bg-gradient-to-r from-red-600 to-red-800 text-white px-4 sm:px-6 py-2 rounded-full font-semibold shadow-xl hover:from-red-700 hover:to-red-900 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-400/50"
          >
            Logout
          </button>
        </div>

        {/* Loading and Error States */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-16 sm:w-16 border-t-4 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100/90 backdrop-blur-md border-l-4 border-red-600 text-red-800 p-4 rounded-xl shadow-lg animate-bounceIn">
            <p className="text-sm sm:text-lg">{error}</p>
          </div>
        ) : (
          <>
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="relative group animate-slideInLeft">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                <AnalyticsCard
                  title="Registered Farmers"
                  count={analytics.farmers}
                  className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl p-4 sm:p-6 transform hover:scale-105 hover:shadow-2xl transition-all duration-500 border border-gray-100/30"
                />
              </div>
              <div className="relative group animate-slideInUp">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-800 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                <AnalyticsCard
                  title="Registered Consumers"
                  count={analytics.consumers}
                  className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl p-4 sm:p-6 transform hover:scale-105 hover:shadow-2xl transition-all duration-500 border border-gray-100/30"
                />
              </div>
              <div className="relative group animate-slideInRight">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                <AnalyticsCard
                  title="Product Listings"
                  count={analytics.listings}
                  className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl p-4 sm:p-6 transform hover:scale-105 hover:shadow-2xl transition-all duration-500 border border-gray-100/30"
                />
              </div>
            </div>

            {/* User Management Section */}
            <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl p-4 sm:p-6 transform hover:scale-[1.02] transition-all duration-500 border border-cyan-400/30 animate-slideInUp">
              <UserManagement token={token} />
            </div>
          </>
        )}
      </div>

      {/* Tailwind CSS Animation Keyframes and Responsive Table Styling */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            transform: translateX(-30px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(30px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes bounceIn {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
          70% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes pulseTitle {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-in-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-in-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.6s ease-in-out;
        }
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-in-out;
        }
        .animate-bounceIn {
          animation: bounceIn 0.5s ease-in-out;
        }
        .animate-pulseTitle {
          animation: pulseTitle 1.5s ease-in-out infinite;
        }

        /* Responsive Table Styling for Mobile Devices */
        @media (max-width: 640px) {
          table {
            display: block;
            width: 100%;
          }
          thead {
            display: none;
          }
          tbody, tr {
            display: block;
          }
          tr {
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(229, 231, 235, 0.3);
            border-radius: 1rem;
            margin-bottom: 1rem;
            padding: 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          tr:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          }
          td {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 0;
            border: none;
            font-size: 0.875rem;
            color: #374151;
          }
          td:before {
            content: attr(data-label);
            font-weight: 600;
            color: #1f2937;
            margin-right: 0.5rem;
            flex: 1;
          }
          td:not(:last-child) {
            border-bottom: 1px solid rgba(229, 231, 235, 0.5);
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;