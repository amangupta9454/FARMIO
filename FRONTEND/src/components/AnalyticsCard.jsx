import React from 'react';

const AnalyticsCard = ({ title, count }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-blue-600">{count}</p>
    </div>
  );
};

export default AnalyticsCard;