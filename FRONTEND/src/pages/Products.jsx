import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getListings } from '../utils/api';
import BackgroundImage1 from '../assets/9.jpg';
import BackgroundImage2 from '../assets/10.jpg';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getListings();
        setProducts(data || []);
      } catch (err) {
        setError('Failed to load products.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div 
      className="container mx-auto p-4 sm:p-6 md:p-8 min-h-screen relative overflow-hidden 
        bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-800"
      style={{
        backgroundImage: `url(${BackgroundImage1}), url(${BackgroundImage2})`,
        backgroundPosition: 'left top, right bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover, cover',
        backgroundBlendMode: 'multiply',
      }}
    >
      {/* Subtle animated overlay for depth, non-interactive */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
        animate-pulse-slow z-0 pointer-events-none"></div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold m-16 lg:m-20 sm:m-20 md:mt-28 text-center 
        text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 
        relative z-10 tracking-tight drop-shadow-2xl transform 
        hover:scale-110 transition-all duration-500 ease-out select-text">
        Explore Our Products
      </h1>

      {error && (
        <p className="text-red-300 text-center mb-8 relative z-10 bg-red-950/60 p-4 
          rounded-xl max-w-lg mx-auto shadow-2xl border border-red-500/50 
          animate-slide-in select-text">
          {error}
        </p>
      )}

      {loading ? (
        <div className="text-center relative z-10">
          <p className="text-white text-xl animate-bounce select-text">Loading products...</p>
          <div className="mt-4 flex justify-center gap-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce-delay-1"></div>
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce-delay-2"></div>
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce-delay-3"></div>
          </div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-white text-xl relative z-10 bg-gray-950/60 p-6 
          rounded-xl max-w-md mx-auto shadow-2xl border border-gray-500/50 
          animate-fade-in select-text">
          No products available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
          gap-6 sm:gap-8 relative z-10">
          {products.map((product) => (
            <div
              key={product._id}
              className="group relative transform hover:scale-105 
                transition-all duration-500 ease-out rounded-xl overflow-hidden animate-slide-up"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 
                to-transparent opacity-0 group-hover:opacity-100 transition-opacity 
                duration-300 z-10 pointer-events-none"></div>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {/* Custom Tailwind animation keyframes */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        @keyframes slide-in {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
        @keyframes slide-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.7s ease-out;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        @keyframes bounce-delay-1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-delay-1 {
          animation: bounce-delay-1 0.6s infinite;
        }
        @keyframes bounce-delay-2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-delay-2 {
          animation: bounce-delay-2 0.6s infinite 0.1s;
        }
        @keyframes bounce-delay-3 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-delay-3 {
          animation: bounce-delay-3 0.6s infinite 0.2s;
        }
      `}</style>
    </div>
  );
};

export default Product;