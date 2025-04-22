import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductPopup from './ProductPopup';

const ProductCard = ({ product, isFarmerDashboard = false, onDelete }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="border rounded-lg shadow-md hover:shadow-lg transition p-4 bg-white">
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg mb-4"
          onError={(e) => { e.target.src = '/placeholder.jpg'; }}
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 rounded-t-lg mb-4 flex items-center justify-center">
          <span>No Image</span>
        </div>
      )}
      <h2 className="text-lg font-semibold truncate">{product.name || 'Unnamed Product'}</h2>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description || 'No description available.'}</p>
      <div className="flex justify-between">
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Know More
        </button>
        {isFarmerDashboard ? (
          <button
            onClick={() => onDelete(product._id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        ) : (
          <Link
            to={`/buy-now/${product._id}`}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Buy Now
          </Link>
        )}
      </div>
      {isPopupOpen && (
        <ProductPopup product={product} onClose={() => setIsPopupOpen(false)} />
      )}
    </div>
  );
};

export default ProductCard;