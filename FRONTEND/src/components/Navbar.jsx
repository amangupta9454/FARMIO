import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSeedling } from 'react-icons/fa';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-900/95 via-blue-950/95 to-gray-900/95 backdrop-blur-xl text-white px-6 py-1 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden">
      <div className="container mx-auto flex justify-between items-center px-1 py-4">
        {/* Brand Title */}
        <h1 className="flex items-center gap-3 text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-green-500 drop-shadow-[0_0_10px_rgba(255,193,7,0.6)] tracking-widest animate-pulse">
          <FaSeedling className="text-green-400 animate-bounce" />
          FARMIO
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10 flex-row md:ml-10 max-w-full overflow-x-auto">
          <Link to="/" className="text-xl font-semibold hover:text-amber-400 transition">
            Home
          </Link>
          <Link to="/product" className="text-xl font-semibold hover:text-amber-400 transition">
            Products
          </Link>
          <Link to="/weather" className="text-xl font-semibold hover:text-amber-400 transition">
            Weather
          </Link>
          <Link to="/prices" className="text-xl font-semibold hover:text-amber-400 transition">
            Price
          </Link>
          
          <Link to="/contact" className="text-xl font-semibold hover:text-amber-400 transition">
            Contact
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {user.role === 'farmer' && (
                  <Link to="/farmer" className="text-xl font-semibold hover:text-amber-400 transition">
                    Dashboard
                  </Link>
                )}
                {user.role === 'consumer' && (
                  <Link to="/consumer" className="text-xl font-semibold hover:text-amber-400 transition">
                    Dashboard
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link to="/admin/login" className="text-xl font-semibold hover:text-amber-400 transition">
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-xl font-semibold hover:text-amber-400 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-xl font-semibold hover:text-amber-400 transition">
                  Login
                </Link>
               
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <FaTimes className="text-3xl text-amber-400" />
          ) : (
            <FaBars className="text-3xl text-white" />
          )}
        </button>
      </div>

      {/* Mobile Links */}
      <div
        className={`md:hidden bg-gray-600 text-white px-4 py-2 transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <Link
          to="/"
          className="block py-2 text-xl font-semibold hover:text-amber-400 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/product"
          className="block py-2 text-xl font-semibold hover:text-amber-400 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          Products
        </Link>
        <Link
          to="/wheather"
          className="block py-2 text-xl font-semibold hover:text-amber-400 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          Wheather
        </Link>
        <Link
          to="/prices"
          className="block py-2 text-xl font-semibold hover:text-amber-400 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          Prices
        </Link>
        <Link
          to="/contact"
          className="block py-2 text-xl font-semibold hover:text-amber-400 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          Contact
        </Link>

        <div className="space-y-2">
          {user ? (
            <>
              {user.role === 'farmer' && (
                <Link
                  to="/farmer"
                  className="block py-2 text-xl font-semibold hover:text-amber-400 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              {user.role === 'consumer' && (
                <Link
                  to="/consumer"
                  className="block py-2 text-xl font-semibold hover:text-amber-400 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="block py-2 text-xl font-semibold hover:text-amber-400 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block py-2 text-xl font-semibold hover:text-amber-400 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block py-2 text-xl font-semibold hover:text-amber-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
