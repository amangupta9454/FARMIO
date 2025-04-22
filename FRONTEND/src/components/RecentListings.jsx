import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecentListings = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/admin/recent-listings`);
        setListings(data);
      } catch (err) {
        setError('Failed to fetch recent listings');
        console.error(err);
      }
    };
    fetchListings();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!listings.length) return <div>No recent listings available</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Recent Listings</h2>
      <ul className="space-y-2">
        {listings.map((listing) => (
          <li key={listing._id} className="border p-2 rounded">
            <span>{listing.title || 'Untitled'}</span> by{' '}
            <span>{listing.farmer?.name || 'Unknown Farmer'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentListings;