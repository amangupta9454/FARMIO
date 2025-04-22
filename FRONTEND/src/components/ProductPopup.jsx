import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ProductPopup = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-4">{product.name || 'Unnamed Product'}</h2>
        <p><strong>Category:</strong> {product.category || 'N/A'}</p>
        <p><strong>Date of Manufacturing:</strong> {product.manufactureDate ? new Date(product.manufactureDate).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Description:</strong> {product.description || 'No description available.'}</p>
        <p><strong>Seller:</strong> {product.farmer?.name || 'Unknown'}</p>
        <p><strong>Specifications:</strong> {product.specifications || 'N/A'}</p>
      </div>
    </div>
  );
};

export default ProductPopup;