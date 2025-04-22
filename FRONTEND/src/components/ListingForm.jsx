import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createListing } from '../utils/api';
import backgroundImage from '../assets/2.jpg';

const ListingForm = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
    locationName: '',
    coordinates: '[0,0]',
    image: null,
    category: '',
    manufactureDate: '',
    description: '',
    specifications: '',
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'image' && formData[key]) {
          data.append(key, formData[key]);
        } else if (formData[key]) {
          data.append(key, formData[key]);
        }
      });
      await createListing(data, localStorage.getItem('token'));
      alert('Listing created successfully');
      navigate('/farmer');
    } catch (error) {
      console.error('Error creating listing:', error);
      setError(error.response?.data?.message || 'Failed to create listing.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-start justify-center pt-20 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-36 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 transition-all duration-1000 hover:shadow-[0_0_60px_rgba(34,197,94,0.7)] border border-white/25 animate-slideIn">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-green-100 animate-gradientText bg-gradient-to-r from-green-200 via-emerald-300 to-teal-400 bg-clip-text ">
          Create Your Listing
        </h2>
        {error && (
          <p className="text-red-200 mb-4 sm:mb-6 md:mb-8 text-center bg-red-600/20 p-4 rounded-xl border border-red-500/50 animate-shake text-sm sm:text-base md:text-lg">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          <div className="relative group z-10">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="relative w-full p-3 sm:p-4 bg-white/15 border-2 border-green-500/50 rounded-xl focus:ring-4 focus:ring-green-400/70 focus:border-green-600 transition-all duration-500 text-white placeholder-gray-200 text-sm sm:text-base md:text-lg z-20"
              required
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-green-500/40 group-hover:ring-green-500/70 transition-all duration-500 animate-pulse z-0" />
            <span className="absolute -top-2 left-3 px-2 text-xs sm:text-sm md:text-base text-green-100 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">Name</span>
          </div>
          <div className="relative group z-10">
            <input
              type="number"
              name="quantity"
              placeholder="Quantity (kg)"
              value={formData.quantity}
              onChange={handleChange}
              className="relative w-full p-3 sm:p-4 bg-white/15 border-2 border-green-500/50 rounded-xl focus:ring-4 focus:ring-green-400/70 focus:border-green-600 transition-all duration-500 text-white placeholder-gray-200 text-sm sm:text-base md:text-lg z-20"
              required
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-green-500/40 group-hover:ring-green-500/70 transition-all duration-500 animate-pulse z-0" />
            <span className="absolute -top-2 left-3 px-2 text-xs sm:text-sm md:text-base text \ text-green-100 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">Quantity</span>
          </div>
          <div className="relative group z-10">
            <input
              type="number"
              name="price"
              placeholder="Price per kg"
              value={formData.price}
              onChange={handleChange}
              className="relative w-full p-3 sm:p-4 bg-white/15 border-2 border-green-500/50 rounded-xl focus:ring-4 focus:ring-green-400/70 focus:border-green-600 transition-all duration-500 text-white placeholder-gray-200 text-sm sm:text-base md:text-lg z-20"
              required
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-green-500/40 group-hover:ring-green-500/70 transition-all duration-500 animate-pulse z-0" />
            <span className="absolute -top-2 left-3 px-2 text-xs sm:text-sm md:text-base text-green-100 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">Price</span>
          </div>
          <div className="relative group z-10">
            <input
              type="text"
              name="locationName"
              placeholder="Location (e.g., Delhi)"
              value={formData.locationName}
              onChange={handleChange}
              className="relative w-full p-3 sm:p-4 bg-white/15 border-2 border-green-500/50 rounded-xl focus:ring-4 focus:ring-green-400/70 focus:border-green-600 transition-all duration-500 text-white placeholder-gray-200 text-sm sm:text-base md:text-lg z-20"
              required
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-green-500/40 group-hover:ring-green-500/70 transition-all duration-500 animate-pulse z-0" />
            <span className="absolute -top-2 left-3 px-2 text-xs sm:text-sm md:text-base text-green-100 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">Location</span>
          </div>
          <div className="relative group z-10">
            <input
              type="text"
              name="coordinates"
              placeholder="[longitude,latitude]"
              value={formData.coordinates}
              onChange={handleChange}
              className="relative w-full p-3 sm:p-4 bg-white/15 border-2 border-green-500/50 rounded-xl focus:ring-4 focus:ring-green-400/70 focus:border-green-600 transition-all duration-500 text-white placeholder-gray-200 text-sm sm:text-base md:text-lg z-20"
              required
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-green-500/40 group-hover:ring-green-500/70 transition-all duration-500 animate-pulse z-0" />
            <span className="absolute -top-2 left-3 px-2 text-xs sm:text-sm md:text-base text-green-100 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">Coordinates</span>
          </div>
          <div className="relative group z-10">
            <input
              type="text"
              name="category"
              placeholder="Category (e.g., Vegetables)"
              value={formData.category}
              onChange={handleChange}
              className="relative w-full p-3 sm:p-4 bg-white/15 border-2 border-green-500/50 rounded-xl focus:ring-4 focus:ring-green-400/70 focus:border-green-600 transition-all duration-500 text-white placeholder-gray-200 text-sm sm:text-base md:text-lg z-20"
              required
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-green-500/40 group-hover:ring-green-500/70 transition-all duration-500 animate-pulse z-0" />
            <span className="absolute -top-2 left-3 px-2 text-xs sm:text-sm md:text-base text-green-100 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">Category</span>
          </div>
          <div className="relative group z-10">
            <input
              type="date"
              name="manufactureDate"
              value={formData.manufactureDate}
              onChange={handleChange}
              className="relative w-full p-3 sm:p-4 bg-white/15 border-2 border-green-500/50 rounded-xl focus:ring-4 focus:ring-green-400/70 focus:border-green-600 transition-all duration-500 text-white placeholder-gray-200 text-sm sm:text-base md:text-lg z-20"
              required
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-green-500/40 group-hover:ring-green-500/70 transition-all duration-500 animate-pulse z-0" />
            <span className="absolute -top-2 left-3 px-2 text-xs sm:text-sm md:text-base text-green-100 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">Manufacture Date</span>
          </div>
          <div className="relative group md:col-span-2 z-10">
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="relative w-full p-3 sm:p-4 bg-white/15 border-2 border-green-500/50 rounded-xl focus:ring-4 focus:ring-green-400/70 focus:border-green-600 transition-all duration-500 text-white placeholder-gray-200 min-h-[100px] sm:min-h-[120px] md:min-h-[140px] text-sm sm:text-base md:text-lg z-20"
              required
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-green-500/40 group-hover:ring-green-500/70 transition-all duration-500 animate-pulse z-0" />
            <span className="absolute -top-2 left-3 px-2 text-xs sm:text-sm md:text-base text-green-100 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">Description</span>
          </div>
          <div className="relative group md:col-span-2 z-10">
            <textarea
              name="specifications"
              placeholder="Specifications"
              value={formData.specifications}
              onChange={handleChange}
              className="relative w-full p-3 sm:p-4 bg-white/15 border-2 border-green-500/50 rounded-xl focus:ring-4 focus:ring-green-400/70 focus:border-green-600 transition-all duration-500 text-white placeholder-gray-200 min-h-[100px] sm:min-h-[120px] md:min-h-[140px] text-sm sm:text-base md:text-lg z-20"
              required
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-green-500/40 group-hover:ring-green-500/70 transition-all duration-500 animate-pulse z-0" />
            <span className="absolute -top-2 left-3 px-2 text-xs sm:text-sm md:text-base text-green-100 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">Specifications</span>
          </div>
          <div className="relative group md:col-span-2 z-10">
            <input
              type="file"
              name="image"
              accept="image/jpg, image/jpeg, image/png, image/webp"
              onChange={handleChange}
              className="relative w-full p-3 sm:p-4 bg-white/15 border-2 border-green-500/50 rounded-xl focus:ring-4 focus:ring-green-400/70 focus:border-green-600 transition-all duration-500 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-600/50 file:text-green-100 hover:file:bg-green-600/70 text-sm sm:text-base md:text-lg z-20"
              required
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-green-500/40 group-hover:ring-green-500/70 transition-all duration-500 animate-pulse z-0" />
            <span className="absolute -top-2 left-3 px-2 text-xs sm:text-sm md:text-base text-green-100 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">Image</span>
          </div>
          <div className="md:col-span-2 mt-4 sm:mt-5 md:mt-6 z-10">
            <button
              type="submit"
              className="relative w-full bg-gradient-to-r from-green-300 to-emerald-400 text-white p-3 sm:p-4 rounded-xl hover:from-green-400 hover:to-emerald-500 disabled:bg-green-500/50 transition-all duration-500 transform hover:scale-105 focus:ring-4 focus:ring-green-400/70 shadow-2xl hover:shadow-[0_0_40px_rgba(34,197,94,0.9)] animate-pulseButton text-sm sm:text-base md:text-lg z-20"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Listing'}
            </button>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
          20%, 40%, 60%, 80% { transform: translateX(6px); }
        }
        @keyframes gradientText {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulseButton {
          0% { box-shadow: 0 0 12px rgba(34,197,94,0.5); }
          50% { box-shadow: 0 0 25px rgba(34,197,94,0.9); }
          100% { box-shadow: 0 0 12px rgba(34,197,94,0.5); }
        }
        .animate-slideIn {
          animation: slideIn 1.2s ease-out;
        }
        .animate-shake {
          animation: shake 0.7s ease-in-out;
        }
        .animate-gradientText {
          background-size: 200% 200%;
          animation: gradientText 5s ease infinite;
        }
        .animate-pulseButton {
          animation: pulseButton 2.5s ease-in-out infinite;
        }
        input, textarea, button {
          outline: none;
          pointer-events: auto;
        }
        .group:hover .ring-1 {
          transform: scale(1.02);
        }
        @media (max-width: 640px) {
          .text-2xl {
            font-size: 1.5rem;
          }
          .pt-20 {
            padding-top: 6rem; /* Increased to ensure visibility above navbar */
          }
          .p-6 {
            padding: 1rem;
          }
          .gap-4 {
            gap: 0.75rem;
          }
          .text-sm {
            font-size: 0.875rem;
          }
          .min-h-[100px] {
            min-height: 80px;
          }
        }
        @media (min-width: 640px) and (max-width: 768px) {
          .text-3xl {
            font-size: 2rem;
          }
          .pt-24 {
            padding-top: 7rem; /* Adjusted for slightly larger screens */
          }
          .p-8 {
            padding: 1.25rem;
          }
          .gap-5 {
            gap: 1rem;
          }
          .text-base {
            font-size: 1rem;
          }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          .text-4xl {
            font-size: 2.5rem;
          }
          .pt-28 {
            padding-top: 8rem; /* Adjusted for medium screens */
          }
          .p-10 {
            padding: 1.5rem;
          }
          .gap-6 {
            gap: 1.25rem;
          }
        }
        @media (min-width: 1024px) {
          .max-w-6xl {
            max-width: 85rem;
          }
          .text-5xl {
            font-size: 3rem;
          }
          .pt-32 {
            padding-top: 9rem; /* Adjusted for larger screens */
          }
          .p-12 {
            padding: 2rem;
          }
        }
        @media (min-width: 1280px) {
          .pt-36 {
            padding-top: 10rem; /* Maximum padding for extra-large screens */
          }
          .p-14 {
            padding: 2.5rem;
          }
          .text-lg {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ListingForm;