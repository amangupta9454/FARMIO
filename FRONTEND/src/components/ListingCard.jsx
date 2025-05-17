import React from 'react';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  if (!listing) return null;

  return (
    <div className="border rounded p-4 shadow-md">
      {listing.image && <img src={`https://farmio.onrender.com${listing.image}`} alt={listing.name || 'Produce'} className="w-full h-40 object-cover rounded mb-2" />}
      <h3 className="text-lg font-bold">{listing.name || 'Unnamed Produce'}</h3>
      <p><strong>Price:</strong> ₹{listing.price || 0}/kg</p>
      <p><strong>Quantity:</strong> {listing.quantity || 0} kg</p>
      <p><strong>Location:</strong> {listing.locationName || 'N/A'}</p>
      <p><strong>Farmer:</strong> {listing.farmer?.name || 'Unknown'}</p>
      <p><strong>Contact:</strong> {listing.farmer?.contact || 'N/A'}</p>
    </div>
  );
};

export default ListingCard;