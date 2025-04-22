import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendAdminOtp, verifyAdminOtp } from '../utils/api';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import backgroundImage from '../assets/7.jpg';

const AdminLogin = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    try {
      await sendAdminOtp({ email: email.trim(), password });
      setOtpSent(true);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please check your credentials.');
    }
  };
  // In your login component (e.g., AdminLogin.jsx)
const handleLogin = async (email, password) => {
  try {
    const response = await api.loginAdmin(email, password); // Your login API call
    const { token, user } = response.data;
    localStorage.setItem('adminToken', token);
    localStorage.setItem('admin', JSON.stringify(user)); // Store user data
    navigate('/admin/dashboard');
  } catch (err) {
    console.error('Login failed', err);
  }
};

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }
    try {
    
      const { data } = await verifyAdminOtp({ email: email.trim(), otp: otp.trim() });
    
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('admin', JSON.stringify(data.admin));
      setUser({ id: data.admin.id, role: data.admin.role });
      setOtp('');
      setOtpSent(false);
      setEmail('');
      setPassword('');
     
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      console.error('OTP verification error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Invalid or expired OTP. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-start pt-24 sm:pt-12 md:pt-24 justify-center bg-cover bg-center bg-no-repeat relative backdrop-brightness-70"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="relative bg-transparent bg-opacity-20 backdrop-blur-3xl p-6 sm:p-10 rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.9)] w-full max-w-lg sm:max-w-md border border-cyan-600 border-opacity-20 transition-all duration-700 hover:shadow-[0_0_120px_rgba(0,0,0,1)] transform hover:-translate-y-4 mx-4">
        {/* Enhanced Glassmorphism Overlay with Subtle Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-600/6 to-gray-900/4 rounded-3xl pointer-events-none animate-gradient"></div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-300 to-red-400   tracking-tight">Admin Login</h2>
        {error && (
          <p className="text-red-200 text-center mb-6 bg-red-900 bg-opacity-50 p-3 rounded-lg animate-shake shadow-inner text-sm sm:text-base font-medium">{error}</p>
        )}
        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-6 sm:space-y-8">
            <div className="relative group">
              <label className="block text-sm sm:text-base font-medium text-gray-50 tracking-wide transition-colors duration-300 group-hover:text-blue-200">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full p-3 sm:p-4 bg-gray-900 bg-opacity-20 text-white border border-gray-300/30 rounded-xl focus:ring-4 focus:ring-blue-200/60 focus:border-blue-200 transition-all duration-500 placeholder-gray-100/70 shadow-lg hover:shadow-xl text-sm sm:text-base"
                placeholder="Enter your email"
                required
              />
              <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-blue-300 to-purple-300 rounded-l-xl transition-all duration-300 group-hover:w-2"></div>
            </div>
            <div className="relative group">
              <label className="block text-sm sm:text-base font-medium text-gray-50 tracking-wide transition-colors duration-300 group-hover:text-blue-200">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full p-3 sm:p-4 bg-gray-900 bg-opacity-20 text-white border border-gray-300/30 rounded-xl focus:ring-4 focus:ring-blue-200/60 focus:border-blue-200 transition-all duration-500 placeholder-gray-100/70 shadow-lg hover:shadow-xl text-sm sm:text-base"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 sm:right-4 top-10 sm:top-12 text-gray-100 hover:text-white transition-colors duration-300 transform hover:scale-125"
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} className="sm:w-6 sm:h-6" /> : <AiOutlineEye size={20} className="sm:w-6 sm:h-6" />}
              </button>
              <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-blue-300 to-purple-300 rounded-l-xl transition-all duration-300 group-hover:w-2"></div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white p-3 sm:p-4 rounded-xl hover:from-blue-500 hover:to-purple-500 transform hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] relative overflow-hidden group"
            >
              <span className="relative z-10 text-sm sm:text-base font-semibold tracking-wide">Send OTP</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6 sm:space-y-8">
            <div className="relative group">
              <label className="block text-sm sm:text-base font-medium text-gray-50 tracking-wide transition-colors duration-300 group-hover:text-blue-200">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-2 block w-full p-3 sm:p-4 bg-gray-900 bg-opacity-20 text-white border border-gray-300/30 rounded-xl focus:ring-4 focus:ring-blue-200/60 focus:border-blue-200 transition-all duration-500 placeholder-gray-100/70 shadow-lg hover:shadow-xl text-sm sm:text-base"
                placeholder="Enter the OTP"
                required
              />
              <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-blue-300 to-purple-300 rounded-l-xl transition-all duration-300 group-hover:w-2"></div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white p-3 sm:p-4 rounded-xl hover:from-blue-500 hover:to-purple-500 transform hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] relative overflow-hidden group"
            >
              <span className="relative z-10 text-sm sm:text-base font-semibold tracking-wide">Verify OTP</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </button>
          </form>
        )}
      </div>

      {/* Custom Tailwind Animations */}
      <style jsx>{`
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px rgba(59, 130, 246, 0.8); }
          50% { text-shadow: 0 0 40px rgba(59, 130, 246, 1), 0 0 50px rgba(147, 51, 234, 0.8); }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
          20%, 40%, 60%, 80% { transform: translateX(3px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;