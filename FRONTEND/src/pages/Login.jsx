import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, sendResetOtp, verifyResetOtp, resetPassword } from '../utils/api';
import bgImage from '../assets/12.jpg';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetStep, setResetStep] = useState('email'); // email, otp, password
  const [resetData, setResetData] = useState({ email: '', otp: '', newPassword: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleResetChange = (e) => {
    const { name, value } = e.target;
    setResetData({ ...resetData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(formData);
      localStorage.setItem('token', data.token);
      setUser({ id: data.user.id, role: data.user.role, name: data.user.name });
      navigate(data.user.role === 'farmer' ? '/farmer' : '/consumer');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed.');
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      if (resetStep === 'email') {
        await sendResetOtp({ email: resetData.email });
        setResetStep('otp');
        setError(null);
      } else if (resetStep === 'otp') {
        await verifyResetOtp({ email: resetData.email, otp: resetData.otp });
        setResetStep('password');
        setError(null);
      } else if (resetStep === 'password') {
        await resetPassword({ email: resetData.email, otp: resetData.otp, newPassword: resetData.newPassword });
        setForgotPassword(false);
        setResetStep('email');
        setResetData({ email: '', otp: '', newPassword: '' });
        setError(null);
        alert('Password reset successfully. Please log in with your new password.');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/70 via-teal-800/70 to-indigo-900/70 animate-[gradient-x_15s_ease_infinite] bg-[length:200%_200%] z-0"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute w-2 h-2 bg-teal-300/50 rounded-full animate-[particle_10s_linear_infinite] top-10 left-20"></div>
        <div className="absolute w-3 h-3 bg-blue-400/50 rounded-full animate-[particle_12s_linear_infinite] top-40 right-30"></div>
        <div className="absolute w-2 h-2 bg-teal-300/50 rounded-full animate-[particle_8s_linear_infinite] bottom-20 left-40"></div>
      </div>
      
      <div className="relative bg-gradient-to-br from-indigo-900/90 to-teal-900/90 backdrop-blur-md p-12 sm:p-12 md:p-14 rounded-3xl shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto border border-teal-400/30 hover:border-teal-400/50 transition-all duration-500 animate-[wave_0.6s_ease-out] z-10 before:absolute before:inset-0 before:rounded-3xl before:border-2 before:border-transparent before:animate-[rotate-border_3s_linear_infinite] before:-m-1">
        {!forgotPassword ? (
          <>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300 animate-[fade-in_0.5s_ease-out] [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">
              Welcome Back
            </h2>
            {error && (
              <div
                id="error-message"
                className="bg-red-600/20 text-red-100 p-3 sm:p-4 rounded-xl mb-6 flex justify-between items-center border border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.6)] animate-[pulse-glow_2s_ease_infinite] break-words"
                role="alert"
                aria-describedby="error-message"
              >
                <span>{error}</span>
                <button onClick={() => setError(null)} className="text-red-100 hover:text-red-50" aria-label="Close error message">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative animate-[fade-in_0.5s_ease-out_0.1s_both]">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 pt-6 bg-transparent border-b-2 border-teal-400/50 rounded-none focus:border-transparent text-white placeholder-transparent peer focus:outline-none focus:ring-0 focus:shadow-[0_0_10px_rgba(45,212,191,0.6)] transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-400/10 hover:to-teal-300/10"
                  placeholder="Email"
                  required
                  aria-label="Email address"
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 top-1 text-teal-300 text-sm sm:text-base transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base sm:peer-placeholder-shown:text-lg peer-focus:top-1 peer-focus:text-sm sm:peer-focus:text-base peer-focus:text-teal-200 [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]"
                >
                  Email Address
                </label>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3" title="Email field">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-teal-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="relative animate-[fade-in_0.5s_ease-out_0.2s_both]">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 pt-6 bg-transparent border-b-2 border-teal-400/50 rounded-none focus:border-transparent text-white placeholder-transparent peer focus:outline-none focus:ring-0 focus:shadow-[0_0_10px_rgba(45,212,191,0.6)] transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-400/10 hover:to-teal-300/10"
                  placeholder="Password"
                  required
                  aria-label="Password"
                />
                <label
                  htmlFor="password"
                  className="absolute left-0 top-1 text-teal-300 text-sm sm:text-base transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base sm:peer-placeholder-shown:text-lg peer-focus:top-1 peer-focus:text-sm sm:peer-focus:text-base peer-focus:text-teal-200 [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]"
                >
                  Password
                </label>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3" title="Password field">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-teal-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c0-1.1-.9-2-2-2s-2 .9-2 2 2 4 2 4m2-4c0-1.1.9-2 2-2s2 .9 2 2-2 4-2 4m-6 5v-1a2 2 0 012-2h4a2 2 0 012 2v1"
                    />
                  </svg>
                </div>
              </div>
              <button
                type="submit"
                className="relative w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white p-3 sm:p-4 rounded-xl hover:from-blue-600 hover:to-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300/50 transition-all duration-300 animate-[pulse-slow_3s_ease_infinite] shadow-[0_0_15px_rgba(45,212,191,0.5)] hover:shadow-[0_0_25px_rgba(45,212,191,0.7)]"
              >
                Sign In
              </button>
            </form>
            <p className="mt-6 text-center text-gray-200 text-sm sm:text-base animate-[fade-in_0.5s_ease-out_0.3s_both] [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]">
              Not registered?{' '}
              <Link
                to="/register"
                className="relative text-teal-300 hover:text-teal-200 font-medium after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-teal-300 after:transition-all after:duration-300 hover:after:w-full hover:animate-[bounce_0.3s_ease]"
              >
                Create an account
              </Link>
            </p>
            <p className="mt-2 text-center text-gray-200 text-sm sm:text-base animate-[fade-in_0.5s_ease-out_0.3s_both] [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]">
              <button
                onClick={() => setForgotPassword(true)}
                className="relative text-teal-300 hover:text-teal-200 font-medium after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-teal-300 after:transition-all after:duration-300 hover:after:w-full hover:animate-[bounce_0.3s_ease]"
              >
                Forgot Password?
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300 animate-[fade-in_0.5s_ease-out] [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">
              Reset Password
            </h2>
            {error && (
              <div
                id="error-message"
                className="bg-red-600/20 text-red-100 p-3 sm:p-4 rounded-xl mb-6 flex justify-between items-center border border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.6)] animate-[pulse-glow_2s_ease_infinite] break-words"
                role="alert"
                aria-describedby="error-message"
              >
                <span>{error}</span>
                <button onClick={() => setError(null)} className="text-red-100 hover:text-red-50" aria-label="Close error message">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
              {resetStep === 'email' && (
                <div className="relative animate-[fade-in_0.5s_ease-out_0.1s_both]">
                  <input
                    type="email"
                    name="email"
                    id="reset-email"
                    value={resetData.email}
                    onChange={handleResetChange}
                    className="w-full p-3 pt-6 bg-transparent border-b-2 border-teal-400/50 rounded-none focus:border-transparent text-white placeholder-transparent peer focus:outline-none focus:ring-0 focus:shadow-[0_0_10px_rgba(45,212,191,0.6)] transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-400/10 hover:to-teal-300/10"
                    placeholder="Email"
                    required
                    aria-label="Email address for password reset"
                  />
                  <label
                    htmlFor="reset-email"
                    className="absolute left-0 top-1 text-teal-300 text-sm sm:text-base transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base sm:peer-placeholder-shown:text-lg peer-focus:top-1 peer-focus:text-sm sm:peer-focus:text-base peer-focus:text-teal-200 [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]"
                  >
                    Email Address
                  </label>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3" title="Email field">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-teal-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              )}
              {resetStep === 'otp' && (
                <div className="relative animate-[fade-in_0.5s_ease-out_0.1s_both]">
                  <input
                    type="text"
                    name="otp"
                    id="otp"
                    value={resetData.otp}
                    onChange={handleResetChange}
                    className="w-full p-3 pt-6 bg-transparent border-b-2 border-teal-400/50 rounded-none focus:border-transparent text-white placeholder-transparent peer focus:outline-none focus:ring-0 focus:shadow-[0_0_10px_rgba(45,212,191,0.6)] transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-400/10 hover:to-teal-300/10"
                    placeholder="OTP"
                    required
                    aria-label="OTP for password reset"
                  />
                  <label
                    htmlFor="otp"
                    className="absolute left-0 top-1 text-teal-300 text-sm sm:text-base transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base sm:peer-placeholder-shown:text-lg peer-focus:top-1 peer-focus:text-sm sm:peer-focus:text-base peer-focus:text-teal-200 [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]"
                  >
                    OTP
                  </label>
                </div>
              )}
              {resetStep === 'password' && (
                <div className="relative animate-[fade-in_0.5s_ease-out_0.1s_both]">
                  <input
                    type="password"
                    name="newPassword"
                    id="new-password"
                    value={resetData.newPassword}
                    onChange={handleResetChange}
                    className="w-full p-3 pt-6 bg-transparent border-b-2 border-teal-400/50 rounded-none focus:border-transparent text-white placeholder-transparent peer focus:outline-none focus:ring-0 focus:shadow-[0_0_10px_rgba(45,212,191,0.6)] transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-400/10 hover:to-teal-300/10"
                    placeholder="New Password"
                    required
                    aria-label="New Password"
                  />
                  <label
                    htmlFor="new-password"
                    className="absolute left-0 top-1 text-teal-300 text-sm sm:text-base transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base sm:peer-placeholder-shown:text-lg peer-focus:top-1 peer-focus:text-sm sm:peer-focus:text-base peer-focus:text-teal-200 [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]"
                  >
                    New Password
                  </label>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3" title="Password field">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-teal-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 11c0-1.1-.9-2-2-2s-2 .9-2 2 2 4 2 4m2-4c0-1.1.9-2 2-2s2 .9 2 2-2 4-2 4m-6 5v-1a2 2 0 012-2h4a2 2 0 012 2v1"
                      />
                    </svg>
                  </div>
                </div>
              )}
              <button
                type="submit"
                className="relative w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white p-3 sm:p-4 rounded-xl hover:from-blue-600 hover:to-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300/50 transition-all duration-300 animate-[pulse-slow_3s_ease_infinite] shadow-[0_0_15px_rgba(45,212,191,0.5)] hover:shadow-[0_0_25px_rgba(45,212,191,0.7)]"
              >
                {resetStep === 'email' ? 'Send OTP' : resetStep === 'otp' ? 'Verify OTP' : 'Reset Password'}
              </button>
            </form>
            <p className="mt-6 text-center text-gray-200 text-sm sm:text-base animate-[fade-in_0.5s_ease-out_0.3s_both] [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]">
              <button
                onClick={() => {
                  setForgotPassword(false);
                  setResetStep('email');
                  setResetData({ email: '', otp: '', newPassword: '' });
                  setError(null);
                }}
                className="relative text-teal-300 hover:text-teal-200 font-medium after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-teal-300 after:transition-all after:duration-300 hover:after:w-full hover:animate-[bounce_0.3s_ease]"
              >
                Back to Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;